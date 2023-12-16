import { Injectable } from '@angular/core';
import { ApiService } from 'app/commonconfig/service/api.service';

@Injectable({
  providedIn: 'root'
})

export class SettingService {

  constructor(private apiService: ApiService) { }

  changeUserData(data) {
    return this.apiService.postData('pmm2012', data);
  }
  
  // Add a New Employee
  changePassword(data) {
    return this.apiService.postData('pmm2016', data);
  }

  // Update a existing Employee
  updateEmployee(data) {
    return this.apiService.postData('pmm2019', data);
  }
}
