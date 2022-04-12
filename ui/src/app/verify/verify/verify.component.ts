import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'app/common/messageservice.service';
import { UserService } from 'app/service/user.service';

@Component({
  selector: 'verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent implements OnInit {

  id: any;

  constructor(private router: Router, private userService: UserService, private messageService: MessageService, private _router: ActivatedRoute) {
    this._router.queryParams.subscribe(params => {
    //  console.log(Object.keys(params) + "");
      this.id = Object.keys(params) + "";
    }
    );
  }

  ngOnInit(): void {
    //  console.log("verify page", this.id + "ffffff");
    if (this.id) {
      this.userService.checkId(this.id).then((obj: any) => {
        // console.log("CheckId", obj)
        if (obj.length > 0) {
          // console.log("true")
        }
        else {
          this.router.navigate(['/login']);
          //console.log("false")
        }
      }, error => {
        this.router.navigate(['/register']);
      })
    }
    else {
      localStorage.removeItem('loginUser');
      this.router.navigate(['/register'])
    }
  }

  verify() {
    this.userService.verify({ verify: true, _id: this.id }).then(obj => {
      //console.log("Your mail is verify successfully::)", obj)
      this.messageService.messageService('Your mail is verify successfully !!');
      setTimeout(() => {
        this.router.navigate(['/login'])
      }, 500);
    }, error => {
      //console.log('Your mail is not verify', error)
      this.messageService.messageService(error.error.message1)
    })
  }


}
