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
  standalone: false
})
export class ProfileComponent implements OnInit {
  allUserProfile: any[] = [];
  UserRole = false;

  role: string = 'user'
  showVisualizationPopup = false;
  selectedUser: any = null;
  isEditing = false;
  formData: any = {};

  feedBackData: any[] = [];
  userId: string = '';

  userFields = [
    { label: 'Name', key: 'Name', id: 'name', editable: true },
    { label: 'Email', key: 'Email', id: 'email', editable: true },
    { label: 'Username', key: 'Username', id: 'username', editable: false },
    { label: 'Contact Details', key: 'ContactDetails', id: 'contactDetails', editable: true },
    { label: 'Role', key: 'role', id: 'role', editable: false }
  ];

  constructor(private sharedService: SharedService, private authService: AuthService, private http: HttpClient, private feedBackService: FeedbackService, private userEventService: UserEventService) {
    this.sharedService.authData$.subscribe(role => {
      this.UserRole = role?.toLowerCase() === 'admin';
      this.role = role?.toLowerCase()
    });

    this.sharedService.userId$.subscribe(id => {
      this.userId = id;
    });

    this.feedBackService.getAllFeedback().subscribe((data: any) => {
      this.feedBackData = data.feedbacks;
    });
  }

  ngOnInit(): void {
    
    this.loadUserData();
  }
  loadUserData(): void {
    this.authService.getAllUser().subscribe(users => {
      console.log("Profile", users);
      this.allUserProfile = users;
      
      // Create an array of observables, one for each user
      const userObservables = users.map((user: any) => 
        forkJoin([
          this.http.get(`http://localhost:4000/api/events/created-event/${user.UserID}`),
          this.http.get(`http://localhost:4000/api/eventuser/filter/${user.UserID}`),
          this.http.get(`http://localhost:4000/api/tickets/my-tickets/${user.UserID}`)
        ]).pipe(
          map(([created, joined, canceled]: any) => {
            let cancelCount = 0;
            canceled.forEach((ticket: any) => {
              if (ticket.isActive === 0) cancelCount += 1;
            });
            
            // Return the user with stats data
            return {
              ...user,
              eventStats: {
                created: created.data.length || 0,
                joined: joined.data.length || 0,
                canceled: cancelCount
              }
            };
          })
        )
      );
      
      // If there are users, subscribe to all the observables at once
      if (userObservables.length > 0) {
        forkJoin(userObservables).subscribe((updatedUsers: any) => {
          this.allUserProfile = updatedUsers;
        });
      }
    });
  }

  getColumns(): string[] {
    if (!this.allUserProfile.length) return [];
    const baseColumns = Object.keys(this.allUserProfile[0]).filter(key => key !== 'eventStats');
    return [...baseColumns, 'Actions'].slice(1);
  }

  viewUserVisualization(user: any): void {
    this.selectedUser = user;
    this.showVisualizationPopup = true;
  }

  closeVisualization(): void {
    this.showVisualizationPopup = false;
    this.selectedUser = null;
  }

  deleteUser(userId: string): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.authService.deleteUser(userId).subscribe(() => {
        this.allUserProfile = this.allUserProfile.filter(user => user.userId !== userId);
      });
    }
  }

  startEditing(): void {
    this.isEditing = true;
    this.formData = { ...this.allUserProfile[0] };
  }

  saveUserProfile(): void {
    const { eventStats, ...formData } = this.formData;

    this.authService.updateUserProfile(formData).subscribe((updatedUser: any) => {
      if (this.UserRole) {
        const index = this.allUserProfile.findIndex(u => u.UserID === updatedUser.UserID);
        if (index !== -1) {
          this.allUserProfile[index] = {
            ...updatedUser,
            eventStats: this.allUserProfile[index].eventStats
          };
        }
      } else {
        this.allUserProfile[0] = {
          ...updatedUser,
          eventStats: this.allUserProfile[0].eventStats
        };
      }
      this.isEditing = false;
    });
  }

  cancelEditing(): void {
    this.isEditing = false;
  }

  getOverallStats(): any {
    if (!this.allUserProfile.length) return { created: 0, joined: 0, canceled: 0, total: 0 };

    const totalCreated = this.allUserProfile.reduce((sum, user) => sum + (user.eventStats?.created || 0), 0);
    const totalJoined = this.allUserProfile.reduce((sum, user) => sum + (user.eventStats?.joined || 0), 0);
    const totalCanceled = this.allUserProfile.reduce((sum, user) => sum + (user.eventStats?.canceled || 0), 0);
    // console.log("Profile Lavanya",this.allUserProfile[0].eventStats,totalCreated);
    

    return {
      totalUsers: this.allUserProfile.length,
      created: totalCreated,
      joined: totalJoined,
      canceled: totalCanceled,
      total: totalCreated + totalJoined + totalCanceled
    };
  }

  trackById(index: number, user: any): any {
    return user.Id;
  }
}