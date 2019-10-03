import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ITrainer } from 'app/shared/model/trainer.model';

type EntityResponseType = HttpResponse<ITrainer>;
type EntityArrayResponseType = HttpResponse<ITrainer[]>;

@Injectable({ providedIn: 'root' })
export class TrainerService {
  public resourceUrl = SERVER_API_URL + 'api/trainers';

  constructor(protected http: HttpClient) {}

  create(trainer: ITrainer): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(trainer);
    return this.http
      .post<ITrainer>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(trainer: ITrainer): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(trainer);
    return this.http
      .put<ITrainer>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ITrainer>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ITrainer[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(trainer: ITrainer): ITrainer {
    const copy: ITrainer = Object.assign({}, trainer, {
      birthDate: trainer.birthDate != null && trainer.birthDate.isValid() ? trainer.birthDate.format(DATE_FORMAT) : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.birthDate = res.body.birthDate != null ? moment(res.body.birthDate) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((trainer: ITrainer) => {
        trainer.birthDate = trainer.birthDate != null ? moment(trainer.birthDate) : null;
      });
    }
    return res;
  }
}
