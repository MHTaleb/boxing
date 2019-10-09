import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BoxingSharedModule } from 'app/shared/shared.module';
import { BoxerComponent } from './boxer.component';
import { BoxerDetailComponent } from './boxer-detail.component';
import { BoxerUpdateComponent } from './boxer-update.component';
import { BoxerDeletePopupComponent, BoxerDeleteDialogComponent } from './boxer-delete-dialog.component';
import { boxerRoute, boxerPopupRoute } from './boxer.route';

const ENTITY_STATES = [...boxerRoute, ...boxerPopupRoute];

@NgModule({
  imports: [BoxingSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [BoxerComponent, BoxerDetailComponent, BoxerUpdateComponent, BoxerDeleteDialogComponent, BoxerDeletePopupComponent],
  entryComponents: [BoxerDeleteDialogComponent]
})
export class BoxingBoxerModule {}
