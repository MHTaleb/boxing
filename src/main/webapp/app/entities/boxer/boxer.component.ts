import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiParseLinks, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { IBoxer } from 'app/shared/model/boxer.model';
import { AccountService } from 'app/core/auth/account.service';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { BoxerService } from './boxer.service';
import { PictureService } from '../picture/picture.service';

@Component({
  selector: 'jhi-boxer',
  templateUrl: './boxer.component.html'
})
export class BoxerComponent implements OnInit, OnDestroy {
  boxers: IBoxer[];
  currentAccount: any;
  eventSubscriber: Subscription;
  itemsPerPage: number;
  links: any;
  page: any;
  predicate: any;
  reverse: any;
  totalItems: number;
  searchFilter: any;
  searchValue: any;

  constructor(
    protected boxerService: BoxerService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected parseLinks: JhiParseLinks,
    protected accountService: AccountService,
    protected pictureService: PictureService,
    protected dataUtils: JhiDataUtils
  ) {
    this.boxers = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0
    };
    this.predicate = 'id';
    this.reverse = true;
    this.searchFilter = 'fullName';
  }

  loadAll() {
    this.boxerService
      .query({
        page: this.page,
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
      this.boxerService
        .query(
          {
            value: this.searchValue,
            filter: this.searchFilter,
            page: this.page,
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
      this.loadAll();
    }
  }

  reset() {
    this.page = 0;
    this.boxers = [];
    this.loadAll();
  }

  loadPage(page) {
    this.page = page;
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
    this.eventSubscriber = this.eventManager.subscribe('boxerListModification', response => this.reset());
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
    for (let i = 0; i < data.length; i++) {
      this.boxers.push(data[i]);
    }
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
