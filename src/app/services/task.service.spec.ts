import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TaskService } from './task.service';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { of } from 'rxjs';

describe('TaskService', () => {
  let serviceTask: TaskService;
  let httpMock: HttpTestingController;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        TaskService,
        { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } }
      ]
    });
    serviceTask = TestBed.inject(TaskService);
    httpMock = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('TaskService should be created', () => {
    expect(serviceTask).toBeTruthy();
  });

  it('should fetch all tasks from GetAllTask with GET', () => {
    const mockTasks = [{ id: 1, dato: 'Task 1' }, { id: 2, dato: 'Task 2' }];
    
    serviceTask.getAllTasks().subscribe(tasks => {
      expect(tasks).toEqual(mockTasks);
    });

    const req = httpMock.expectOne('https://localhost:7282/api/TaskModel/GetAllTask');
    expect(req.request.method).toBe('GET');
    req.flush(mockTasks);  
  });

  it('should delete a task', () => {
    const mockTask = { id: 1, dato: 'Task 1' };
    const headers = { 'Content-Type': 'application/json' };
    const options = { headers, body: JSON.stringify(mockTask) };

    serviceTask.deleteTask(mockTask).subscribe(response => {
      expect(response).toEqual(mockTask);
    });

    const req = httpMock.expectOne('https://localhost:7282/api/TaskModel/DeleteTask2');
    expect(req.request.method).toBe('DELETE');
    expect(req.request.body).toEqual(JSON.stringify(mockTask));
    req.flush(mockTask);
  });

  it('should update a task', () => {
    const mockTask = { id: 1, name: 'Task 1' };

    serviceTask.updateTask(mockTask);

    const req = httpMock.expectOne('https://localhost:7282/api/TaskModel/UpdateTask2');
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(JSON.stringify(mockTask));
    req.flush(mockTask);
    expect(router.navigate).toHaveBeenCalledWith(['/task_list']);
  });

  it('should add a task', () => {
    const mockTask = { id: 1, name: 'New Task' };

    serviceTask.addTask(mockTask);

    const req = httpMock.expectOne('https://localhost:7282/api/TaskModel/AddTask2');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(JSON.stringify(mockTask));
    req.flush(mockTask);
    expect(router.navigate).toHaveBeenCalledWith(['/task_list']);
  });

  it('should handle error when adding a task', () => {
    const mockTask = { id: 1, name: 'New Task' };
    const errorMessage = 'Error adding task';

    serviceTask.addTask(mockTask);

    const req = httpMock.expectOne('https://localhost:7282/api/TaskModel/AddTask2');
    expect(req.request.method).toBe('POST');
    req.flush(errorMessage, { status: 500, statusText: 'Server Error' });
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should handle error when updating a task', () => {
    const mockTask = { id: 1, name: 'Task 1' };
    const errorMessage = 'Error updating task';

    serviceTask.updateTask(mockTask);

    const req = httpMock.expectOne('https://localhost:7282/api/TaskModel/UpdateTask2');
    expect(req.request.method).toBe('PUT');
    req.flush(errorMessage, { status: 500, statusText: 'Server Error' });
    expect(router.navigate).not.toHaveBeenCalled();
  });
});
