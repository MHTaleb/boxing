import { Component, OnInit } from '@angular/core';
import { BoxerPrintService } from '../boxer-print.service';
import { IBoxer } from 'app/shared/model/boxer.model';

@Component({
  selector: 'jhi-print-boxeur-card',
  templateUrl: './print-boxeur-card.component.html',
  styles: []
})
export class PrintBoxeurCardComponent implements OnInit {
  boxer: IBoxer;
  categorie: any = 'senior';

  constructor(protected printService: BoxerPrintService) {}

  ngOnInit() {
    this.boxer = this.printService.data;
  }
}
