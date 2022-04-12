import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { localStorageDataService } from 'app/common/localStorage.service';
import { MessageService } from 'app/common/messageservice.service';
import { QueryService } from 'app/service/query.service';

@Component({
  selector: 'answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.css']
})
export class AnswerComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data, private localStorageDataService: localStorageDataService, private messageService: MessageService, private fb: FormBuilder, private queryService: QueryService) { }

  answerForm = this.fb.group({
    answerList: new FormControl(
      [{
        answer: new FormControl(''),
        ans_user_id: new FormControl('')
      }]
    ),
    _id: new FormControl(''),
    ans: new FormControl(''),
  })

  loginUSer: any;
  ngOnInit(): void {
    this.loginUSer = this.localStorageDataService.decrypt(localStorage.getItem('loginUser'));
    this.loginUSer = this.loginUSer.data;
    // //console.log(" this.loginUSer", this.loginUSer, this.data);
  }

  save() {
    const ans_dateTime = new Date().toISOString();
    const data = { _id: this.data, answerList: [{ answer: this.answerForm.value.ans, ans_user_id: this.loginUSer._id, ans_dateTime: ans_dateTime }] }
    //console.log(" this.loginUSer", data);
    this.queryService.save(data).then(obj => {
      //console.log("answer Save successfully", obj)
      this.messageService.messageService("Answer Updated Succesfully")
    }, error => {
      //console.log("error:", error.error.message)
      this.messageService.messageService(error.error.message)
    })
  }

}
