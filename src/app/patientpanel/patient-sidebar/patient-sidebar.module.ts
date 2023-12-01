import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PatientSidebarComponent } from './patient-sidebar.component';

@NgModule({
    imports: [ RouterModule, CommonModule ],
    declarations: [ PatientSidebarComponent ],
    exports: [ PatientSidebarComponent ]
})

export class PatientSidebarModule {}
