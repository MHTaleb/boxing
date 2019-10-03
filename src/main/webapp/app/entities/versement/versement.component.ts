import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IVersement } from 'app/shared/model/versement.model';
import { AccountService } from 'app/core/auth/account.service';
import { VersementService } from './versement.service';

@Component({
  selector: 'jhi-versement',
  templateUrl: './versement.component.html'
})
export class VersementComponent implements OnInit, OnDestroy {
  versements: IVersement[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected versementService: VersementService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.versementService
      .query()
      .pipe(
        filter((res: HttpResponse<IVersement[]>) => res.ok),
        map((res: HttpResponse<IVersement[]>) => res.body)
      )
      .subscribe(
        (res: IVersement[]) => {
          this.versements = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInVersements();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IVersement) {
    return item.id;
  }

  registerChangeInVersements() {
    this.eventSubscriber = this.eventManager.subscribe('versementListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
