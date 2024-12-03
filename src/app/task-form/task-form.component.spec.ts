import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskFormComponent } from './task-form.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '../services/task.service';

class MockRouter {
  navigate = jasmine.createSpy('navigate');
}

class MockActivatedRoute {
  snapshot = {
    paramMap: {
      get: jasmine.createSpy('get').and.returnValue('{"TaskId": 1, "title": "Task 1"}'), 
    },
  };
}

class MockTaskService {
  addTask = jasmine.createSpy('addTask');
  updateTask = jasmine.createSpy('updateTask');
}

describe('TaskFormComponent', () => {
  let component: TaskFormComponent;
  let fixture: ComponentFixture<TaskFormComponent>;
  let router: MockRouter;
  let activatedRoute: MockActivatedRoute;
  let taskService: MockTaskService;

  beforeEach(() => {
    router = new MockRouter();
    activatedRoute = new MockActivatedRoute();
    taskService = new MockTaskService();

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [TaskFormComponent],
      providers: [
        { provide: Router, useValue: router },
        { provide: ActivatedRoute, useValue: activatedRoute },
        { provide: TaskService, useValue: taskService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskFormComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should add a task when addTask is called', () => {
    component.valueTitle = 'Task Title';
    component.valueDescription = 'Task Description';
    component.valueDueDate = '2024-12-01';
    component.valueIsCompleted = '0';

    component.addTask();

    expect(taskService.addTask).toHaveBeenCalledWith({
      title: 'Task Title',
      description: 'Task Description',
      dueDate: '2024-12-01',
      isCompleted: '0',
    });
  });

  it('should show alert when title is empty', () => {
    spyOn(window, 'alert');

    component.valueTitle = '';
    component.addTask();

    expect(window.alert).toHaveBeenCalledWith('The "Title" field cannot be empty.');
  });

  it('should navigate to task_list on cancel', () => {
    component.onCancel();

    expect(router.navigate).toHaveBeenCalledWith(['/task_list']);
    expect(component.valueTitle).toBe('');
    expect(component.valueDescription).toBe('');
    expect(component.valueDueDate).toBe('');
    expect(component.valueIsCompleted).toBe('');
  });

  it('should update task when updateTask is called', () => {
    const updateData = { TaskId: 1, title: 'Updated Task' };

    component.updateTask(updateData);

    expect(taskService.updateTask).toHaveBeenCalledWith(updateData);
  });

  it('should navigate to task_list on cancel update', () => {
    component.onCancelUpdate();

    expect(router.navigate).toHaveBeenCalledWith(['/task_list']);
  });
});
