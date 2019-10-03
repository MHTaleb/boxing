import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { BoxingTestModule } from '../../../test.module';
import { PictureDeleteDialogComponent } from 'app/entities/picture/picture-delete-dialog.component';
import { PictureService } from 'app/entities/picture/picture.service';

describe('Component Tests', () => {
  describe('Picture Management Delete Component', () => {
    let comp: PictureDeleteDialogComponent;
    let fixture: ComponentFixture<PictureDeleteDialogComponent>;
    let service: PictureService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BoxingTestModule],
        declarations: [PictureDeleteDialogComponent]
      })
        .overrideTemplate(PictureDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PictureDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PictureService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
