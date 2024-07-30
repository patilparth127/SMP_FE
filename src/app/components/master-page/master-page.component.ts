import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AppComponent } from '../../app.component';
import { RouterLink } from '@angular/router';



@Component({
    selector: 'app-master-page',
    standalone: true,
    templateUrl: './master-page.component.html',
    styleUrl: './master-page.component.css',
    imports: [CommonModule, AppComponent, RouterLink]
})
export class MasterPageComponent {

}
