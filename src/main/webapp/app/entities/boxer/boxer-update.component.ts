import { Component, OnInit, ElementRef } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { IBoxer, Boxer } from 'app/shared/model/boxer.model';
import { BoxerService } from './boxer.service';
import { IPicture, Picture } from 'app/shared/model/picture.model';
import { PictureService } from '../picture/picture.service';

@Component({
  selector: 'jhi-boxer-update',
  templateUrl: './boxer-update.component.html'
})
export class BoxerUpdateComponent implements OnInit {
  isSaving: boolean;
  usedPicture: IPicture;
  birthDateDp: any;

  editForm = this.fb.group({
    id: [],
    fullName: [],
    birthDate: [],
    phone: [],
    picture: [],
    picId: [],
    title: [null, []],
    img: [],
    imgContentType: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected boxerService: BoxerService,
    protected dataUtils: JhiDataUtils,
    protected elementRef: ElementRef,
    protected pictureService: PictureService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ boxer }) => {
      this.updateForm(boxer);
      if (boxer.picture !== undefined) this.updatePictureForm(boxer.picture);
    });
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

  updatePictureForm(picture: IPicture) {
    this.editForm.patchValue({
      picId: picture.id,
      title: picture.title,
      img: picture.img,
      imgContentType: picture.imgContentType
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;

    const picture = this.createPictureFromForm();
    if (picture.id) {
      this.subscribePictureToSaveResponse(this.pictureService.update(picture));
    } else {
      this.subscribePictureToSaveResponse(this.pictureService.create(picture));
    }
  }

  private createPictureFromForm(): IPicture {
    return {
      ...new Picture(),
      id: this.editForm.get(['picId']).value,
      title: this.editForm.get(['title']).value,
      imgContentType: this.editForm.get(['imgContentType']).value,
      img: this.editForm.get(['img']).value
    };
  }

  private createFromForm(): IBoxer {
    return {
      ...new Boxer(),
      id: this.editForm.get(['id']).value,
      fullName: this.editForm.get(['fullName']).value,
      birthDate: this.editForm.get(['birthDate']).value,
      phone: this.editForm.get(['phone']).value,
      picture: this.usedPicture
    };
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }

  setFileData(event, field: string, isImage) {
    return new Promise((resolve, reject) => {
      if (event && event.target && event.target.files && event.target.files[0]) {
        const file: File = event.target.files[0];
        if (isImage && !file.type.startsWith('image/')) {
          reject(`File was expected to be an image but was found to be ${file.type}`);
        } else {
          const filedContentType: string = field + 'ContentType';
          this.dataUtils.toBase64(file, base64Data => {
            this.editForm.patchValue({
              [field]: base64Data,
              [filedContentType]: file.type
            });
          });
        }
      } else {
        reject(`Base64 data was not set as file could not be extracted from passed parameter: ${event}`);
      }
    }).then(
      // eslint-disable-next-line no-console
      () => console.log('blob added'), // success
      this.onError
    );
  }

  clearInputImage(field: string, fieldContentType: string, idInput: string) {
    this.editForm.patchValue({
      [field]: null,
      [fieldContentType]: null
    });
    if (this.elementRef && idInput && this.elementRef.nativeElement.querySelector('#' + idInput)) {
      this.elementRef.nativeElement.querySelector('#' + idInput).value = null;
    }
  }

  protected subscribePictureToSaveResponse(result: Observable<HttpResponse<IPicture>>) {
    result.subscribe(picture => this.onPictureSaveSuccess(picture.body), () => this.onSaveError());
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IBoxer>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onPictureSaveSuccess(picture: IPicture) {
    this.usedPicture = new Picture(picture.id, picture.title, picture.imgContentType, picture.img);

    const boxer = this.createFromForm();
    boxer.picture = this.usedPicture;
    if (boxer.id !== undefined) {
      this.subscribeToSaveResponse(this.boxerService.update(boxer));
    } else {
      this.subscribeToSaveResponse(this.boxerService.create(boxer));
    }
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
