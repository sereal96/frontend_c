import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private readonly API_get = 'https://localhost:7282/api/TaskModel/';
 
  constructor(private http: HttpClient, private router: Router) {}

  getAllTasks(): Observable<any> {
    return this.http.get(this.API_get + 'GetAllTask');
  }

  deleteTask(task: any): Observable<any> {
    const headers = { 'Content-Type': 'application/json' };
    const options = { headers, body: JSON.stringify(task) };
    return this.http.delete(this.API_get + 'DeleteTask2', options);
  }

  updateTask(note: any): void {
    const headers = { 'Content-Type': 'application/json' };    
    this.http.put(this.API_get + 'UpdateTask2', JSON.stringify(note), { headers }).subscribe({
      next: (response) => {        
        this.router.navigate(['/task_list']);
      },
      error: (err) => {
        console.error('Error:', err);
      },
    });
  }

  addTask(taskData: any): void {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.post(this.API_get + 'AddTask2', JSON.stringify(taskData), { headers }).subscribe({
      next: (response) => {
        this.router.navigate(['/task_list']);
      },
      error: (err) => {
        console.error('Error:', err);
      },
    });
  }
}
