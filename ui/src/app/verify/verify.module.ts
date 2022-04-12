import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerifyComponent } from './verify/verify.component';
import { RouterModule } from '@angular/router';
import { VerifyRoutes } from './verify.routing';



@NgModule({
  declarations: [
    VerifyComponent
  ],
  imports: [
    CommonModule, RouterModule.forChild(VerifyRoutes)
  ]
})
export class VerifyModule { }
