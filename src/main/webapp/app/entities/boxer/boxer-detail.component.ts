import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IBoxer } from 'app/shared/model/boxer.model';

@Component({
  selector: 'jhi-boxer-detail',
  templateUrl: './boxer-detail.component.html'
})
export class BoxerDetailComponent implements OnInit {
  boxer: IBoxer;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ boxer }) => {
      this.boxer = boxer;
    });
  }

  previousState() {
    window.history.back();
  }
}
