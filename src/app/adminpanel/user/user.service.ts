import { Injectable } from '@angular/core';
import { ApiService } from 'app/commonconfig/service/api.service';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private apiService: ApiService) { }

  // Get All Patients
  getAllPatientsList(data) {
    return this.apiService.postData('RSGetPatient', data);
  }
  
  // Add a New Employee
  addPatient(data) {
    return this.apiService.postData('RSAddPatient', data);
  }

  // Get all patient Predictions
  getAllPrescriptionsList(data) {
    return this.apiService.postData('RSGetPrescriptionById', data);
  }

  // Get Patient Details
  getPatientDetails(data) {
    return this.apiService.postData('RSGetPatientById', data);
  }

  // Get Patient Details
  getUserDetails(data) {
    return this.apiService.postData('RSGetUserById', data);
  }

  // Add precription data
  addPrescriptions(data) {
    return this.apiService.postData('RSAddPrescription', data);
  }

  // Get all patient Predictions
  getUserPrescriptionsList(data) {
    return this.apiService.postData('RSGetPrescription', data);
  }
}
