import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { constantsProps } from '../props/constants.props';
import { NotificationmsgService } from '../service/notificationmsg.service';
import { catchError } from 'rxjs/operators';
import { EMPTY, of, throwError } from 'rxjs';

// Get Url
const API_URL = environment.apiUrl;
 
let headers = new HttpHeaders()
 
headers = headers.set('content-type','application/json')
headers = headers.set('Access-Control-Allow-Origin', API_URL)
headers = headers.set('content-type','application/x-www-form-urlencoded')
headers = headers.set('Access-Control-Allow-Credentials','true')
headers = headers.set('Access-Control-Allow-Headers','GET, POST, OPTIONS, PUT PATCH, DELETE')
console.log(headers);

// let headers = new HttpHeaders() 
// headers = headers.append('content-type','application/json');
// headers = headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT PATCH, DELETE');
// headers = headers.append('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept');
// headers = headers.append('Access-Control-Allow-Credentials','true');
// headers = headers.append('Access-Control-Allow-Origin', API_URL);

// const httpOptions = {
//   headers: new HttpHeaders({
//     'Content-Type': 'application/json',
//     'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT PATCH, DELETE',
//     'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
//     'Access-Control-Allow-Credentials': 'true',
//     'Access-Control-Allow-Origin': API_URL
//   }) 
// }

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  props = constantsProps;
  constructor(private httpClient: HttpClient, private notifyService: NotificationmsgService) { }

  // Post Method
  public postData(url = '', data = '' , token = null) {
    if (token != null) {
      headers = headers.set('Authorization', 'Bearer ' +  token);
    }
    console.log('===headers====');
    console.log(headers);
    return this.httpClient.post(API_URL + url, data, { 'headers' : headers })
    .pipe(catchError((error: HttpErrorResponse) => {
      const status = error.status;
      switch(status) {
        case 0: 
              this.notifyService.showError(this.props.SERVER_CONNECTION_ERROR);
              break;
        case 404:
              this.notifyService.showError(this.props.NOT_FOUND);
              break;
        case 403:
              this.notifyService.showError(this.props.ACCESS_DENIED);
              break;;
        case 500:
              this.notifyService.showError(this.props.SERVER_CONNECTION_ERROR)
              break;
        default:
              this.notifyService.showError(this.props.UNKNOWN_ERROR);
      }
      return of([]);
    }));
  }
}
