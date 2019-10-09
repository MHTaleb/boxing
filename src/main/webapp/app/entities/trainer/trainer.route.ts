import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Trainer } from 'app/shared/model/trainer.model';
import { TrainerService } from './trainer.service';
import { TrainerComponent } from './trainer.component';
import { TrainerDetailComponent } from './trainer-detail.component';
import { TrainerUpdateComponent } from './trainer-update.component';
import { TrainerDeletePopupComponent } from './trainer-delete-dialog.component';
import { ITrainer } from 'app/shared/model/trainer.model';

@Injectable({ providedIn: 'root' })
export class TrainerResolve implements Resolve<ITrainer> {
  constructor(private service: TrainerService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ITrainer> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Trainer>) => response.ok),
        map((trainer: HttpResponse<Trainer>) => trainer.body)
      );
    }
    return of(new Trainer());
  }
}

export const trainerRoute: Routes = [
  {
    path: '',
    component: TrainerComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'boxingApp.trainer.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: TrainerDetailComponent,
    resolve: {
      trainer: TrainerResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'boxingApp.trainer.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: TrainerUpdateComponent,
    resolve: {
      trainer: TrainerResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'boxingApp.trainer.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: TrainerUpdateComponent,
    resolve: {
      trainer: TrainerResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'boxingApp.trainer.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const trainerPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: TrainerDeletePopupComponent,
    resolve: {
      trainer: TrainerResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'boxingApp.trainer.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
