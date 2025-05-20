import { Component } from '@angular/core';
import { TuitionService } from '../../service/tuition.service';
import { Tuition } from '../../models/tuition';
import { TuitionRequest } from '../../models/requests/tuition-request';
import { TuitionStatus } from '../../models/tuition-status.enum';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tuition-list',
  imports: [CommonModule],
  templateUrl: './tuition-list.component.html',
  styleUrl: './tuition-list.component.scss'
})
export class TuitionListComponent {
  tuitions: Tuition[] = [];
  studentId = '';
  error = '';

  constructor(
    private tuitionService: TuitionService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const studentId = this.route.snapshot.paramMap.get('id');
    if (studentId && studentId.trim() !== '') {
      this.tuitionService.getTuitionsByStudentId(studentId).subscribe({
        next: (data) => {
          this.tuitions = data;
        },
        error: (err) => {
          this.error = 'Không thể lấy dữ liệu học phí.';
        }
      });
    } else {
      this.error = 'Không tìm thấy thông tin học sinh.';
    }
  }
}
