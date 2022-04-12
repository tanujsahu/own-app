import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { RouterModule } from '@angular/router';
import { RegisterRoutes } from './register.routing';
import { MaterialModuleModule } from 'app/common/material-module.module';
import { RemoveWhitespacePipe } from 'app/common/remove-whitespace.pipe';

@NgModule({
  declarations: [
    RegisterComponent
  ],
  imports: [
    CommonModule, RouterModule.forChild(RegisterRoutes), MaterialModuleModule
  ],
  providers: [RemoveWhitespacePipe]
})
export class RegisterModule { }
