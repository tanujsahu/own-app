import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MessageService } from 'app/common/messageservice.service';
import { RemoveWhitespacePipe } from 'app/common/remove-whitespace.pipe';
import { UserService } from 'app/service/user.service';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @ViewChild('callAPIDialog') callAPIDialog: TemplateRef<any>;

  constructor(private fb: FormBuilder, private dialog: MatDialog, private removeWhitespacePipe: RemoveWhitespacePipe, private router: Router, private messageService: MessageService, private userService: UserService) { }
  registerForm = this.fb.group({
    name: new FormControl(''.trim(), [Validators.required, this.removeWhitespacePipe.noWhiteSpace]),
    emailId: new FormControl('', [Validators.required, Validators.email]),
    mobile: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(10)]),
    designation: new FormControl('', Validators.required),
  })

  designationList: any = [{ name: 'Software Developer' }, { name: 'Web Developer' }, { name: 'Software trainee' },
  { name: 'Team Manager' }, { name: 'Projact Manager' }, { name: 'System Engineer' }, { name: 'Other' }]

  ngOnInit(): void {
  }

  register() {
    //console.log("register", this.registerForm.value);
    this.userService.register(this.registerForm.value).then(obj => {
      this.messageService.messageService('register Succesfully Please Verify Email link send on your mailId');
      this.router.navigate(['./login']);
      this.callAPI()
    }, error => {
      //console.log("Error:", error.error.message);
      this.messageService.messageService(error.error.message);
    })
  }

  callAPI() {
    let dialogRef = this.dialog.open(this.callAPIDialog, { disableClose: true });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        if (result === 'yes') {
          // console.log('User clicked yes.');
        } else if (result === 'no') {
          // console.log('User clicked no.');
        }
      }
    })
  }

}
