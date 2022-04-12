import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { localStorageDataService } from 'app/common/localStorage.service';
import { TaskService } from 'app/service/task.service';
import { AddNewComponent } from '../add-new/add-new.component';

export interface PeriodicElement {
  name: string; position: number;
  weight: number; symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

@Component({
  selector: 'task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})

export class TaskComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['createdAt', 'title', 'description', 'date', 'duration'];
  dataSource: any = [];
  @ViewChild(MatPaginator) paginator: MatPaginator; //----- paginnation
  @ViewChild(MatSort) sort: MatSort; //------ data sorting 

  constructor(private dialog: MatDialog, private taskService: TaskService, private localStorageDataService: localStorageDataService) {
  }

  loginUser: any;
  ngOnInit(): void {
    this.loginUser = this.localStorageDataService.decrypt(localStorage.getItem('loginUser'));
    // console.log("LoginUSer:::)", this.loginUser);
    this.getTask();

  }

  addNew() {
    const dialogRef = this.dialog.open(AddNewComponent, { disableClose: true });
    dialogRef.afterClosed().subscribe(result => {
      if (result == 'btnTrue') {
        this.getTask();
      }
    });
  }

  taskList: any;
  getTask() {
    this.taskService.getById(this.loginUser?.data._id).then((obj: any) => {
      this.taskList = obj;
      this.dataSource = new MatTableDataSource(obj);
      //  console.log("task list:)", obj, this.taskList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, error => {
      //console.log("erro:)", error)
    })
  }

  ngAfterViewInit() {
    // setTimeout(() => {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
    // }, 1000)

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  pageChanged(val) {
  //  console.log("page number:", val)
  }
}
