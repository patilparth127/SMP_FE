import { Injectable } from '@angular/core';
import Swal from 'sweetalert2/dist/sweetalert2.js';
@Injectable({
  providedIn: 'root'
})
export class AlertService {

  // #region confirmBox
  /**
   * @description Alert Popup Service 
   * @param message string
   * @param icon success   warning   error
   * @returns 
   */

  confirmBox(title?: any, text?: any, icon?: any, showCancelButton?: boolean, confirmButtonText?: any, cancelButtonText?: any) {
    return Swal.fire({
      title: title,
      text: text,
      icon: icon || 'warning',
      showCancelButton: showCancelButton || true,
      confirmButtonText: confirmButtonText || 'Yes, delete it!',
      cancelButtonText: cancelButtonText || 'No, keep it'
    });
  }
 // #region showToast
  /**
   * @description Alert Popup Service 
   * @param message string
   * @param icon success   warning   error
   * @returns 
   */
  showToast(message: string, icon?: any) {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
    Toast.fire({
      icon: "success",
      title: message
    });

  }
}
