import { Injectable } from '@angular/core';
import { HttpService } from 'app/common/http.service';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpService) { }

  save(data) {
    //console.log("service: event::) save", data);
    return this.http.post('event', data);
  }

  getAll() {
    //console.log("service: event::) get all");
    return this.http.get('event');
  }

  getById(id) {
    //console.log("service: event::) get by id", id);
    return this.http.get('event/findById/' + id);
  }

  findAllbyType(data) {
    return this.http.post('event/findAllbyType', data)
  }

  delete(id) {
    //console.log("service: event::) delete", id);
    return this.http.delete('event/:_id' + id);
  }
}
