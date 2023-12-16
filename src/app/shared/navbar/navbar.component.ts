import { Component, OnInit, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { constantsProps } from 'app/commonconfig/props/constants.props';
import { LoginService } from 'app/login/login.service';

@Component({
    // moduleId: module.id,
    selector: 'navbar-cmp',
    templateUrl: 'navbar.component.html'
})

export class NavbarComponent implements OnInit{
    location: Location;
    private toggleButton: any;
    private sidebarVisible: boolean;
    props = constantsProps;

    constructor(location: Location,  
                private element: ElementRef, 
                private router: Router,
                private loginService: LoginService) {
                    this.location = location;
                    this.sidebarVisible = false;
    }

    ngOnInit(){
      const navbar: HTMLElement = this.element.nativeElement;
      this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
    }
    sidebarOpen() {
        const toggleButton = this.toggleButton;
        const body = document.getElementsByTagName('body')[0];
        setTimeout(function(){
            toggleButton.classList.add('toggled');
        }, 500);
        body.classList.add('nav-open');

        this.sidebarVisible = true;
    };
    sidebarClose() {
        const body = document.getElementsByTagName('body')[0];
        this.toggleButton.classList.remove('toggled');
        this.sidebarVisible = false;
        body.classList.remove('nav-open');
    };
    sidebarToggle() {
        // const toggleButton = this.toggleButton;
        // const body = document.getElementsByTagName('body')[0];
        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
    };

    // Get Current Page Name
    getTitle() {
        var currentUrl = this.router.url;
        var array = currentUrl.split('/');
        let updateStr2 = array[2].charAt(0).toUpperCase() + array[2].slice(1);
        var newUrlData = updateStr2.split('-');
        if (newUrlData && newUrlData.length > 1) {
            let secondWord = newUrlData[1].charAt(0).toUpperCase() + newUrlData[1].slice(1);
            currentUrl = newUrlData[0] + ' ' + secondWord;
        } else {
            currentUrl = updateStr2;
        }
        return currentUrl.replace(/-/g, " ");
    }

    // Logout current User
    logout() {
        this.loginService.logout();
    }
}
