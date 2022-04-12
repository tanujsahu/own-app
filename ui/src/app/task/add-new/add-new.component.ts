import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { localStorageDataService } from 'app/common/localStorage.service';
import { MessageService } from 'app/common/messageservice.service';
import { TaskService } from 'app/service/task.service';

@Component({
  selector: 'add-new',
  templateUrl: './add-new.component.html',
  styleUrls: ['./add-new.component.css']
})
export class AddNewComponent implements OnInit {

  constructor(private fb: FormBuilder, private localStorageDataService: localStorageDataService, private taskService: TaskService, private messageService: MessageService) { }

  taskForm = this.fb.group({
    title: new FormControl('', Validators.required),
    user_id: new FormControl(''),
    description: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    duration: new FormControl('', Validators.required),
  })

  duratationList: any = [{ name: '00:30' }, { name: '01:00' }, { name: '01:30' }, { name: '02:00' }, { name: '02:30' },
  { name: '03:00' }, { name: '03:30' }, { name: '04:00' }, { name: '04:30' }, { name: '05:00' }, { name: '05:30' },
  { name: '06:00' }, { name: '06:30' }, { name: '07:00' }, { name: '07:30' }, { name: '08:00' }, { name: '08:30' }]

  loginUser: any;
  ngOnInit(): void {
    this.loginUser = this.localStorageDataService.decrypt(localStorage.getItem('loginUser'));
    this.loginUser = this.loginUser.data;
    // console.log("oninit", this.loginUser);
  }
  maxdate: any = new Date();

  save() {
    this.taskForm.value.user_id = this.loginUser._id;
    console.log("save task form::)", this.taskForm);
    this.taskService.save(this.taskForm.value).then(obj => {
      //  console.log("save task form::)", obj);
      this.messageService.messageService('Save Succesfully');
    }, error => {
      //  console.log("error :)", error);
      this.messageService.messageService(error.error.message);
    })
  }

  reset() {

  }

  toDayDate: any = new Date();
}
