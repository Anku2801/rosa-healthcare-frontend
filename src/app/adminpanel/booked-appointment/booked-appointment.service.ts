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

  changeBookingStatus(data) {
    return this.apiService.postData('RSUpdateStatus', data);
  }
}
