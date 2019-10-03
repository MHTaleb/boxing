import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Picture } from 'app/shared/model/picture.model';
import { PictureService } from './picture.service';
import { PictureComponent } from './picture.component';
import { PictureDetailComponent } from './picture-detail.component';
import { PictureUpdateComponent } from './picture-update.component';
import { PictureDeletePopupComponent } from './picture-delete-dialog.component';
import { IPicture } from 'app/shared/model/picture.model';

@Injectable({ providedIn: 'root' })
export class PictureResolve implements Resolve<IPicture> {
  constructor(private service: PictureService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IPicture> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Picture>) => response.ok),
        map((picture: HttpResponse<Picture>) => picture.body)
      );
    }
    return of(new Picture());
  }
}

export const pictureRoute: Routes = [
  {
    path: '',
    component: PictureComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'boxingApp.picture.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: PictureDetailComponent,
    resolve: {
      picture: PictureResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'boxingApp.picture.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: PictureUpdateComponent,
    resolve: {
      picture: PictureResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'boxingApp.picture.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: PictureUpdateComponent,
    resolve: {
      picture: PictureResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'boxingApp.picture.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const picturePopupRoute: Routes = [
  {
    path: ':id/delete',
    component: PictureDeletePopupComponent,
    resolve: {
      picture: PictureResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'boxingApp.picture.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
