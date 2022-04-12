import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'app/common/messageservice.service';
import { UserService } from 'app/service/user.service';

@Component({
  selector: 'forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit {

  constructor(private fb: FormBuilder, private router: Router, private messageService: MessageService, private userService: UserService) { }
  userForm = this.fb.group({
    emailId: new FormControl('', [Validators.required, Validators.email]),
    otp: new FormControl(''),
    fnName: new FormControl('sendOtp')

  })

  verifyForm = this.fb.group({
    otp: new FormControl('', [Validators.required]),
    fnName: new FormControl('matchOtp'),
    emailId: new FormControl(''),
  })

  setNewPwdForm = this.fb.group({
    password: new FormControl('', [Validators.required]),
    emailId: new FormControl(''),
    fnName: new FormControl('setPwd'),
  })

  sendOtp: boolean = true; //----- send otp
  verifyOtp: boolean = false; //------ verify otp
  setNewPwd: boolean = false;
  otp: any = Math.floor(1000 + Math.random() * 9000);

  ngOnInit(): void {
    const forgotConfirm = localStorage.getItem('forgotConfirm');
    // console.log("forgotConfirm", forgotConfirm);
    if (forgotConfirm == 'forgot') {

    }
    else {
      this.router.navigate(['./login'])
    }
  }

  sendOTP() {
    this.userForm.value.otp = this.otp
    if (this.userForm.valid) {
      this.userService.forgot(this.userForm.value).then(obj => {
        this.messageService.messageService('otp sent on your email');
        this.verifyOtp = true;
        this.sendOtp = false;
      }, error => {
        this.messageService.messageService(error.error.message);
      })

    }
    else {
      this.messageService.messageService('Please enter your correct email');
    }
  }

  verifyOTP() {
    this.verifyForm.value.emailId = this.userForm.value.emailId;
    this.userService.forgot(this.verifyForm.value).then(obj => {
      this.messageService.messageService('otp verify sucess');
      this.setNewPwd = true;
      this.verifyOtp = false;
    }, error => {
      this.messageService.messageService(error.error.message);
    })
  }

  setNewPass() {
    this.setNewPwdForm.value.emailId = this.userForm.value.emailId;
    this.userService.forgot(this.setNewPwdForm.value).then(obj => {
      this.messageService.messageService('set new password');
      localStorage.removeItem('forgotConfirm')
    }, error => {
      this.messageService.messageService(error.error.message);
    })
  }

}
