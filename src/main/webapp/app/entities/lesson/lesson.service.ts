import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ILesson } from 'app/shared/model/lesson.model';

type EntityResponseType = HttpResponse<ILesson>;
type EntityArrayResponseType = HttpResponse<ILesson[]>;

@Injectable({ providedIn: 'root' })
export class LessonService {
  public resourceUrl = SERVER_API_URL + 'api/lessons';
  public BY_BOXER_ID = '/boxer/id';

  constructor(protected http: HttpClient) {}

  create(lesson: ILesson): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(lesson);
    return this.http
      .post<ILesson>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(lesson: ILesson): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(lesson);
    return this.http
      .put<ILesson>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ILesson>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any, path: any = ''): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ILesson[]>(this.resourceUrl + path, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(lesson: ILesson): ILesson {
    const copy: ILesson = Object.assign({}, lesson, {
      date: lesson.date != null && lesson.date.isValid() ? lesson.date.format(DATE_FORMAT) : null,
      hour: lesson.hour != null && lesson.hour.isValid() ? lesson.hour.toJSON() : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.date = res.body.date != null ? moment(res.body.date) : null;
      res.body.hour = res.body.hour != null ? moment(res.body.hour) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((lesson: ILesson) => {
        lesson.date = lesson.date != null ? moment(lesson.date) : null;
        lesson.hour = lesson.hour != null ? moment(lesson.hour) : null;
      });
    }
    return res;
  }
}
