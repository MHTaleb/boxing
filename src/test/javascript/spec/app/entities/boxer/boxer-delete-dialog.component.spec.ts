import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { BoxingTestModule } from '../../../test.module';
import { BoxerDeleteDialogComponent } from 'app/entities/boxer/boxer-delete-dialog.component';
import { BoxerService } from 'app/entities/boxer/boxer.service';

describe('Component Tests', () => {
  describe('Boxer Management Delete Component', () => {
    let comp: BoxerDeleteDialogComponent;
    let fixture: ComponentFixture<BoxerDeleteDialogComponent>;
    let service: BoxerService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BoxingTestModule],
        declarations: [BoxerDeleteDialogComponent]
      })
        .overrideTemplate(BoxerDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(BoxerDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(BoxerService);
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
