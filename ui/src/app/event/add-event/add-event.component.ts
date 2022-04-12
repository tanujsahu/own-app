import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { localStorageDataService } from 'app/common/localStorage.service';
import { MessageService } from 'app/common/messageservice.service';
import { EventService } from 'app/service/event.service';

@Component({
  selector: 'add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {

  constructor(private fb: FormBuilder, private localStorageDataService: localStorageDataService, private eventService: EventService, private messageService: MessageService) { }
  eventForm = this.fb.group({
    title: new FormControl('', Validators.required),
    user_id: new FormControl(''),
    description: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    eventType: new FormControl('', Validators.required),
  })

  eventType: any = [{ name: 'public' }, { name: 'private' }]
  loginUser: any;
  ngOnInit(): void {
    this.loginUser = this.localStorageDataService.decrypt(localStorage.getItem('loginUser'));
    this.loginUser = this.loginUser?.data;
  }

  reset() { }

  save() {
    this.eventForm.value.user_id = this.loginUser?._id;
    this.eventService.save(this.eventForm.value).then(obj => {
      this.messageService.messageService("Save successfully")
    }, error => {
      this.messageService.messageService(error.error.message)
    })
  }
}
