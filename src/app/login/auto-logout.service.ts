import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';

const MINUTES_UNTIL_AUTO_LOGOUT = 60;
const CHECK_INTERVAL = 1000;
const STORE_KEY = 'lastAction';

@Injectable({
  providedIn: 'root'
})

export class AutoLogoutService implements OnInit {

  intervalObj: any;

  constructor(private router: Router) { 
    this.initListener();
  }

  ngOnInit(): void {
  }

  public getLastAction() {
    // return parseInt(localStorage.getItem(STORE_KEY));
  }

  public setLastAction(value: any) {
    localStorage.setItem(STORE_KEY, value);
  }

  initListener() {
    document.body.addEventListener('click', () => this.reset());
    document.body.addEventListener('mouseover', () => this.reset());
    document.body.addEventListener('mouseout', () => this.reset());
    document.body.addEventListener('keydown', () => this.reset());
    document.body.addEventListener('keyup', () => this.reset());
    document.body.addEventListener('keypress', () => this.reset());
  }

  reset() {
    this.setLastAction(Date.now());
  }

  public initInterval() {
    this.intervalObj = setInterval(() => {
      this.check();
    }, CHECK_INTERVAL);
  }

  check() {
    // const now = Date.now();
    // const timeleft = this.getLastAction() + MINUTES_UNTIL_AUTO_LOGOUT * 60 * 1000;
    // const diff = timeleft - now;
    // const isTimeout = diff < 0;
    // if(isTimeout && null != localStorage.getItem("currentUser")) {
    //   this.router.navigate(['logout']);
    //   setTimeout(() => {
    //     localStorage.setItem('currentUser', null);
    //     localStorage.removeItem('currentUser');
    //     clearInterval(this.intervalObj);
    //     localStorage.clear();
    //   }, 150)
    // }
  }
  
  ngOnDestroy() {
    if (this.intervalObj) {
      clearInterval(this.intervalObj);
    }
  }
}
