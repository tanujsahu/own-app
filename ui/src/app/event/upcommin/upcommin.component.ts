import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { localStorageDataService } from 'app/common/localStorage.service';
import { EventService } from 'app/service/event.service';

@Component({
  selector: 'upcommin',
  templateUrl: './upcommin.component.html',
  styleUrls: ['./upcommin.component.css']
})
export class UpcomminComponent implements OnInit {

  displayedColumns: string[] =  ['date', 'name', 'title', 'description']
  dataSource: any = [];

  @ViewChild(MatPaginator) paginator: MatPaginator; //----- paginnation
  @ViewChild(MatSort) sort: MatSort; //------ data sorting 

  constructor(private eventService: EventService, private dialog: MatDialog, private localStorageDataService: localStorageDataService) { }

  loginUser: any;
  ngOnInit(): void {
    this.loginUser = this.localStorageDataService.decrypt(localStorage.getItem('loginUser'));
    this.getEvent();

  }


  eventList: any = [];
  getEvent() {
    this.eventService.findAllbyType({ eventType: 'public' }).then((obj: any) => {
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
