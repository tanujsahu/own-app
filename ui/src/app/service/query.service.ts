import { Injectable } from '@angular/core';
import { HttpService } from 'app/common/http.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QueryService {

  constructor(private http: HttpService) { }

  change$ = new BehaviorSubject<boolean>(false)

  save(data) {
    return this.http.post('query', data)
  }

  getAll() {
    return this.http.get('query');
  }

  getByUserId(id) {
    return this.http.get('query/getByUserId/' + id)
  }

  getById(id) {
    return this.http.get('query/getById/' + id)
  }

  delete(id) {
    return this.http.delete('query/:_id' + id);
  }
  
}
