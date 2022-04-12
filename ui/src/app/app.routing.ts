import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthGuard } from './common/auth.guard';

const routes: Routes = [
  {
    path: '', redirectTo: 'dashboard', pathMatch: 'full',
  },
  {
    path: '', component: AdminLayoutComponent,
    children: [{
      path: '', loadChildren: () => import('./layouts/admin-layout/admin-layout.module').then(m => m.AdminLayoutModule)
    }]
  },
  { path: 'forgot', loadChildren: () => import('./forgot/forgot.module').then(m => m.ForgotModule) },
  { path: 'verify', loadChildren: () => import('./verify/verify.module').then(m => m.VerifyModule) },
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule), },
  { path: 'register', loadChildren: () => import('./register/register.module').then(m => m.RegisterModule) },
  {
    path: '**', redirectTo: 'dashboard', pathMatch: 'full',
  },

  // { path: 'register', loadChildren: () => import('./register/register.module').then(m => m.RegisterModule) },
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
