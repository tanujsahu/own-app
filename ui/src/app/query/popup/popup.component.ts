import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { localStorageDataService } from 'app/common/localStorage.service';
import { QueryService } from 'app/service/query.service';

@Component({
  selector: 'popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data, private localStorageDataService: localStorageDataService, private queryService: QueryService) { }

  loginUSer: any;
  ngOnInit(): void {
    this.loginUSer = this.localStorageDataService.decrypt(localStorage.getItem('loginUser'));
    this.loginUSer = this.loginUSer.data;
    //console.log("dataL", this.data);
    if (this.data) {
      this.getQuery();
    }
  }

  ansList: any = [];
  getQuery() {
    this.queryService.getById(this.data).then((obj: any) => {
    //  console.log("details", obj);
      this.ansList = obj.answerList
    }, error => {
      //console.log("errorL", error.error.message);
    })
  }

}
