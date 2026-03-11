import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reports.html',
  styleUrls: ['./reports.scss']
})
export class ReportsComponent {
  statCards = [
    { label: 'Total Alumni', value: '0', icon: 'pi pi-users', theme: 'blue' },
    { label: 'Employment Rate', value: '0%', icon: 'pi pi-briefcase', theme: 'green' },
    { label: 'Avg Grad Year', value: '—', icon: 'pi pi-calendar', theme: 'purple' },
    { label: 'Programs Offered', value: '3', icon: 'pi pi-chart-bar', theme: 'orange' }
  ];

  graduatesPerYear = [
    { year: '2020', count: 0 },
    { year: '2021', count: 0 },
    { year: '2022', count: 0 },
    { year: '2023', count: 0 },
    { year: '2024', count: 0 }
  ];

  alumniByProgram = [
    { program: 'Information Technology', count: 0 },
    { program: 'Technology Communication Management', count: 0 },
    { program: 'Electro-Mechanical Technology', count: 0 }
  ];

  verificationLegend = [
    { label: 'Active', className: 'legend-green' },
    { label: 'Pending', className: 'legend-yellow' },
    { label: 'Rejected', className: 'legend-red' }
  ];

  employmentLegend = [
    { label: 'Employed', className: 'legend-navy' },
    { label: 'Unemployed', className: 'legend-blue' },
    { label: 'Self-Employed', className: 'legend-sky' },
    { label: 'Further Studies', className: 'legend-light' }
  ];

  get maxYearCount(): number {
    const counts = this.graduatesPerYear.map(item => item.count);
    const max = Math.max(...counts, 0);
    return max === 0 ? 1 : max;
  }

  get maxProgramCount(): number {
    const counts = this.alumniByProgram.map(item => item.count);
    const max = Math.max(...counts, 0);
    return max === 0 ? 1 : max;
  }

  getYearBarHeight(count: number): number {
    return (count / this.maxYearCount) * 190;
  }

  getProgramBarWidth(count: number): number {
    return (count / this.maxProgramCount) * 100;
  }

  exportReport(): void {
    console.log('Export report clicked');
  }
}