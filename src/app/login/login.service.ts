import { Injectable } from '@angular/core';
import { ApiService } from '../commonconfig/service/api.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  constructor(private apiService: ApiService, private router: Router) { }

  // Login Method to Validate User
  validateLogin(data: any) {
    return this.apiService.postData("RSLogin", data);
  }

  // Logout the current user
  logout() {
    localStorage.setItem('currentUser', null);
    localStorage.removeItem('currentUser');
    localStorage.clear();
    this.router.navigate(['login']);
  }
}
