import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { localStorageDataService } from 'app/common/localStorage.service';
import { EventService } from 'app/service/event.service';
import { TaskService } from 'app/service/task.service';
import { AddEventComponent } from '../add-event/add-event.component';

@Component({
  selector: 'event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  displayedColumns: string[] = ['createdAt', 'title', 'description', 'date'];
  dataSource: any = [];

  @ViewChild(MatPaginator) paginator: MatPaginator; //----- paginnation
  @ViewChild(MatSort) sort: MatSort; //------ data sorting 

  constructor(private eventService: EventService, private dialog: MatDialog, private localStorageDataService: localStorageDataService) { }

  loginUser: any;
  ngOnInit(): void {
    this.loginUser = this.localStorageDataService.decrypt(localStorage.getItem('loginUser'));
    this.getEvent();

  }


  addNew() {
    const dialogRef = this.dialog.open(AddEventComponent, { disableClose: true });
    dialogRef.afterClosed().subscribe(result => {
      if (result == 'btnTrue') {
        this.getEvent();
      }
    });
  }

  eventList: any = [];
  getEvent() {
    this.eventService.getById(this.loginUser?.data._id).then((obj: any) => {
      this.eventList = obj && obj;
      this.dataSource = new MatTableDataSource(obj && obj);
      //  console.log("task list:)", obj, this.eventList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, error => {
      //console.log("erro:)", error)
    })
  }


}
