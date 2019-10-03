import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IPicture } from 'app/shared/model/picture.model';

@Component({
  selector: 'jhi-picture-detail',
  templateUrl: './picture-detail.component.html'
})
export class PictureDetailComponent implements OnInit {
  picture: IPicture;

  constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ picture }) => {
      this.picture = picture;
    });
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }
  previousState() {
    window.history.back();
  }
}
