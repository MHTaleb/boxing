import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { BoxingTestModule } from '../../../test.module';
import { BoxerUpdateComponent } from 'app/entities/boxer/boxer-update.component';
import { BoxerService } from 'app/entities/boxer/boxer.service';
import { Boxer } from 'app/shared/model/boxer.model';

describe('Component Tests', () => {
  describe('Boxer Management Update Component', () => {
    let comp: BoxerUpdateComponent;
    let fixture: ComponentFixture<BoxerUpdateComponent>;
    let service: BoxerService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BoxingTestModule],
        declarations: [BoxerUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(BoxerUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(BoxerUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(BoxerService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Boxer(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Boxer();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
