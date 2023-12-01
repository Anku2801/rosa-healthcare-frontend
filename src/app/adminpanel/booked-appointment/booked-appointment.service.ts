import { Injectable } from '@angular/core';
import { ApiService } from 'app/commonconfig/service/api.service';

@Injectable({
  providedIn: 'root'
})

export class BookedAppointmentService {

  constructor(private apiService: ApiService) { }

  // Get Employee Details Based on the ID
  getEmpDetails(data) {
    return this.apiService.postData('pmm2012', data);
  }
  
  // Add a New Employee
  addEmployee(data) {
    return this.apiService.postData('pmm2016', data);
  }

  // Update a existing Employee
  updateEmployee(data) {
    return this.apiService.postData('pmm2019', data);
  }
}
