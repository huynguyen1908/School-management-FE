import { Component } from '@angular/core';
import { Assignment } from '../../models/assignment';
import { ActivatedRoute } from '@angular/router';
import { StudyService } from '../../service/study.service';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';


@Component({
  selector: 'app-assignment-detail',
  imports: [CommonModule, MatProgressSpinnerModule, MatCardModule],
  templateUrl: './assignment-detail.component.html',
  styleUrl: './assignment-detail.component.scss'
})
export class AssignmentDetailComponent {
  assignment?: Assignment;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private studyService: StudyService
  ) {}

  ngOnInit(): void {
    const assignmentId = this.route.snapshot.paramMap.get('assignmentId');
    if (assignmentId) {
      this.studyService.getAssignmentById(assignmentId).subscribe({
        next: (data) => {
          this.assignment = data;
          this.loading = false;
        },
        error: () => {
          this.loading = false;
        }
      });
    }
  }
}
