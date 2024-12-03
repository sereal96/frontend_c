import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskListComponent } from './task-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { TaskService } from '../services/task.service';
import { of } from 'rxjs';

class MockTaskService {
  getAllTasks() {
    return of([{ TaskId: 1, name: 'Task 1' }, { TaskId: 2, name: 'Task 2' }]);
  }

  deleteTask(task: any) {return of(null);}
}

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;
  let taskService: MockTaskService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [TaskListComponent],
      providers: [
        { provide: TaskService, useClass: MockTaskService },
        { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    taskService = TestBed.inject(TaskService);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should call refreshNotes and load tasks on init', () => {
    spyOn(component, 'refreshNotes');
    fixture.detectChanges();
    expect(component.refreshNotes).toHaveBeenCalled();
    expect(component.tasks.length).toBe(0);
  });

  it('should delete a task from the list', () => {
    component.tasks = [{ TaskId: 1, name: 'Task 1' }, { TaskId: 2, name: 'Task 2' }];
    const taskToDelete = { TaskId: 1, name: 'Task 1' };

    spyOn(taskService, 'deleteTask').and.callThrough();

    component.deleteTask(taskToDelete);

    expect(taskService.deleteTask).toHaveBeenCalledWith(taskToDelete);
    expect(component.tasks.length).toBe(1);
  });

  it('should navigate to task details', () => {
    const task = { TaskId: 1, name: 'Task 1' };
    component.callDetailsCom(task);
    expect(router.navigate).toHaveBeenCalledWith(['/task_details', 
        encodeURIComponent(JSON.stringify(task))]);
  });

  it('should navigate to task update form', () => {
    const task = { TaskId: 1, name: 'Task 1' };
    component.callUpdateCom(task);
    expect(router.navigate).toHaveBeenCalledWith(['/task_form', 
        encodeURIComponent(JSON.stringify(task))]);
  });
});