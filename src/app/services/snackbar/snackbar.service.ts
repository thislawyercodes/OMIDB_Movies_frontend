import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

interface SNACKBAR_TYPE { Danger: string, Warn: string, Success: string }

export const SNACKBAR_TYPES: SNACKBAR_TYPE = { Danger: "danger", Success: "success", Warn: "warn" }

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackbar: MatSnackBar) { }

  openSnackBar(message: string, action = '', duration = 5, type = 'danger') {
    let _class

    switch (type) {
      case 'danger':
        _class = 'red-snackbar'
        break
      case 'success':
        _class = 'green-snackbar'
        break
      case 'warn':
        _class = 'amber-snackbar'
        break
      default:
        _class = 'default-snackbar'
        break
    }

    return this.snackbar.open(message, action, {
      duration: duration * 1000,
      panelClass: ['my-snackbar', _class]
    });
  }
}
