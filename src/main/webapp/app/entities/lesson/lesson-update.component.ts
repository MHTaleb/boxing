import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { ILesson, Lesson } from 'app/shared/model/lesson.model';
import { LessonService } from './lesson.service';
import { ITrainer } from 'app/shared/model/trainer.model';
import { TrainerService } from 'app/entities/trainer/trainer.service';
import { IBoxer } from 'app/shared/model/boxer.model';
import { BoxerService } from 'app/entities/boxer/boxer.service';

@Component({
  selector: 'jhi-lesson-update',
  templateUrl: './lesson-update.component.html'
})
export class LessonUpdateComponent implements OnInit {
  isSaving: boolean;

  trainers: ITrainer[];

  boxers: IBoxer[];
  dateDp: any;

  editForm = this.fb.group({
    id: [],
    detail: [],
    date: [],
    hour: [],
    trainer: [],
    boxers: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected lessonService: LessonService,
    protected trainerService: TrainerService,
    protected boxerService: BoxerService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ lesson }) => {
      this.updateForm(lesson);
    });
    this.trainerService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ITrainer[]>) => mayBeOk.ok),
        map((response: HttpResponse<ITrainer[]>) => response.body)
      )
      .subscribe((res: ITrainer[]) => (this.trainers = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.boxerService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IBoxer[]>) => mayBeOk.ok),
        map((response: HttpResponse<IBoxer[]>) => response.body)
      )
      .subscribe((res: IBoxer[]) => (this.boxers = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(lesson: ILesson) {
    this.editForm.patchValue({
      id: lesson.id,
      detail: lesson.detail,
      date: lesson.date,
      hour: lesson.hour != null ? lesson.hour.format(DATE_TIME_FORMAT) : null,
      trainer: lesson.trainer,
      boxers: lesson.boxers
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const lesson = this.createFromForm();
    if (lesson.id !== undefined) {
      this.subscribeToSaveResponse(this.lessonService.update(lesson));
    } else {
      this.subscribeToSaveResponse(this.lessonService.create(lesson));
    }
  }

  private createFromForm(): ILesson {
    return {
      ...new Lesson(),
      id: this.editForm.get(['id']).value,
      detail: this.editForm.get(['detail']).value,
      date: this.editForm.get(['date']).value,
      hour: this.editForm.get(['hour']).value != null ? moment(this.editForm.get(['hour']).value, DATE_TIME_FORMAT) : undefined,
      trainer: this.editForm.get(['trainer']).value,
      boxers: this.editForm.get(['boxers']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ILesson>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackTrainerById(index: number, item: ITrainer) {
    return item.id;
  }

  trackBoxerById(index: number, item: IBoxer) {
    return item.id;
  }

  getSelected(selectedVals: any[], option: any) {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }
}
