import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  constructor(private http:HttpClient,              
              private router:Router, 
              private taskService: TaskService,                           
              ){                
              }

  tasks: any=[];

  ngOnInit():void{
    this.refreshNotes();     
  }

  refreshNotes(): void {
    this.taskService.getAllTasks().subscribe((data) => {this.tasks = data;});
  }

  deleteTask(task: any): void {
    this.taskService.deleteTask(task).subscribe({
      next: () => {
        this.tasks = this.tasks.filter((note: any) => note.TaskId !== task.TaskId);
      },
      error: (err) => {
        console.error('Error:', err);
      },
    });
  }
  
  callDetailsCom(task: any): void {
    const encodedTask = encodeURIComponent(JSON.stringify(task));
    this.router.navigate(['/task_details', encodedTask]);    
  }

  callUpdateCom(task: any): void {
    const encodedTask = encodeURIComponent(JSON.stringify(task));
    this.router.navigate(['/task_form', encodedTask]);    
  }
}
