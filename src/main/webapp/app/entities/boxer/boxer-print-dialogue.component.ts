import { Component, OnInit, OnDestroy } from '@angular/core';
import { IBoxer } from 'app/shared/model/boxer.model';
import { BoxerService } from './boxer.service';
import { NgbActiveModal, NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import printJS from 'print-js/src/index';
import { BoxerPrintService } from './boxer-print.service';

@Component({
  selector: 'jhi-boxer-print-dialogue',
  templateUrl: './boxer-print-dialogue.component.html',
  styles: []
})
export class BoxerPrintDialogueComponent implements OnInit {
  boxers: IBoxer[];
  total: Number;
  curDate = new Date();

  current: string;
  all: string;
  card: string;
  constructor(
    protected boxerService: BoxerService,
    protected printService: BoxerPrintService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  printReport() {
    printJS({
      printable: 'print-content',
      type: 'html',
      honorColor: true,
      targetStyles: ['*'],
      repeatTableHeader: true
    });
    this.activeModal.dismiss(true);
  }

  ngOnInit() {
    this.current = this.printService.peek();
    this.all = this.printService.PRINT_ALL;
    this.card = this.printService.PRINT_CARD;
  }
}

@Component({
  selector: 'jhi-boxer-print-popup',
  template: ''
})
export class BoxerPrintPopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(
    protected boxerService: BoxerService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected modalService: NgbModal,
    protected jhiAlertService: JhiAlertService
  ) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ boxers }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(BoxerPrintDialogueComponent as Component, { size: 'lg', backdrop: 'static' });

        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/boxer', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/boxer', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
