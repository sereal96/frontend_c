import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskFormComponent } from './task-form/task-form.component';
import { TaskDetailsComponent } from './task-details/task-details.component';

const routes: Routes = [
  {path: '', redirectTo: '/', pathMatch: 'full' },  
  {path: 'task_list', component: TaskListComponent},
  {path: 'task_form', component: TaskFormComponent},  
  {path: 'task_details', component: TaskDetailsComponent},    
  { path: 'task_form/:task', component: TaskFormComponent},  
  { path: 'task_details/:task', component: TaskDetailsComponent},  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
