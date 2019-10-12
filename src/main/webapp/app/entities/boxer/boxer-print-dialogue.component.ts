import { Component, OnInit, OnDestroy } from '@angular/core';
import { IBoxer } from 'app/shared/model/boxer.model';
import { BoxerService } from './boxer.service';
import { NgbActiveModal, NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'jhi-boxer-print-dialogue',
  templateUrl: './boxer-print-dialogue.component.html',
  styles: []
})
export class BoxerPrintDialogueComponent implements OnInit {
  boxers: IBoxer[];

  constructor(protected boxerService: BoxerService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  print() {
    alert(document.getElementById('print-content').innerHTML);

    this.eventManager.broadcast({
      name: 'boxerListModification',
      content: 'Deleted an boxer'
    });
    this.activeModal.dismiss(true);
  }

  ngOnInit() {}
}

@Component({
  selector: 'jhi-boxer-print-popup',
  template: ''
})
export class BoxerPrintPopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ boxers }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(BoxerPrintPopupComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.boxers = boxers;
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
}
