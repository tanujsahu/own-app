import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { LoginRoutes } from './login.routing';
import { MaterialModuleModule } from 'app/common/material-module.module';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule, RouterModule.forChild(LoginRoutes),  MaterialModuleModule, 
  ]
})
export class LoginModule { }
