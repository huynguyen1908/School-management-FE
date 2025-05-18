import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ClassService } from '../../service/class.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-create-class',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    HttpClientModule
  ],
  templateUrl: './create-class.component.html',
  styleUrl: './create-class.component.scss'
})
export class CreateClassComponent {
  classForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private classService: ClassService,
    private router: Router
  ) {
    this.classForm = this.fb.group({
      className: ['', Validators.required],
      grade: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.classForm.invalid) return;

    this.classService.createClass(this.classForm.value).subscribe({
      next: () => {
        alert('Tạo lớp thành công!');
        this.router.navigate(['/admin/classes']);
      },
      error: err => {
        console.error('Tạo lớp thất bại:', err);
        alert('Tạo lớp thất bại!');
      }
    });
  }
}
