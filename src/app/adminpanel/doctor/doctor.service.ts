import { Injectable } from '@angular/core';
import { ApiService } from 'app/commonconfig/service/api.service';

@Injectable({
  providedIn: 'root'
})

export class DoctorService {

  constructor(private apiService: ApiService) { }

  // Get Doctor Details Based on the ID
  getAllDoctors(data) {
    return this.apiService.postData('RSGetDoctor', data);
  }
  
  //Add Doctor Image
  addDoctorsImage(Imagedata) {
    return this.apiService.postImageData('RDIimageUpload', Imagedata);
  }
  
  // Add a New Doctor
  addDoctors(data) {
    return this.apiService.postData('RSDoctorAdd', data);
  }

  // Update a existing Employee
  updateEmployee(data) {
    return this.apiService.postData('pmm2019', data);
  }
}
