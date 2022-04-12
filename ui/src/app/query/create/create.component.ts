import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { localStorageDataService } from 'app/common/localStorage.service';
import { MessageService } from 'app/common/messageservice.service';
import { QueryService } from 'app/service/query.service';

@Component({
  selector: 'create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {


  constructor(private fb: FormBuilder, private localStorageDataService: localStorageDataService, private queryService: QueryService, private messageService: MessageService) {
    this.queryService.change$.subscribe(obj => {
      //console.log("craete query constructor:)", obj)
    })
  }
  queryForm = this.fb.group({
    user_id: new FormControl(''),
    query: new FormControl('', Validators.required),
    queryType: new FormControl('', Validators.required),
    answer: new FormControl([]),
  })

  loginUSer: any;
  ngOnInit(): void {
    this.loginUSer = this.localStorageDataService.decrypt(localStorage.getItem('loginUser'));
    this.loginUSer = this.loginUSer.data;
    // //console.log(" this.loginUSer", this.loginUSer);
  }

  topicList: any = [{ name: 'Nodejs' }, { name: 'Angular' }, { name: 'AWS' },
  { name: 'PHP' }, { name: '.NET' }, { name: 'IOS' }, { name: 'React' }, { name: 'Java' }, { name: 'Android' },
  { name: 'Other' },]

  reset() {

  }

  save() {
    this.queryForm.value.user_id = this.loginUSer._id;
    // //console.log("this.queryForm.value", this.queryForm.value)
    this.queryService.save(this.queryForm.value).then(obj => {
      this.messageService.messageService('query save successfully');
      this.queryService.change$.next(true);
      this.queryService.change$.subscribe(obj => {
        //console.log("response  create query::)", obj)
      })
    }, error => {
      this.messageService.messageService(error.error.message);
    })
  }

}
