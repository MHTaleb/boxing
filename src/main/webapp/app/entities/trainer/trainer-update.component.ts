import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';
import { ITrainer, Trainer } from 'app/shared/model/trainer.model';
import { TrainerService } from './trainer.service';
import { IPicture } from 'app/shared/model/picture.model';
import { PictureService } from 'app/entities/picture/picture.service';

@Component({
  selector: 'jhi-trainer-update',
  templateUrl: './trainer-update.component.html'
})
export class TrainerUpdateComponent implements OnInit {
  isSaving: boolean;

  pictures: IPicture[];
  birthDateDp: any;

  editForm = this.fb.group({
    id: [],
    fullName: [],
    birthDate: [],
    phone: [],
    picture: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected trainerService: TrainerService,
    protected pictureService: PictureService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ trainer }) => {
      this.updateForm(trainer);
    });
    this.pictureService
      .query({ filter: 'trainer-is-null' })
      .pipe(
        filter((mayBeOk: HttpResponse<IPicture[]>) => mayBeOk.ok),
        map((response: HttpResponse<IPicture[]>) => response.body)
      )
      .subscribe(
        (res: IPicture[]) => {
          if (!this.editForm.get('picture').value || !this.editForm.get('picture').value.id) {
            this.pictures = res;
          } else {
            this.pictureService
              .find(this.editForm.get('picture').value.id)
              .pipe(
                filter((subResMayBeOk: HttpResponse<IPicture>) => subResMayBeOk.ok),
                map((subResponse: HttpResponse<IPicture>) => subResponse.body)
              )
              .subscribe(
                (subRes: IPicture) => (this.pictures = [subRes].concat(res)),
                (subRes: HttpErrorResponse) => this.onError(subRes.message)
              );
          }
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  updateForm(trainer: ITrainer) {
    this.editForm.patchValue({
      id: trainer.id,
      fullName: trainer.fullName,
      birthDate: trainer.birthDate,
      phone: trainer.phone,
      picture: trainer.picture
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const trainer = this.createFromForm();
    if (trainer.id !== undefined) {
      this.subscribeToSaveResponse(this.trainerService.update(trainer));
    } else {
      this.subscribeToSaveResponse(this.trainerService.create(trainer));
    }
  }

  private createFromForm(): ITrainer {
    return {
      ...new Trainer(),
      id: this.editForm.get(['id']).value,
      fullName: this.editForm.get(['fullName']).value,
      birthDate: this.editForm.get(['birthDate']).value,
      phone: this.editForm.get(['phone']).value,
      picture: this.editForm.get(['picture']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITrainer>>) {
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

  trackPictureById(index: number, item: IPicture) {
    return item.id;
  }
}
