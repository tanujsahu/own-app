import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgotComponent } from './forgot/forgot.component';
import { RouterModule } from '@angular/router';
import { ForgotRoutes } from './forgot.routing';
import { MaterialModuleModule } from 'app/common/material-module.module';

@NgModule({
  declarations: [
    ForgotComponent
  ],
  imports: [CommonModule, RouterModule.forChild(ForgotRoutes), MaterialModuleModule]
})

export class ForgotModule { }
