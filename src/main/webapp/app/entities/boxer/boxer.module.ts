import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BoxingSharedModule } from 'app/shared/shared.module';
import { BoxerComponent } from './boxer.component';
import { BoxerDetailComponent } from './boxer-detail.component';
import { BoxerUpdateComponent } from './boxer-update.component';
import { BoxerDeletePopupComponent, BoxerDeleteDialogComponent } from './boxer-delete-dialog.component';
import { boxerRoute, boxerPopupRoute } from './boxer.route';
import { FilterByPipe } from 'ngx-pipes';
import { BoxerPrintDialogueComponent } from './boxer-print-dialogue.component';

const ENTITY_STATES = [...boxerRoute, ...boxerPopupRoute];

@NgModule({
  imports: [BoxingSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    FilterByPipe,
    BoxerComponent,
    BoxerDetailComponent,
    BoxerUpdateComponent,
    BoxerDeleteDialogComponent,
    BoxerDeletePopupComponent,
    BoxerPrintDialogueComponent
  ],
  entryComponents: [BoxerDeleteDialogComponent]
})
export class BoxingBoxerModule {}
