import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { TuitionService } from '../../service/tuition.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tuition-create',
  templateUrl: './tuition-create.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class TuitionCreateComponent {
  tuitionForm: FormGroup;

  constructor(private fb: FormBuilder, private tuitionService: TuitionService, private router: Router) {
    this.tuitionForm = this.fb.group({
      studentId: ['', Validators.required],
      amount: ['', Validators.required],
      dueDate: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.tuitionForm.valid) {
      console.log(this.tuitionForm.value);
      this.tuitionService.createTuition(this.tuitionForm.value).subscribe({
        next: () => {
          alert('Tạo học phí thành công');
          this.tuitionForm.reset(); // hoặc chuyển hướng tùy ý
        },
        error: err => {
          console.error('Lỗi tạo học phí:', err);
          alert('Lỗi tạo học phí');
        }
      });
    }
  }
}
