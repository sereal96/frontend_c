import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent {
  task: any;

  constructor(private http:HttpClient,
              private router:Router,
              private route:ActivatedRoute,){}

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
        console.error('Error al parsear el JSON:', error);
        this.task = null;
      }
    }
  }


  onReturn(): void {
    this.router.navigate(['/task_list']);
  }
}
