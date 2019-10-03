import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { BoxingTestModule } from '../../../test.module';
import { PictureDetailComponent } from 'app/entities/picture/picture-detail.component';
import { Picture } from 'app/shared/model/picture.model';

describe('Component Tests', () => {
  describe('Picture Management Detail Component', () => {
    let comp: PictureDetailComponent;
    let fixture: ComponentFixture<PictureDetailComponent>;
    const route = ({ data: of({ picture: new Picture(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BoxingTestModule],
        declarations: [PictureDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(PictureDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PictureDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.picture).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
