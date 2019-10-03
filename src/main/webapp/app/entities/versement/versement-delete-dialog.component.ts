import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IVersement } from 'app/shared/model/versement.model';
import { VersementService } from './versement.service';

@Component({
  selector: 'jhi-versement-delete-dialog',
  templateUrl: './versement-delete-dialog.component.html'
})
export class VersementDeleteDialogComponent {
  versement: IVersement;

  constructor(protected versementService: VersementService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.versementService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'versementListModification',
        content: 'Deleted an versement'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-versement-delete-popup',
  template: ''
})
export class VersementDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ versement }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(VersementDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.versement = versement;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/versement', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/versement', { outlets: { popup: null } }]);
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
