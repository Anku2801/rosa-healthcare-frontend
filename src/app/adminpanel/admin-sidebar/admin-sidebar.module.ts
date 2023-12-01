import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminSidebarComponent } from './admin-sidebar.component';

@NgModule({
    imports: [ RouterModule, CommonModule ],
    declarations: [ AdminSidebarComponent ],
    exports: [ AdminSidebarComponent ]
})

export class AdminSidebarModule {}
