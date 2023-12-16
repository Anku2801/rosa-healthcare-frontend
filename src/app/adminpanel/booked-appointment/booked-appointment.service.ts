import { Injectable } from '@angular/core';
import { ApiService } from 'app/commonconfig/service/api.service';

@Injectable({
  providedIn: 'root'
})

export class BookedAppointmentService {

  constructor(private apiService: ApiService) { }

  // Get all booking Details Based
  getBookingDetails(data) {
    return this.apiService.postData('RSGetBooking', data);
  }
  
  // Add a New Booking
  addBooking(data) {
    return this.apiService.postData('RSBooking', data);
  }

  // Update a existing Employee
  // updateEmployee(data) {
  //   return this.apiService.postData('pmm2019', data);
  // }
}
