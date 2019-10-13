import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiParseLinks, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { IBoxer } from 'app/shared/model/boxer.model';
import { AccountService } from 'app/core/auth/account.service';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { BoxerService } from './boxer.service';

@Component({
  selector: 'jhi-boxer',
  templateUrl: './boxer.component.html'
})
export class BoxerComponent implements OnInit, OnDestroy {
  currentAccount: any;
  boxers: IBoxer[];
  error: any;
  success: any;
  eventSubscriber: Subscription;
  routeData: any;
  links: any;
  totalItems: any;
  itemsPerPage: any;
  page: any;
  predicate: any;
  previousPage: any;
  reverse: any;
  searchFilter: any;
  searchValue: any;
  printValue: any;

  constructor(
    protected boxerService: BoxerService,
    protected parseLinks: JhiParseLinks,
    protected jhiAlertService: JhiAlertService,
    protected accountService: AccountService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager
  ) {
    this.boxers = [];
    this.itemsPerPage = 5;
    this.routeData = this.activatedRoute.data.subscribe(data => {
      this.page = data.pagingParams.page;
      this.previousPage = data.pagingParams.page;
      this.reverse = data.pagingParams.ascending;
      this.predicate = data.pagingParams.predicate;
    });
    this.page = 0;
    this.links = {
      last: 0
    };
    this.predicate = 'id';
    this.reverse = true;
    this.searchFilter = 'fullName';
    this.searchValue = '';
    this.printValue = '';
  }

  loadAll() {
    this.boxerService
      .query({
        page: this.page - 1,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe(
        (res: HttpResponse<IBoxer[]>) => this.paginateBoxers(res.body, res.headers),
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  search() {
    this.boxers = [];
    if (this.searchValue) {
      this.printValue = this.searchValue;
      this.boxerService
        .query(
          {
            value: this.searchValue,
            filter: this.searchFilter,
            page: 0,
            size: this.itemsPerPage,
            sort: this.sort()
          },
          this.boxerService._searchURL
        )
        .subscribe(
          (res: HttpResponse<IBoxer[]>) => this.paginateBoxers(res.body, res.headers),
          (res: HttpErrorResponse) => this.onError(res.message)
        );
    } else {
      this.printValue = '';
      this.loadAll();
    }
  }

  reset() {
    this.page = 0;
    this.boxers = [];
    this.loadAll();
  }

  loadPage(page: number) {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.transition();
    }
  }

  transition() {
    this.router.navigate(['/boxer'], {
      queryParams: {
        page: this.page,
        size: this.itemsPerPage,
        sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
      }
    });
    this.loadAll();
  }

  clear() {
    this.page = 0;
    this.router.navigate([
      '/boxer',
      {
        page: this.page,
        sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
      }
    ]);
    this.loadAll();
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInBoxers();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IBoxer) {
    return item.id;
  }

  registerChangeInBoxers() {
    this.eventSubscriber = this.eventManager.subscribe('boxerListModification', response => this.loadAll());
  }

  sort() {
    const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  onButtonGroupClick($event) {
    const clickedElement = $event.target || $event.srcElement;

    if (clickedElement.nodeName === 'BUTTON') {
      const isCertainButtonAlreadyActive = clickedElement.parentElement.querySelector('.active');
      // if a Button already has Class: .active
      if (isCertainButtonAlreadyActive) {
        isCertainButtonAlreadyActive.classList.remove('active');
      }

      clickedElement.className += ' active';

      this.searchFilter = clickedElement.value;
    }
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }

  protected paginateBoxers(data: IBoxer[], headers: HttpHeaders) {
    this.links = this.parseLinks.parse(headers.get('link'));
    this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
    this.boxers = data;
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
