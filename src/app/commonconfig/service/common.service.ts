import { Injectable } from '@angular/core';
import { ApiService } from 'app/commonconfig/service/api.service';

@Injectable({
  providedIn: 'root'
})

export class CommonService {

  constructor(private apiService: ApiService) { }

  // Get Departments
  getDepartments(data) {
    return this.apiService.postData('RSGetDepartment', data);
  }

  // Get Active Doctors
  getActiveDoctors(data) {
    return this.apiService.postData('RSGetActiveDoctor', data);
  }
}
