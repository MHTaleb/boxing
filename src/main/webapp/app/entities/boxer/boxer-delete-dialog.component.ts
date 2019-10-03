import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IBoxer } from 'app/shared/model/boxer.model';
import { BoxerService } from './boxer.service';

@Component({
  selector: 'jhi-boxer-delete-dialog',
  templateUrl: './boxer-delete-dialog.component.html'
})
export class BoxerDeleteDialogComponent {
  boxer: IBoxer;

  constructor(protected boxerService: BoxerService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.boxerService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'boxerListModification',
        content: 'Deleted an boxer'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-boxer-delete-popup',
  template: ''
})
export class BoxerDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ boxer }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(BoxerDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.boxer = boxer;
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
