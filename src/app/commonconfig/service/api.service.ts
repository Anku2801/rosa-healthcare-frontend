import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { constantsProps } from '../props/constants.props';
import { NotificationmsgService } from '../service/notificationmsg.service';
import { catchError } from 'rxjs/operators';
import { EMPTY, of, throwError } from 'rxjs';

// Get Url
const API_URL = environment.apiUrl;
 
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT PATCH, DELETE',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Origin': API_URL
  }) 
}

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  props = constantsProps;
  constructor(private httpClient: HttpClient, private notifyService: NotificationmsgService) { }

  // Post Method
  public postData(url = '', data = '') {
    return this.httpClient.post(API_URL + url, data, httpOptions)
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

  public postImageData(url = '', data = '') {
    // const imgHttpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'multipart/form-data',
    //     'Access-Control-Allow-Methods': '*',
    //     'Access-Control-Allow-Origin': '*',
    //     'Access-Control-Allow-Headers': '*',
    //     'Access-Control-Allow-Credentials': 'true'
    //   }) 
    // }

    // const imgHttpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'multipart/form-data',
    //     'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT PATCH, DELETE',
    //     'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
    //     'Access-Control-Allow-Credentials': 'true',
    //     'Access-Control-Allow-Origin': API_URL
    //   }) 
    // }

    // const imgHttpOptions = {
    //   headers: new HttpHeaders({
    //     // 'Content-Type': 'multipart/form-data;boundary=------WebKitFormBoundaryaUC0VdtTaHH6OyxG',
    //     // ' Content-Disposition': 'form-data',
    //     // 'Access-Control-Allow-Origin': API_URL
    //   }) 
    // }

     //   const headers = new HttpHeaders({
  //     'Access-Control-Allow-Origin': API_URL, // Replace with your Angular frontend URL
  //     'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
  //     'Access-Control-Allow-Headers': 'Content-Type'
  //   });
    const imgHttpOptions = {
      headers: new HttpHeaders({
        // 'Content-Type': 'multipart/form-data',
        'Access-Control-Allow-Origin': API_URL
      }) 
    }
    return this.httpClient.post(API_URL + url, data, imgHttpOptions)
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

  // public sendimage(url,data){
  //   return this.httpClient.post('https://rosahealthimg-rosahealthcare.apps.openhack.pvcz.p1.openshiftapps.com/' + url, data);
  // }

  public addImageData(url = '', data = '') {
    const imgHttpOptions = {
      headers: new HttpHeaders({
        // 'Content-Type': 'multipart/form-data',
        'Access-Control-Allow-Origin': API_URL
      }) 
    }
    
    return this.httpClient.post(API_URL + url, data, imgHttpOptions)
    .pipe(catchError((error: HttpErrorResponse) => {
      const status = error.status;
      console.log('===status====');
      console.log(status);
      return of([]);
    }));
  }

  // public addImage(data) {
  //   const headers = new HttpHeaders({
  //     'Access-Control-Allow-Origin': API_URL, // Replace with your Angular frontend URL
  //     'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
  //     'Access-Control-Allow-Headers': 'Content-Type'
  //   });

  //   return this.httpClient.post(API_URL + '/RDIimageUpload', data, {
  //     headers: headers,
  //     responseType: 'json'
  //   });
  // }
}
