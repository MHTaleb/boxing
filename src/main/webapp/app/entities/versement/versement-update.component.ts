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
import { IVersement, Versement } from 'app/shared/model/versement.model';
import { VersementService } from './versement.service';
import { IBoxer } from 'app/shared/model/boxer.model';
import { BoxerService } from 'app/entities/boxer/boxer.service';

@Component({
  selector: 'jhi-versement-update',
  templateUrl: './versement-update.component.html'
})
export class VersementUpdateComponent implements OnInit {
  isSaving: boolean;

  boxers: IBoxer[];
  dateDp: any;

  editForm = this.fb.group({
    id: [],
    montant: [],
    date: [],
    boxer: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected versementService: VersementService,
    protected boxerService: BoxerService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ versement }) => {
      this.updateForm(versement);
    });
    this.boxerService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IBoxer[]>) => mayBeOk.ok),
        map((response: HttpResponse<IBoxer[]>) => response.body)
      )
      .subscribe((res: IBoxer[]) => (this.boxers = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(versement: IVersement) {
    this.editForm.patchValue({
      id: versement.id,
      montant: versement.montant,
      date: versement.date,
      boxer: versement.boxer
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const versement = this.createFromForm();
    if (versement.id !== undefined) {
      this.subscribeToSaveResponse(this.versementService.update(versement));
    } else {
      this.subscribeToSaveResponse(this.versementService.create(versement));
    }
  }

  private createFromForm(): IVersement {
    return {
      ...new Versement(),
      id: this.editForm.get(['id']).value,
      montant: this.editForm.get(['montant']).value,
      date: this.editForm.get(['date']).value,
      boxer: this.editForm.get(['boxer']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IVersement>>) {
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

  trackBoxerById(index: number, item: IBoxer) {
    return item.id;
  }
}
