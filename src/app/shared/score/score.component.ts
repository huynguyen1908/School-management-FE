import { Component } from '@angular/core';
import { Studyscore } from '../../models/studyscore';
import { StudyService } from '../../service/study.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-score',
  imports: [FormsModule, CommonModule],
  templateUrl: './score.component.html',
  styleUrl: './score.component.scss'
})
export class ScoreComponent {
  studentId = '';
  scores: Studyscore[] = [];

  constructor(private studyService: StudyService) {}

  fetchScores() {
    if (this.studentId) {
      this.studyService.getStudentScores(this.studentId).subscribe((data) => {
        this.scores = data;
      });
    }
  }
}
