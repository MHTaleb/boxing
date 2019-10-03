import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BoxingTestModule } from '../../../test.module';
import { VersementComponent } from 'app/entities/versement/versement.component';
import { VersementService } from 'app/entities/versement/versement.service';
import { Versement } from 'app/shared/model/versement.model';

describe('Component Tests', () => {
  describe('Versement Management Component', () => {
    let comp: VersementComponent;
    let fixture: ComponentFixture<VersementComponent>;
    let service: VersementService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BoxingTestModule],
        declarations: [VersementComponent],
        providers: []
      })
        .overrideTemplate(VersementComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(VersementComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(VersementService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Versement(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.versements[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
