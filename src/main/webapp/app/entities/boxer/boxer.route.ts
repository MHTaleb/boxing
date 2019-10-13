import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Boxer } from 'app/shared/model/boxer.model';
import { BoxerService } from './boxer.service';
import { BoxerComponent } from './boxer.component';
import { BoxerDetailComponent } from './boxer-detail.component';
import { BoxerUpdateComponent } from './boxer-update.component';
import { BoxerDeletePopupComponent } from './boxer-delete-dialog.component';
import { IBoxer } from 'app/shared/model/boxer.model';
import { BoxerPrintPopupComponent } from './boxer-print-dialogue.component';

@Injectable({ providedIn: 'root' })
export class BoxerResolve implements Resolve<IBoxer> {
  constructor(private service: BoxerService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IBoxer> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Boxer>) => response.ok),
        map((boxer: HttpResponse<Boxer>) => boxer.body)
      );
    }
    return of(new Boxer());
  }
}

export const boxerRoute: Routes = [
  {
    path: '',
    component: BoxerComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'boxingApp.boxer.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: BoxerDetailComponent,
    resolve: {
      boxer: BoxerResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'boxingApp.boxer.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: BoxerUpdateComponent,
    resolve: {
      boxer: BoxerResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'boxingApp.boxer.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: BoxerUpdateComponent,
    resolve: {
      boxer: BoxerResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'boxingApp.boxer.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const boxerPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: BoxerDeletePopupComponent,
    resolve: {
      boxer: BoxerResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'boxingApp.boxer.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: '/print',
    component: BoxerPrintPopupComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'boxingApp.boxer.home.print'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
