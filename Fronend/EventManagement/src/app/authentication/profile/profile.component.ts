import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Services/Authentication/auth.service';
import { SharedService } from '../../shared/shared.service';
import { HttpClient } from '@angular/common/http';
import { FeedbackService } from '../../Services/feedBack/feedback.service';
import { forkJoin, map } from 'rxjs';
import { UserEventService } from '../../Services/UserEvent/user-event.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  standalone:false
})
export class ProfileComponent implements OnInit {
  allUserProfile: any[] = [];
  userId: string = '';
  role: string = 'user';
  UserRole = false;

  showVisualizationPopup = false;
  selectedUser: any = null;

  isEditing = false;
  formData: any = {};

  feedBackData: any[] = [];

  totalStats = {
    created: 0,
    joined: 0,
    canceled: 0,
    totalUsers: 0,
    totalEvents: 0
  };

  userFields = [
    { label: 'Name', key: 'Name', id: 'name', editable: true },
    { label: 'Email', key: 'Email', id: 'email', editable: true },
    { label: 'Username', key: 'Username', id: 'username', editable: false },
    { label: 'Contact Details', key: 'ContactDetails', id: 'contactDetails', editable: true },
    { label: 'Role', key: 'role', id: 'role', editable: false }
  ];

  constructor(
    private sharedService: SharedService,
    private authService: AuthService,
    private http: HttpClient,
    private feedBackService: FeedbackService,
    private userEventService: UserEventService
  ) {
    this.sharedService.authData$.subscribe(role => {
      this.UserRole = role?.toLowerCase() === 'admin';
      this.role = role?.toLowerCase();
    });

    this.sharedService.userId$.subscribe(id => {
      this.userId = id;
    });

    this.feedBackService.getAllFeedback().subscribe((data:any) => {
      this.feedBackData = data.feedbacks || [];
    });
  }

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData(): void {
    this.authService.getAllUser().subscribe(users => {
      const observables = users.map((user:any) =>
        forkJoin([
          this.http.get(`http://localhost:4000/api/events/created-event/${user.UserID}`),
          this.http.get(`http://localhost:4000/api/eventuser/filter/${user.UserID}`),
          this.http.get(`http://localhost:4000/api/tickets/my-tickets/${user.UserID}`)
        ]).pipe(
          map(([created, joined, canceled]: any) => {
            created.data = typeof created.data == 'string'? 0: created.data
            joined.data = typeof joined.data == 'string'? 0: joined.data
            canceled.data = typeof canceled.data == 'string'? 0: canceled.data

            const cancelCount = canceled.reduce((count: number, ticket: any) => count + (ticket.isActive === false ? 1 : 0), 0);
            // console.log(joined);
            
            return {
              ...user,
              eventStats: {
                created: created.data?.length || 0,
                joined: joined.data?.length || 0,
                canceled: cancelCount
              }
            };
          })
        )
      );

      forkJoin(observables).subscribe((updatedUsers: any) => {
        this.allUserProfile = updatedUsers;
        // console.log(this.allUserProfile);
        
        this.calculateOverallStats();
      });
    });
  }

  calculateOverallStats(): void {
    this.totalStats = {
      created: 0,
      joined: 0,
      canceled: 0,
      totalUsers: this.allUserProfile.length,
      totalEvents: 0
    };

    this.allUserProfile.forEach(user => {
      this.totalStats.created += user.eventStats.created;
      this.totalStats.joined += user.eventStats.joined;
      this.totalStats.canceled += user.eventStats.canceled;
    });

    this.totalStats.totalEvents = this.totalStats.created + this.totalStats.joined + this.totalStats.canceled;
  }

  getColumns(): string[] {
    if (!this.allUserProfile.length) return [];
    return [...Object.keys(this.allUserProfile[0]).filter(k => k !== 'eventStats'), 'Actions'].slice(1);
  }

  viewUserVisualization(user: any): void {
    this.selectedUser = user;
    this.showVisualizationPopup = true;
  }

  closeVisualization(): void {
    this.selectedUser = null;
    this.showVisualizationPopup = false;
  }

  deleteUser(userId: string): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.authService.deleteUser(userId).subscribe({
        next: () => {
          this.allUserProfile = this.allUserProfile.filter(user => user.UserID !== userId);
          this.calculateOverallStats();
        },
        error: () => console.log("Error: Unable to delete user")
      });
    }
  }

  startEditing(): void {
    this.isEditing = true;
    this.formData = { ...this.allUserProfile[0] };
  }

  saveUserProfile(): void {
    const { eventStats, ...updatedFormData } = this.formData;

    this.authService.updateUserProfile(updatedFormData).subscribe((updatedUser: any) => {
      const index = this.allUserProfile.findIndex(user => user.UserID === updatedUser.UserID);
      if (index !== -1) {
        this.allUserProfile[index] = {
          ...updatedFormData,
          eventStats: this.allUserProfile[index].eventStats
        };
      }
      this.isEditing = false;
    });
  }

  cancelEditing(): void {
    this.isEditing = false;
  }

  trackById(index: number, user: any): any {
    return user.UserID;
  }
}
