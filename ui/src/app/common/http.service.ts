import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpErrorResponse, HttpParams, HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})

export class HttpService {
  private apiBaseUrl = environment.apiBaseUrl;
  constructor(private httpClient: HttpClient) { }

  get(path?: any, paramObj?: any) {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'generatenegenarltoken1233455667890@#$%' });
    var paramWithHeaders = { headers }
    if (paramObj) {
      let httpParams = new HttpParams();
      Object.keys(paramObj).map(param => {
        httpParams.append(param, paramObj[param]);
      });
     // paramWithHeaders["parmas"] = httpParams;
    }
    return this.httpClient.get(this.apiBaseUrl + path, paramWithHeaders).toPromise();
    // .pipe(catchError(this.handleError));
  }

  // getObservable(path: any, paramObj: any) {
  //   let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  //   var paramWithHeaders = { headers }
  //   if (paramObj) {
  //     let httpParams = new HttpParams();
  //     Object.keys(paramObj).map(param => {
  //       httpParams.append(param, paramObj[param]);
  //     });
  //     paramWithHeaders["parmas"] = httpParams;
  //   }
  //   return this.httpClient.get(this.apiBaseUrl + path, paramWithHeaders);
  //   // .pipe(catchError(this.handleError));
  // }

  post(path: any, body?: any) {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    // console.log("KKUH", this.apiBaseUrl + path, body, body)
    return this.httpClient.post(this.apiBaseUrl + path, body)
      // .pipe(catchError(this.handleError))
      .toPromise();
  }

  // put(path?: any, body?: any, paramObj?: any) {
  //   let headers = new HttpHeaders({
  //     'Content-Type': 'application/json'
  //   });
  //   var paramWithHeaders = { headers }
  //   if (paramObj) {
  //     let httpParams = new HttpParams();
  //     Object.keys(paramObj).map(param => {
  //       httpParams.append(param, paramObj[param]);
  //     });
  //     paramWithHeaders["parmas"] = httpParams;
  //   }
  //   return this.httpClient.put(this.apiBaseUrl + path, body, paramWithHeaders).toPromise();
  // }

  delete(path?: any, paramObj?: any) {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    var paramWithHeaders = { headers }
    if (paramObj) {
      let httpParams = new HttpParams();
      Object.keys(paramObj).map(param => {
        httpParams.append(param, paramObj[param]);
      });
     // paramWithHeaders["parmas"] = httpParams;
    }
    return this.httpClient.delete(this.apiBaseUrl + path, paramWithHeaders)
      // .pipe(catchError(this.handleError))
      .toPromise();
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      console.log("Client-side error", error);
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      console.log("Server-side errors", error);
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return errorMessage;
  }
}
