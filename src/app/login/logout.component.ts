import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',   
  templateUrl: "./logout.component.html"
})

export class LogoutComponent implements OnInit {
    
    constructor(private router: Router) { }

    ngOnInit() {
      // let currentUser = JSON.parse(localStorage.getItem("currentUser"));
      // if (currentUser == null) {
      //   this.router.navigate(['/login']);
      // }
    }
}
