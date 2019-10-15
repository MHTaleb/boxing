import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BoxerPrintService {
  public PRINT_ALL = 'print_all';
  public PRINT_CARD = 'print_card';
  public NO_OPERATION = '';

  data: any;

  private currentPrint: string;

  constructor() {
    this.currentPrint = '';
  }

  setOperation(operation: string | any) {
    if (this.currentPrint.trim.length === 0) {
      this.currentPrint = operation;
    } else {
      setTimeout(() => {
        this.setOperation(operation);
      }, 500);
    }
  }

  peek(): string {
    return this.currentPrint;
  }

  free() {
    this.currentPrint = this.NO_OPERATION;
  }
}
