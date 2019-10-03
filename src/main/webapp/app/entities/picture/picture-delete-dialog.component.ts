import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPicture } from 'app/shared/model/picture.model';
import { PictureService } from './picture.service';

@Component({
  selector: 'jhi-picture-delete-dialog',
  templateUrl: './picture-delete-dialog.component.html'
})
export class PictureDeleteDialogComponent {
  picture: IPicture;

  constructor(protected pictureService: PictureService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.pictureService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'pictureListModification',
        content: 'Deleted an picture'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-picture-delete-popup',
  template: ''
})
export class PictureDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ picture }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(PictureDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.picture = picture;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/picture', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/picture', { outlets: { popup: null } }]);
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
