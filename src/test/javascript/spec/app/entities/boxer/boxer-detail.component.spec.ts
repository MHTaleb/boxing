import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { BoxingTestModule } from '../../../test.module';
import { BoxerDetailComponent } from 'app/entities/boxer/boxer-detail.component';
import { Boxer } from 'app/shared/model/boxer.model';

describe('Component Tests', () => {
  describe('Boxer Management Detail Component', () => {
    let comp: BoxerDetailComponent;
    let fixture: ComponentFixture<BoxerDetailComponent>;
    const route = ({ data: of({ boxer: new Boxer(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BoxingTestModule],
        declarations: [BoxerDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(BoxerDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(BoxerDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.boxer).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
