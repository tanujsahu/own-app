import { Injectable } from '@angular/core';
import { HttpService } from 'app/common/http.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpService) { }

  register(data) {
    //console.log("serv:- save ")
    return this.http.post('user', data);
  }

  getAll() {
    //console.log("serv:- getAll ")
    return this.http.get('user');
  }

  getById(id) {
    //console.log("serv:- getbyId ", id);
    return this.http.post('user/findById', id);
  }

  login(data: any) {
    //console.log("serv:- login ", data)
    return this.http.post('user/login', data);
  }

  delete(id: any) {
    //console.log("serv:- delete ", id)
    return this.http.delete('user/:_id' + id);
  }

  checkId(id: any) {
    //console.log("serv:- delete ", id)
    return this.http.get('user/checkId/' + id);
  }

  //------------------------------------------------ verify
  verify(data: any) {
    //console.log("serv verify user email:)", data)
    return this.http.post('user/verify', data);
  }

  //------------------------------------------------ Forgot password send otp
  forgot(data: any) {
    return this.http.post('user/forgot', data);
  }
}
