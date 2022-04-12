import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskComponent } from './task/task.component';
import { RouterModule } from '@angular/router';
import { TaskRoutes } from './task.routing';
import { AddNewComponent } from './add-new/add-new.component';
import { MaterialModuleModule } from 'app/common/material-module.module';

@NgModule({
  declarations: [
    TaskComponent,
    AddNewComponent
  ],
  imports: [
    CommonModule, RouterModule.forChild(TaskRoutes),MaterialModuleModule
  ]
})
export class TaskModule { }
