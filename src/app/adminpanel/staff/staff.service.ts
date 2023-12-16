import { Injectable } from '@angular/core';
import { ApiService } from 'app/commonconfig/service/api.service';

@Injectable({
  providedIn: 'root'
})

export class StaffService {

  constructor(private apiService: ApiService) { }

  // Get All Staff
  getAllStaffList(data) {
    return this.apiService.postData('RSGetAdmin', data);
  }
  
  // Add a add User
  addUser(data) {
    return this.apiService.postData('RSAdminAdd', data);
  }

  // Update a existing Employee
  updateEmployee(data) {
    return this.apiService.postData('pmm2019', data);
  }
}
