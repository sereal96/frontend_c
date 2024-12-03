import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskDetailsComponent } from './task-details.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

class MockRouter { navigate = jasmine.createSpy('navigate'); }

class MockActivatedRoute {
  snapshot = {
    paramMap: {
      get: jasmine.createSpy('get').and.returnValue('{"TaskId": 1, "name": "Task 1"}'),
    },
  };
}

describe('TaskDetailsComponent', () => {
  let component: TaskDetailsComponent;
  let fixture: ComponentFixture<TaskDetailsComponent>;
  let router: MockRouter;
  let activatedRoute: MockActivatedRoute;

  beforeEach(() => {
    router = new MockRouter();
    activatedRoute = new MockActivatedRoute();

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [TaskDetailsComponent],
      providers: [
        { provide: Router, useValue: router },
        { provide: ActivatedRoute, useValue: activatedRoute },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskDetailsComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate back to task list on return', () => {
    component.onReturn();

    expect(router.navigate).toHaveBeenCalledWith(['/task_list']);
  });
});
