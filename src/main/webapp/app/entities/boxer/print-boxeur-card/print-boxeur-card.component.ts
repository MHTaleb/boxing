import { Component, OnInit } from '@angular/core';
import { BoxerPrintService } from '../boxer-print.service';
import { IBoxer } from 'app/shared/model/boxer.model';
import { JhiLanguageService } from 'ng-jhipster';
import { MAN_PICTURE_PATH } from 'app/shared/constants/input.constants';
@Component({
  selector: 'jhi-print-boxeur-card',
  templateUrl: './print-boxeur-card.component.html',
  styles: []
})
export class PrintBoxeurCardComponent implements OnInit {
  boxer: IBoxer;
  categorie: any = 'senior';
  isAr = false;
  man = MAN_PICTURE_PATH;
  constructor(protected printService: BoxerPrintService, protected languageService: JhiLanguageService) {}

  ngOnInit() {
    this.boxer = this.printService.data;
    this.isAr = this.languageService.currentLang === 'ar-ly';
  }
}
