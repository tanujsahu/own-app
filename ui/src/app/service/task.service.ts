import { Injectable } from '@angular/core';
import { HttpService } from 'app/common/http.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpService) { }

  save(data) {
    //console.log("service: Task::) save", data);
    return this.http.post('task', data);
  }

  getAll() {
    //console.log("service: Task::) get all");
    return this.http.get('task');
  }

  getById(id) {
    //console.log("service: Task::) get by id", id);
    return this.http.get('task/findById/' + id);
  }

  taskById(id) {
    return this.http.get('task/totalTaskById/' + id)
  }

  todayTaskById(id) {
    return this.http.get('task/todayTotalTaskById/' + id)
  }

  delete(id) {
    //console.log("service: Task::) delete", id);
    return this.http.delete('task/:_id' + id);
  }
}
