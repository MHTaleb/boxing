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
import { IBoxer, Boxer } from 'app/shared/model/boxer.model';
import { BoxerService } from './boxer.service';
import { IPicture } from 'app/shared/model/picture.model';
import { PictureService } from 'app/entities/picture/picture.service';

@Component({
  selector: 'jhi-boxer-update',
  templateUrl: './boxer-update.component.html'
})
export class BoxerUpdateComponent implements OnInit {
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
    protected boxerService: BoxerService,
    protected pictureService: PictureService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ boxer }) => {
      this.updateForm(boxer);
    });
    this.pictureService
      .query({ filter: 'boxer-is-null' })
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

  updateForm(boxer: IBoxer) {
    this.editForm.patchValue({
      id: boxer.id,
      fullName: boxer.fullName,
      birthDate: boxer.birthDate,
      phone: boxer.phone,
      picture: boxer.picture
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const boxer = this.createFromForm();
    if (boxer.id !== undefined) {
      this.subscribeToSaveResponse(this.boxerService.update(boxer));
    } else {
      this.subscribeToSaveResponse(this.boxerService.create(boxer));
    }
  }

  private createFromForm(): IBoxer {
    return {
      ...new Boxer(),
      id: this.editForm.get(['id']).value,
      fullName: this.editForm.get(['fullName']).value,
      birthDate: this.editForm.get(['birthDate']).value,
      phone: this.editForm.get(['phone']).value,
      picture: this.editForm.get(['picture']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IBoxer>>) {
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
