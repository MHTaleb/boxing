import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { BoxingTestModule } from '../../../test.module';
import { LessonDeleteDialogComponent } from 'app/entities/lesson/lesson-delete-dialog.component';
import { LessonService } from 'app/entities/lesson/lesson.service';

describe('Component Tests', () => {
  describe('Lesson Management Delete Component', () => {
    let comp: LessonDeleteDialogComponent;
    let fixture: ComponentFixture<LessonDeleteDialogComponent>;
    let service: LessonService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BoxingTestModule],
        declarations: [LessonDeleteDialogComponent]
      })
        .overrideTemplate(LessonDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(LessonDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(LessonService);
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
