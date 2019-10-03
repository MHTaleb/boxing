import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IVersement } from 'app/shared/model/versement.model';

type EntityResponseType = HttpResponse<IVersement>;
type EntityArrayResponseType = HttpResponse<IVersement[]>;

@Injectable({ providedIn: 'root' })
export class VersementService {
  public resourceUrl = SERVER_API_URL + 'api/versements';

  constructor(protected http: HttpClient) {}

  create(versement: IVersement): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(versement);
    return this.http
      .post<IVersement>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(versement: IVersement): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(versement);
    return this.http
      .put<IVersement>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IVersement>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IVersement[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(versement: IVersement): IVersement {
    const copy: IVersement = Object.assign({}, versement, {
      date: versement.date != null && versement.date.isValid() ? versement.date.format(DATE_FORMAT) : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.date = res.body.date != null ? moment(res.body.date) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((versement: IVersement) => {
        versement.date = versement.date != null ? moment(versement.date) : null;
      });
    }
    return res;
  }
}
