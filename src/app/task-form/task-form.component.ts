import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router'; 
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent {
  
  task: any;

  constructor(private http:HttpClient, 
              private router:Router,
              private route:ActivatedRoute,  
              private taskService: TaskService,             
            ){}
  
  valueTaskId: string = '';
  valueTitle: string = '';
  valueDescription: string = '';
  valueDueDate: string = '';
  valueIsCompleted: string = '';

  ngOnInit(): void {
    const taskParam = this.route.snapshot.paramMap.get('task');
    if (taskParam) {
      try {
        this.task = JSON.parse(decodeURIComponent(taskParam));
      } catch (error) {
        console.error('Error with JSON:', error);
        this.task = null;
      }
    }
    console.log('Task:', this.task);
  }

  addTask(): void {
    const taskData = {      
      title: this.valueTitle,
      description: this.valueDescription,
      dueDate: this.valueDueDate,
      isCompleted: this.valueIsCompleted,
    };

    taskData.isCompleted = '0';
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const inputDate: Date = new Date(this.valueDueDate);
    const currentDate: Date = new Date();

    if (!this.valueTitle.trim()) {
      alert('The "Title" field cannot be empty.');
      return;
    }
  
    if (!this.valueDescription.trim()) {
      alert('The "Description" field cannot be empty.');
      return;
    }
  
    if (!this.valueDueDate.trim()) {
      alert('The "DueDate" field cannot be empty.');
      return;
    }

    if (inputDate < currentDate) {      
      alert('The DueDate date entered is less than the current date.');
      return;
    } 

    this.taskService.addTask(taskData);
  }

  onCancel(): void {
    this.valueTitle = '';
    this.valueDescription = '';
    this.valueDueDate = '';
    this.valueIsCompleted = '';
    this.router.navigate(['/task_list']);
  }

  updateTask(updateData: any): void {
    this.taskService.updateTask(updateData);    
  }

  onCancelUpdate(): void {
    this.router.navigate(['/task_list']);
  }
}
