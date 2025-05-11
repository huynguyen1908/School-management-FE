import { Component, OnInit } from '@angular/core';
import { Class } from '../../models/class';
import { ClassService } from '../../service/class.service';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-class-list',
  imports: [CommonModule, MatTableModule, MatButtonModule, RouterLink],
  templateUrl: './class-list.component.html',
  styleUrl: './class-list.component.scss'
})
export class ClassListComponent implements OnInit  {
   displayedColumns: string[] = ['classId', 'className', 'grade', 'actions'];
  classes: Class[] = [];

  constructor(private classService: ClassService) {}

  ngOnInit(): void {
    this.loadClasses();
  }


  loadClasses() {
    this.classService.getAllClasses().subscribe({
      next: (data) => this.classes = data,
      error: (err) => console.error('Error fetching classes', err)
    });
  }
}
