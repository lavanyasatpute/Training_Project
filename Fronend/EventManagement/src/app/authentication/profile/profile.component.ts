import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Services/Authentication/auth.service';
import { SharedService } from '../../shared/shared.service';
import { Chart, registerables } from 'chart.js';
import { HttpClient } from '@angular/common/http';
import { FeedbackService } from '../../Services/feedBack/feedback.service';
import { forkJoin, map } from 'rxjs';
import { UserEventService } from '../../Services/UserEvent/user-event.service';

// Register all Chart.js components
Chart.register(...registerables);

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  standalone: false
})
export class ProfileComponent implements OnInit {
  allUserProfile: any[] = [];
  UserRole = false;

  role:string = 'user'
  showVisualizationPopup = false;
  selectedUser: any = null;
  isEditing = false;
  formData: any = {};
  activityChart: any;
  userRankingsChart: any;

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
    })

    this.feedBackService.getAllFeedback().subscribe((data: any) => {
      this.feedBackData = data.feedbacks

      // console.log("This is from feedback profile", this.feedBackData);

    })
  }

  ngOnInit(): void {
    this.loadUserData();
  }
  created: number = 0;
  joined: number = 0;
  cancel: number = 0;
  loadUserData(): void {
    // const currentUser = this.authService.getCurrentUser(); // Assuming you have a method to get logged-in user info
    // const role = currentUser.role;

    // For a single user
    const fetchUserData = (user: string) => {
      const userId = user

      const created$ = this.http.get(`http://localhost:4000/api/events/created-event/${userId}`);
      const joined$ = this.http.get(`http://localhost:4000/api/eventuser/filter/${userId}`);
      const canceled$ = this.http.get(`http://localhost:4000/api/tickets/my-tickets/${userId}`);

      forkJoin([created$, joined$, canceled$]).subscribe(([created, joined, canceled]: any) => {
        const createdCount = created.data.length || 0;
        const joinedCount = joined.data.length || 0;
        let cancelCount = 0;

        canceled.forEach((ticket: any) => {
          if (ticket.isActive === 0) cancelCount += 1;
        });

        this.allUserProfile = [{
          ...(typeof user === 'object' && user !== null ? user : {}),
          eventStats: {
            created: createdCount,
            joined: joinedCount,
            canceled: cancelCount
          }
        }];
      });
    };

    // If Admin, get all users
    if (this.role == 'admin') {
      this.authService.getAllUser().subscribe(users => {
        const profileRequests = users.map((user: any) =>
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

        forkJoin(profileRequests).subscribe((profiles: any) => {
          this.allUserProfile = profiles;
        });
      });
    } else {
      // If normal user, get only their data
      fetchUserData(this.userId);
    }
  }


  getColumns(): string[] {
    if (!this.allUserProfile.length) return [];
    const baseColumns = Object.keys(this.allUserProfile[0]).filter(key => key !== 'eventStats');
    return [...baseColumns, 'Actions'];
  }

  viewUserVisualization(user: any): void {
    this.selectedUser = user;
    this.showVisualizationPopup = true;

    // Need to wait for DOM to be updated
    setTimeout(() => {
      this.createVisualizationCharts();
    }, 100);
  }

  createVisualizationCharts(): void {
    // Destroy previous charts if they exist
    if (this.activityChart) {
      this.activityChart.destroy();
    }

    if (this.userRankingsChart) {
      this.userRankingsChart.destroy();
    }

    // Create charts based on whether viewing single user or all users
    if (this.selectedUser) {
      this.createSingleUserCharts();
    } else {
      this.createAllUsersCharts();
    }
  }

  createSingleUserCharts(): void {
    const ctx = document.getElementById('userActivityChart') as HTMLCanvasElement;
    if (!ctx) return;

    const stats = this.selectedUser.eventStats;

    this.activityChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Created', 'Joined', 'Canceled'],
        datasets: [{
          data: [stats.created, stats.joined, stats.canceled],
          backgroundColor: [
            'rgba(75, 192, 192, 0.7)',
            'rgba(54, 162, 235, 0.7)',
            'rgba(255, 99, 132, 0.7)'
          ],
          borderColor: [
            'rgba(75, 192, 192, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 99, 132, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'User Activity Distribution'
          }
        }
      }
    });

    // Create activity timeline chart
    const timelineCtx = document.getElementById('userActivityTimeline') as HTMLCanvasElement;
    if (!timelineCtx) return;

    // Mock data for timeline - in real app, you'd have actual dates
    const currentDate = new Date();
    const months = Array.from({ length: 6 }, (_, i) => {
      const date = new Date();
      date.setMonth(currentDate.getMonth() - 5 + i);
      return date.toLocaleString('default', { month: 'short' });
    });

    new Chart(timelineCtx, {
      type: 'line',
      data: {
        labels: months,
        datasets: [
          {
            label: 'Created',
            data: this.generateRandomTimelineData(0, stats.created),
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            tension: 0.4
          },
          {
            label: 'Joined',
            data: this.generateRandomTimelineData(0, stats.joined),
            borderColor: 'rgba(54, 162, 235, 1)',
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            tension: 0.4
          },
          {
            label: 'Canceled',
            data: this.generateRandomTimelineData(0, stats.canceled),
            borderColor: 'rgba(255, 99, 132, 1)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            tension: 0.4
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Activity Timeline (Last 6 Months)'
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  createAllUsersCharts(): void {
    // Overall platform activity pie chart
    const pieCtx = document.getElementById('platformActivityPie') as HTMLCanvasElement;
    if (!pieCtx) return;

    const stats = this.getOverallStats();

    this.activityChart = new Chart(pieCtx, {
      type: 'pie',
      data: {
        labels: ['Created', 'Joined', 'Canceled'],
        datasets: [{
          data: [stats.created, stats.joined, stats.canceled],
          backgroundColor: [
            'rgba(75, 192, 192, 0.7)',
            'rgba(54, 162, 235, 0.7)',
            'rgba(255, 99, 132, 0.7)'
          ],
          borderColor: [
            'rgba(75, 192, 192, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 99, 132, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Platform Activity Distribution'
          }
        }
      }
    });

    // Top users bar chart
    const barCtx = document.getElementById('topUsersChart') as HTMLCanvasElement;
    if (!barCtx) return;

    // Get top 5 most active users
    const topUsers = [...this.allUserProfile]
      .sort((a, b) => {
        const totalA = a.eventStats.created + a.eventStats.joined + a.eventStats.canceled;
        const totalB = b.eventStats.created + b.eventStats.joined + b.eventStats.canceled;
        return totalB - totalA;
      })
      .slice(0, 5);

    this.userRankingsChart = new Chart(barCtx, {
      type: 'bar',
      data: {
        labels: topUsers.map(user => user.Name),
        datasets: [
          {
            label: 'Created',
            data: topUsers.map(user => user.eventStats.created),
            backgroundColor: 'rgba(75, 192, 192, 0.7)',
          },
          {
            label: 'Joined',
            data: topUsers.map(user => user.eventStats.joined),
            backgroundColor: 'rgba(54, 162, 235, 0.7)',
          },
          {
            label: 'Canceled',
            data: topUsers.map(user => user.eventStats.canceled),
            backgroundColor: 'rgba(255, 99, 132, 0.7)',
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Top 5 Most Active Users'
          },
        },
        scales: {
          x: {
            stacked: false,
          },
          y: {
            stacked: false,
            beginAtZero: true
          }
        }
      }
    });

    // Activity trend line chart
    const lineCtx = document.getElementById('platformTrendChart') as HTMLCanvasElement;
    if (!lineCtx) return;

    // Mock monthly data - in a real app, you'd aggregate this from actual data
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'jul', 'aug', 'sept', 'oct', 'nov', 'dis'];

    new Chart(lineCtx, {
      type: 'line',
      data: {
        labels: months,
        datasets: [
          {
            label: 'Created Events',
            data: this.generateRandomTimelineData(6, stats.created),
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            tension: 0.4
          },
          {
            label: 'Joined Events',
            data: this.generateRandomTimelineData(6, stats.joined),
            borderColor: 'rgba(54, 162, 235, 1)',
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            tension: 0.4
          },
          {
            label: 'Canceled Events',
            data: this.generateRandomTimelineData(6, stats.canceled),
            borderColor: 'rgba(255, 99, 132, 1)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            tension: 0.4
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Platform Activity Trends (Last 6 Months)'
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  // Helper to generate random timeline data that adds up to the total
  generateRandomTimelineData(points: number, total: number): number[] {
    const result = [];
    let remaining = total;

    for (let i = 0; i < points - 1; i++) {
      const value = Math.floor(Math.random() * (remaining / 2));
      result.push(value);
      remaining -= value;
    }

    result.push(remaining);
    return result;
  }

  closeVisualization(): void {
    this.showVisualizationPopup = false;
    this.selectedUser = null;

    // Clean up charts
    if (this.activityChart) {
      this.activityChart.destroy();
      this.activityChart = null;
    }

    if (this.userRankingsChart) {
      this.userRankingsChart.destroy();
      this.userRankingsChart = null;
    }
  }

  deleteUser(userId: string): void {
    console.log(userId);

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
    // console.log("profile component form data user update:",formData);

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