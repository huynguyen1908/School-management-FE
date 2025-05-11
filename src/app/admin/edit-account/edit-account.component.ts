import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserAccount } from '../../models/user-account';
import { UserAccountService } from '../../service/user-account.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-edit-account',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-account.component.html',
  styleUrl: './edit-account.component.scss'
})
export class EditAccountComponent implements OnInit {
  accountForm!: FormGroup;
  accountId!: string;
  accountData!: UserAccount;

  constructor(
    private fb: FormBuilder,
    private accountService: UserAccountService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.accountId = this.route.snapshot.paramMap.get('id')!;
    this.loadAccount();
  }

  loadAccount(): void {
    this.accountService.getAccountById(this.accountId).subscribe({
      next: (data) => {
        this.accountData = data;
        this.accountForm = this.fb.group({
          username: [data.username, Validators.required],
          password: [data.password, Validators.required],
          createAt: [data.createAt, Validators.required],
          role: [data.role],
          createBy: [data.createdBy]
        });
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  // onSubmit(): void {
  //   if (this.accountForm.invalid) return;

  //   this.accountService.deleteAccount(this.accountId, this.accountForm.value).subscribe({
  //     next: () => {
  //       alert('Cập nhật tài khoản thành công!');
  //       this.router.navigate(['/admin/accounts']); // hoặc route nào bạn có
  //     },
  //     error: (err) => {
  //       console.error(err);
  //       alert('Cập nhật thất bại!');
  //     }
  //   });
  // }

  
}