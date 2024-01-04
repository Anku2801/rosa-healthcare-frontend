import { Injectable } from '@angular/core';
import { ApiService } from 'app/commonconfig/service/api.service';

@Injectable({
  providedIn: 'root'
})

export class SettingService {

  constructor(private apiService: ApiService) { }

  changeUserData(data) {
    return this.apiService.postData('RSUpdateUser', data);
  }
  
  // Add a New Employee
  changePassword(data) {
    return this.apiService.postData('RSUpdatePassword', data);
  }

  //Get Dahboard data
  getBookings() {
    return this.apiService.postData('RSgetDashBoardData', '');
  }

  getDoctorDashboardData(data) {
    return this.apiService.postData('RSgetDoctorDashBoardData', data);
  }

  getPatientDashboardData(data) {
    return this.apiService.postData('RSPatientDashBoard', data);
  }

  updateAvailableStatus(data) {
    return this.apiService.postData('RSUpdateTime', data);
  }
}
