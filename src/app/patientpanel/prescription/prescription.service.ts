import { Injectable } from '@angular/core';
import { ApiService } from 'app/commonconfig/service/api.service';

@Injectable({
  providedIn: 'root'
})

export class PrescriptionService {

  constructor(private apiService: ApiService) { }

  // Get All Patients
  getAllPatientsList(data) {
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
