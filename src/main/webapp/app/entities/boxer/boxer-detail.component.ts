import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IBoxer } from 'app/shared/model/boxer.model';
import { JhiDataUtils, JhiAlertService } from 'ng-jhipster';
import { Observable, of } from 'rxjs';
import { MAN_PICTURE_PATH } from 'app/shared/constants/input.constants';
import { IVersement } from 'app/shared/model/versement.model';
import { VersementService } from '../versement/versement.service';
import { LessonService } from '../lesson/lesson.service';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ILesson } from 'app/shared/model/lesson.model';

@Component({
  selector: 'jhi-boxer-detail',
  templateUrl: './boxer-detail.component.html'
})
export class BoxerDetailComponent implements OnInit {
  boxer: IBoxer;
  versements: Observable<IVersement[]>;
  lessons: Observable<ILesson[]>;
  manPicturePath: any;

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected activatedRoute: ActivatedRoute,
    protected dataUtils: JhiDataUtils,
    protected versementService: VersementService,
    protected lessonService: LessonService
  ) {}

  ngOnInit() {
    this.manPicturePath = MAN_PICTURE_PATH;

    this.activatedRoute.data.subscribe(({ boxer }) => {
      this.boxer = boxer;
    });

    this.versementService
      .query({ id: this.boxer.id }, this.versementService.BY_BOXER_ID)
      .subscribe(
        (res: HttpResponse<IVersement[]>) => this.fetchVersementsDatas(res.body),
        (err: HttpErrorResponse) => this.JhiAlertError(err)
      );

    this.lessonService
      .query({ id: this.boxer.id }, this.lessonService.BY_BOXER_ID)
      .subscribe((res: HttpResponse<ILesson[]>) => this.fetchLessonsDatas(res.body), (err: HttpErrorResponse) => this.JhiAlertError(err));
  }

  fetchLessonsDatas(lessons) {
    this.lessons = of(lessons);
  }

  fetchVersementsDatas(versements?: IVersement[]) {
    this.versements = of(versements);
  }

  JhiAlertError(errorMessage: any) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  byteSize(field: any) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType: any, field: any) {
    return this.dataUtils.openFile(contentType, field);
  }

  previousState() {
    window.history.back();
  }
}
