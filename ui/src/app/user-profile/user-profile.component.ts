import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { localStorageDataService } from 'app/common/localStorage.service';
import { UserService } from 'app/service/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  registerForm: FormGroup;
  constructor(private fb: FormBuilder, private userService: UserService, private localStorageDataService: localStorageDataService) {
    this.loginUser = this.localStorageDataService.decrypt(localStorage.getItem('loginUser'));
    // console.log('this.loginUser', this.loginUser, this.loginUser.data?._id);
    this.getUserDetails();

    // setTimeout(() => {
    this.registerForm = this.fb.group({
      name: new FormControl('', Validators.required),
      emailId: new FormControl('', Validators.email),
      mobile: new FormControl('', Validators.required),
      designation: new FormControl('', Validators.required),
    })
    // }, 1000)

  }



  loginUser: any;
  ngOnInit() {
    this.registerForm.value.name = this.details?.name;
  }

  details: any;
  getUserDetails() {
    this.userService.getById({ _id: this.loginUser.data?._id }).then(data => {
      this.details = data;
      // this.registerForm.setValue(
      //   {
      //     name: this.details?.name,
      //     mobile: this.details?.mobile,
      //   }
      // );
      // console.log("details:", this.registerForm.value)

    }, error => {
      //  console.log("error:", error)
    })
  }

  update() {
    //  console.log("form data:", this.registerForm.value)
  }

}
