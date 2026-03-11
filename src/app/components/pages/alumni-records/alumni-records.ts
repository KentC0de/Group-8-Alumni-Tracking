import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface AlumniRecordItem {
  schoolId: string;
  name: string;
  email: string;
  course: string;
  year: number;
  employment: string;
  status: 'Active' | 'Pending' | 'Rejected';
}

@Component({
  selector: 'app-alumni-records',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './alumni-records.html',
  styleUrls: ['./alumni-records.scss']
})
export class AlumniRecordsComponent {
  searchTerm: string = '';
  selectedStatus: string = 'All Status';
  selectedCourse: string = 'All Courses';

  alumniRecords: AlumniRecordItem[] = [];

  get totalAlumni(): number {
    return this.alumniRecords.length;
  }

  get activeCount(): number {
    return this.alumniRecords.filter(record => record.status === 'Active').length;
  }

  get pendingCount(): number {
    return this.alumniRecords.filter(record => record.status === 'Pending').length;
  }

  get rejectedCount(): number {
    return this.alumniRecords.filter(record => record.status === 'Rejected').length;
  }

  get filteredRecords(): AlumniRecordItem[] {
    return this.alumniRecords.filter((record: AlumniRecordItem) => {
      const search = this.searchTerm.toLowerCase();

      const matchesSearch =
        record.schoolId.toLowerCase().includes(search) ||
        record.name.toLowerCase().includes(search) ||
        record.email.toLowerCase().includes(search);

      const matchesStatus =
        this.selectedStatus === 'All Status' || record.status === this.selectedStatus;

      const matchesCourse =
        this.selectedCourse === 'All Courses' || record.course === this.selectedCourse;

      return matchesSearch && matchesStatus && matchesCourse;
    });
  }

  editRecord(record: AlumniRecordItem): void {
    console.log('Edit alumni record:', record);
  }

  deleteRecord(record: AlumniRecordItem): void {
    console.log('Delete alumni record:', record);
  }
}