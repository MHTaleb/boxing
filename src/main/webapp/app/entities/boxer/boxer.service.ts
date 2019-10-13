import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IBoxer } from 'app/shared/model/boxer.model';

type EntityResponseType = HttpResponse<IBoxer>;
type EntityArrayResponseType = HttpResponse<IBoxer[]>;

@Injectable({ providedIn: 'root' })
export class BoxerService {
  public boxers: IBoxer[];
  public resourceUrl = SERVER_API_URL + 'api/boxers';
  public _searchURL = '/search';
  constructor(protected http: HttpClient) {}

  create(boxer: IBoxer): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(boxer);
    return this.http
      .post<IBoxer>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(boxer: IBoxer): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(boxer);
    return this.http
      .put<IBoxer>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IBoxer>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any, path?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    let requestUrl = this.resourceUrl;
    if (path) {
      requestUrl += path;
    }
    return this.http
      .get<IBoxer[]>(requestUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(boxer: IBoxer): IBoxer {
    const copy: IBoxer = Object.assign({}, boxer, {
      birthDate: boxer.birthDate != null && boxer.birthDate.isValid() ? boxer.birthDate.format(DATE_FORMAT) : null
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
      res.body.forEach((boxer: IBoxer) => {
        boxer.birthDate = boxer.birthDate != null ? moment(boxer.birthDate) : null;
      });
    }
    this.boxers = res.body;
    return res;
  }
}
