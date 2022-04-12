import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { localStorageDataService } from 'app/common/localStorage.service';
import { MessageService } from 'app/common/messageservice.service';
import { QueryService } from 'app/service/query.service';
import { CreateComponent } from '../create/create.component';
import { PopupComponent } from '../popup/popup.component';

@Component({
  selector: 'list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(private dialog: MatDialog,private localStorageDataService:localStorageDataService, private queryService: QueryService, private messageService: MessageService) { }
  displayedColumns: string[] = ['createdAt', 'query','queryType', 'action'];
  dataSource: any = [];
  @ViewChild(MatPaginator) paginator: MatPaginator; //----- paginnation
  @ViewChild(MatSort) sort: MatSort; //------ data sorting 

  loginUSer: any;
  ngOnInit(): void {
    this.loginUSer = this.localStorageDataService.decrypt(localStorage.getItem('loginUser'));
    this.loginUSer = this.loginUSer.data;
    // console.log(" this.loginUSer", this.loginUSer);
    this.getByUserId();
  }

  addNew() {
    const dialogRef = this.dialog.open(CreateComponent, { disableClose: true });
    dialogRef.afterClosed().subscribe(result => {
      if (result == 'btnTrue') {
        this.getByUserId();
      }
    });
  }

  popup(id) {
    const dialogRef = this.dialog.open(PopupComponent, { disableClose: true, data: id });
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

  getByUserId() {
    this.queryService.getByUserId(this.loginUSer._id).then((obj: any) => {
      // console.log("get by id", obj);
      this.dataSource = new MatTableDataSource(obj);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, error => {
      this.messageService.messageService(error.error.message);
    })
  }
}
