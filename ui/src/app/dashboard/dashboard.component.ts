import { DatePipe } from '@angular/common';
import { Component, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { localStorageDataService } from 'app/common/localStorage.service';
import { MessageService } from 'app/common/messageservice.service';
import { AnswerComponent } from 'app/query/answer/answer.component';
import { PopupComponent } from 'app/query/popup/popup.component';
import { EventService } from 'app/service/event.service';
import { QueryService } from 'app/service/query.service';
import { TaskService } from 'app/service/task.service';
import * as Chartist from 'chartist';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnChanges {

  ngOnChanges(changes: SimpleChanges): void {
    //console.log("ng on changes:::", changes)
    this.getAllQuery();
  }


  constructor(private taskService: TaskService, private localStorageDataService: localStorageDataService, private dialog: MatDialog, private messageService: MessageService, private queryService: QueryService, private eventService: EventService, private datePipe: DatePipe) {
    // this.localStorageData.encrypt('hello world');
    // this.localStorageData.decrypt()

    this.queryService.change$.subscribe(obj => {
      //console.log("dashboard constricture:)", obj)
      if (obj) {
        this.getAllQuery();
      }
      // this.queryService.change$.next(false);
    })
  }

  displayedColumns: string[] = ['createdAt', 'name', 'query', 'queryType', 'action'];
  dataSource: any;

  @ViewChild('paginator', { static: true }) paginator: MatPaginator;
  @ViewChild('sort', { static: true }) sort: MatSort;



  startAnimationForLineChart(chart) {
    let seq: any, delays: any, durations: any;
    seq = 0;
    delays = 80;
    durations = 500;

    chart.on('draw', function (data) {
      if (data.type === 'line' || data.type === 'area') {
        data.element.animate({
          d: {
            begin: 600,
            dur: 700,
            from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
            to: data.path.clone().stringify(),
            easing: Chartist.Svg.Easing.easeOutQuint
          }
        });
      } else if (data.type === 'point') {
        seq++;
        data.element.animate({
          opacity: {
            begin: seq * delays,
            dur: durations,
            from: 0,
            to: 1,
            easing: 'ease'
          }
        });
      }
    });

    seq = 0;
  };
  startAnimationForBarChart(chart) {
    let seq2: any, delays2: any, durations2: any;

    seq2 = 0;
    delays2 = 80;
    durations2 = 500;
    chart.on('draw', function (data) {
      if (data.type === 'bar') {
        seq2++;
        data.element.animate({
          opacity: {
            begin: seq2 * delays2,
            dur: durations2,
            from: 0,
            to: 1,
            easing: 'ease'
          }
        });
      }
    });

    seq2 = 0;
  };


  loginUser: any;
  ngOnInit(): void {
   //console.log("dashboard", localStorage.getItem('loginUser'))
    this.loginUser = this.localStorageDataService.decrypt(localStorage.getItem('loginUser') || '');
    this.totalTaskById();
    this.todayTotalTaskById();
    this.getTask();
    this.getAllQuery();
    /* ----------==========     Daily Sales Chart initialization For Documentation    ==========---------- */
  }

  logout() {
    localStorage.removeItem('loginUser');
  }

  totalTask: any = 0;
  totalTaskById() {
    this.taskService.taskById(this.loginUser?.data._id).then((obj: any) => {
      this.totalTask = obj?.total;
      // //console.log("objjj", obj)
    })
  }

  todayTotalTask: any = 0;
  todayTotalTaskById() {
    this.taskService.todayTaskById(this.loginUser?.data._id).then((obj: any) => {
      this.todayTotalTask = obj?.total;
      // //console.log("objjj", obj)
    })
  }

  taskList: any = [];
  getTask() {
    // this.taskService.getById(this.loginUser?.data._id).then((obj: any) => {
    //   this.taskList = obj && obj;
    //   this.dataSource = new MatTableDataSource(obj && obj);
    //   //  //console.log("task list:)", obj, this.taskList);
    //   this.dataSource.paginator = this.paginator;
    //   this.dataSource.sort = this.sort;
    // }, error => {
    //   ////console.log("erro:)", error)
    // })
  }

  getAllQuery() {
    this.queryService.getAll().then((obj: any) => {
      ////console.log("get by id", obj);
      this.dataSource = new MatTableDataSource(obj);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, error => {
      this.messageService.messageService(error.error.message);
    })
  }

  pageChanged(val) {
    console.log("Page number::)", val)
  }

  popup(id) {
    const dialogRef = this.dialog.open(PopupComponent, { disableClose: true, data: id });
    dialogRef.afterClosed().subscribe(result => {
      if (result == 'btnTrue') {
      }
    });
  }

  answer(id) {
    const dialogRef = this.dialog.open(AnswerComponent, { disableClose: true, data: id });
    dialogRef.afterClosed().subscribe(result => {
      if (result == 'btnTrue') {
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }



}
