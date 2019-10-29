import { Component, OnInit, OnDestroy } from '@angular/core';
import { IBoxer } from 'app/shared/model/boxer.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';
import { BoxerService } from '../boxer.service';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { BoxerPrintService } from '../boxer-print.service';
@Component({
  selector: 'jhi-print-boxeur-list',
  templateUrl: './print-boxeur-list.component.html',
  styles: []
})
export class PrintBoxeurListComponent implements OnInit, OnDestroy {
  boxers: IBoxer[] = [];
  nbr: any = 0;
  curDate: Date;
  constructor(
    public activeModal: NgbActiveModal,
    protected printService: BoxerPrintService,
    protected eventManager: JhiEventManager,
    protected boxerService: BoxerService,
    protected alertService: JhiAlertService
  ) {}

  ngOnInit() {
    this.curDate = new Date();
    this.boxerService
      .query(
        {
          value: this.boxerService.value,
          filter: this.boxerService.filter,
          page: 0,
          size: 5000
        },
        this.boxerService._searchURL
      )
      .subscribe(
        (res: HttpResponse<IBoxer[]>) => {
          this.boxers = res.body;
          this.nbr = this.boxers.length;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnDestroy() {
    this.printService.free();
  }

  trackId(index: number, item: IBoxer) {
    return item.id;
  }

  onError(message) {
    this.alertService.error(message);
  }
}
