// chart.component.ts
import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
  standalone: false
})
export class ChartComponent implements OnChanges, OnDestroy {
  @Input() isVisible = false;
  @Input() userData: any = null;
  @Input() allUserData: any[] = [];
  @Input() isAdmin = false;
  @Output() close = new EventEmitter<void>();

  Highcharts: typeof Highcharts = Highcharts;
  activityChartOptions: Highcharts.Options = {};
  timelineChartOptions: Highcharts.Options = {};
  topUsersChartOptions: Highcharts.Options = {};
  trendChartOptions: Highcharts.Options = {};
  charts: Highcharts.Chart[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if ((changes['isVisible'] && this.isVisible) || 
        (changes['userData'] && this.isVisible) || 
        (changes['allUserData'] && this.isVisible)) {
      setTimeout(() => {
        this.initCharts();
      }, 100);
    }
  }

  ngOnDestroy(): void {
    // Destroy all charts
    this.charts.forEach(chart => {
      if (chart) chart.destroy();
    });
    this.charts = [];
  }

  closeVisualization(): void {
    this.close.emit();
  }

  initCharts(): void {
    // Destroy previous charts
    this.charts.forEach(chart => {
      if (chart) chart.destroy();
    });
    this.charts = [];

    if (this.userData) {
      this.createSingleUserCharts();
    } else if (this.isAdmin) {
      this.createAllUsersCharts();
    }
  }

  createSingleUserCharts(): void {
    const stats = this.userData.eventStats;

    // Activity pie chart
    this.activityChartOptions = {
      chart: {
        type: 'pie',
        height: 300
      },
      title: {
        text: 'User Activity Distribution'
      },
      series: [{
        type: 'pie',
        name: 'Activities',
        data: [
          { name: 'Created', y: stats.created, color: '#4bc0c0' },
          { name: 'Joined', y: stats.joined, color: '#36a2eb' },
          { name: 'Canceled', y: stats.canceled, color: '#ff6384' }
        ]
      }]
    };

    // Timeline chart
    const months = Array.from({ length: 6 }, (_, i) => {
      const date = new Date();
      date.setMonth(date.getMonth() - 5 + i);
      return date.toLocaleString('default', { month: 'short' });
    });

    this.timelineChartOptions = {
      chart: {
        type: 'line',
        height: 300
      },
      title: {
        text: 'Activity Timeline (Last 6 Months)'
      },
      xAxis: {
        categories: months
      },
      yAxis: {
        title: {
          text: 'Count'
        }
      },
      series: [
        {
          name: 'Created',
          type: 'line',
          data: this.generateRandomTimelineData(6, stats.created),
          color: '#4bc0c0'
        },
        {
          name: 'Joined',
          type: 'line',
          data: this.generateRandomTimelineData(6, stats.joined),
          color: '#36a2eb'
        },
        {
          name: 'Canceled',
          type: 'line',
          data: this.generateRandomTimelineData(6, stats.canceled),
          color: '#ff6384'
        }
      ]
    };

    setTimeout(() => {
      if (document.getElementById('activity-chart')) {
        const chart = Highcharts.chart('activity-chart', this.activityChartOptions);
        this.charts.push(chart);
      }
      
      if (document.getElementById('timeline-chart')) {
        const chart = Highcharts.chart('timeline-chart', this.timelineChartOptions);
        this.charts.push(chart);
      }
    }, 0);
  }

  createAllUsersCharts(): void {
    // Overall stats
    const stats = this.getOverallStats();

    // Platform pie chart
    this.activityChartOptions = {
      chart: {
        type: 'pie',
        height: 300
      },
      title: {
        text: 'Platform Activity Distribution'
      },
      series: [{
        type: 'pie',
        name: 'Activities',
        data: [
          { name: 'Created', y: stats.created, color: '#4bc0c0' },
          { name: 'Joined', y: stats.joined, color: '#36a2eb' },
          { name: 'Canceled', y: stats.canceled, color: '#ff6384' }
        ]
      }]
    };

    // Top users chart
    const topUsers = [...this.allUserData]
      .sort((a, b) => {
        const totalA = a.eventStats.created + a.eventStats.joined + a.eventStats.canceled;
        const totalB = b.eventStats.created + b.eventStats.joined + b.eventStats.canceled;
        return totalB - totalA;
      })
      .slice(0, 5);

    this.topUsersChartOptions = {
      chart: {
        type: 'column',
        height: 300
      },
      title: {
        text: 'Top 5 Most Active Users'
      },
      xAxis: {
        categories: topUsers.map(user => user.Name),
        crosshair: true
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Count'
        }
      },
      tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
          '<td style="padding:0"><b>{point.y}</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
      },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0
        }
      },
      series: [
        {
          name: 'Created',
          type: 'column',
          data: topUsers.map(user => user.eventStats.created),
          color: '#4bc0c0'
        },
        {
          name: 'Joined',
          type: 'column',
          data: topUsers.map(user => user.eventStats.joined),
          color: '#36a2eb'
        },
        {
          name: 'Canceled',
          type: 'column',
          data: topUsers.map(user => user.eventStats.canceled),
          color: '#ff6384'
        }
      ]
    };

    // Platform trend chart
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    this.trendChartOptions = {
      chart: {
        type: 'line',
        height: 300
      },
      title: {
        text: 'Platform Activity Trends (Last 12 Months)'
      },
      xAxis: {
        categories: months
      },
      yAxis: {
        title: {
          text: 'Count'
        }
      },
      series: [
        {
          name: 'Created Events',
          type: 'line',
          data: this.generateRandomTimelineData(12, stats.created),
          color: '#4bc0c0'
        },
        {
          name: 'Joined Events',
          type: 'line',
          data: this.generateRandomTimelineData(12, stats.joined),
          color: '#36a2eb'
        },
        {
          name: 'Canceled Events',
          type: 'line',
          data: this.generateRandomTimelineData(12, stats.canceled),
          color: '#ff6384'
        }
      ]
    };

    setTimeout(() => {
      if (document.getElementById('platform-pie-chart')) {
        const chart = Highcharts.chart('platform-pie-chart', this.activityChartOptions);
        this.charts.push(chart);
      }
      
      if (document.getElementById('top-users-chart')) {
        const chart = Highcharts.chart('top-users-chart', this.topUsersChartOptions);
        this.charts.push(chart);
      }
      
      if (document.getElementById('platform-trend-chart')) {
        const chart = Highcharts.chart('platform-trend-chart', this.trendChartOptions);
        this.charts.push(chart);
      }
    }, 0);
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

  getOverallStats(): any {
    if (!this.allUserData?.length) return { created: 0, joined: 0, canceled: 0, total: 0 };

    const totalCreated = this.allUserData.reduce((sum, user) => sum + (user.eventStats?.created || 0), 0);
    const totalJoined = this.allUserData.reduce((sum, user) => sum + (user.eventStats?.joined || 0), 0);
    const totalCanceled = this.allUserData.reduce((sum, user) => sum + (user.eventStats?.canceled || 0), 0);

    return {
      totalUsers: this.allUserData.length,
      created: totalCreated,
      joined: totalJoined,
      canceled: totalCanceled,
      total: totalCreated + totalJoined + totalCanceled
    };
  }
}