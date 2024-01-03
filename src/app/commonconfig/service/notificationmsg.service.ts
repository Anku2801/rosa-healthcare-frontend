import { Injectable } from '@angular/core';

declare var $:any;

@Injectable({
  providedIn: 'root'
})

export class NotificationmsgService {

  constructor() { }

  // Show Success
  showSuccess(msg='', from='', align='') {
    if (from == '') {
      from = 'top';
    }
    if (align == '') {
      align = 'right';
    }
    $.notify({
        icon: "pe-7s-check",
        message: msg
    },{
        type: 'success',
        timer: 1000,
        placement: {
            from: from,
            align: align
        }
    });
  }

  // Show Error
  showError(msg = '', from = '', align = '') {
    if (from == '') {
      from = 'top';
    }
    if (align == '') {
      align = 'right';
    }
    $.notify({
        icon: "pe-7s-info",
        message: msg
    },{
        type: 'danger',
        timer: 1000,
        placement: {
            from: from,
            align: align
        }
    });
  }
}
