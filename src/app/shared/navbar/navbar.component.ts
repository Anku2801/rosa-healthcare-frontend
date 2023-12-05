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
        if(currentUrl.charAt(0) === '/'){
            currentUrl = currentUrl.slice( 1 );
        } else {
            currentUrl = 'Dashboard';
        }
        if(currentUrl == "add-dc" || currentUrl == 'search-dc' || currentUrl == 'update-dc') {
            var array = currentUrl.split('-');
            let updateStr1 = array[0].charAt(0).toUpperCase() + array[0].slice(1);
            let updateStr2 = array[1].toUpperCase();
            currentUrl = updateStr1 + ' ' + updateStr2;
        } else if(currentUrl == "dc-efficiency") {
            var array = currentUrl.split('-');
            let updateStr1 = array[0].toUpperCase();
            let updateStr2 = array[1].charAt(0).toUpperCase() + array[1].slice(1);
            currentUrl = updateStr1 + ' ' + updateStr2;
        } else {
            currentUrl = currentUrl.replace(/\b\w/g, first => first.toLocaleUpperCase());
        }
        return currentUrl.replace(/-/g, " ");
    }

    // Logout current User
    logout() {
        this.loginService.logout();
    }
}
