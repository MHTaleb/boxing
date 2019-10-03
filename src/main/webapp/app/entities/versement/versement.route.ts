import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Versement } from 'app/shared/model/versement.model';
import { VersementService } from './versement.service';
import { VersementComponent } from './versement.component';
import { VersementDetailComponent } from './versement-detail.component';
import { VersementUpdateComponent } from './versement-update.component';
import { VersementDeletePopupComponent } from './versement-delete-dialog.component';
import { IVersement } from 'app/shared/model/versement.model';

@Injectable({ providedIn: 'root' })
export class VersementResolve implements Resolve<IVersement> {
  constructor(private service: VersementService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IVersement> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Versement>) => response.ok),
        map((versement: HttpResponse<Versement>) => versement.body)
      );
    }
    return of(new Versement());
  }
}

export const versementRoute: Routes = [
  {
    path: '',
    component: VersementComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'boxingApp.versement.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: VersementDetailComponent,
    resolve: {
      versement: VersementResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'boxingApp.versement.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: VersementUpdateComponent,
    resolve: {
      versement: VersementResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'boxingApp.versement.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: VersementUpdateComponent,
    resolve: {
      versement: VersementResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'boxingApp.versement.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const versementPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: VersementDeletePopupComponent,
    resolve: {
      versement: VersementResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'boxingApp.versement.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
