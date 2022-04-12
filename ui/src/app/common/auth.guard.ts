import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { localStorageDataService } from './localStorage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  val: any;
  constructor(private router: Router, private localStorageDataService: localStorageDataService) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    //console.log("canActivate work val:", localStorage.getItem('loginUser'))
    // const val = localStorage.getItem('loginUser') != null ? localStorage.getItem('loginUser') : 'hello'
    if (localStorage.getItem('loginUser') != null) {
      const data = this.localStorageDataService.decrypt(localStorage.getItem('loginUser'))
    //  console.log("auth guard value", data);
      if (data && data?.data?._id) {
        //console.log("auth guard true:)");
        return true;
      }
      else {
        //console.log("auth guard false");
        this.router.navigate(['./login']);
        return false;
      }
    }
    else {
      this.router.navigate(['./login']);
    }
  }


}
