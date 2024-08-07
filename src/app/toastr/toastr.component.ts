import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr/toastr/toastr.service';

@Component({
  selector: 'app-toastr',
  standalone: true,
  imports: [],
  templateUrl: './toastr.component.html',
  styleUrl: './toastr.component.css'
})
export class ToastrComponent {
  constructor(private toastr: ToastrService) { }

    showSuccess() {
        this.toastr.success('Success message', 'Success');
    }

    showError() {
        this.toastr.error('Error message', 'Error');
    }
}
