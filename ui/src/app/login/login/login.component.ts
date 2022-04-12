import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { localStorageDataService } from 'app/common/localStorage.service';
import { MessageService } from 'app/common/messageservice.service';
import { UserService } from 'app/service/user.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder, private localStorageDataService: localStorageDataService, private router: Router, private messageService: MessageService, private userService: UserService) { }
  loginForm = this.fb.group({
    userId: new FormControl('', [Validators.required, Validators.email]),
    pwd: new FormControl('', Validators.required),
  })


  ngOnInit(): void {
  }

  login() {
    //console.log("login", this.loginForm.value);
    this.userService.login(this.loginForm.value).then(data => {
      this.router.navigate(['/dashboard'])
      this.messageService.messageService('Login Succesfully');
      localStorage.setItem("loginUser", this.localStorageDataService.encrypt(data))
    }, error => {
      //console.log("login erro:", error.error.message);
      this.messageService.messageService(error.error.message);
    })
  }

  forgot() {
    //console.log("Forgot Password work");
    localStorage.setItem('forgotConfirm', 'forgot')
  }

}
