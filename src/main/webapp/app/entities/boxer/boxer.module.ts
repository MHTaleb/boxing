import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BoxingSharedModule } from 'app/shared/shared.module';
import { BoxerComponent } from './boxer.component';
import { BoxerDetailComponent } from './boxer-detail.component';
import { BoxerUpdateComponent } from './boxer-update.component';
import { BoxerDeletePopupComponent, BoxerDeleteDialogComponent } from './boxer-delete-dialog.component';
import { boxerRoute, boxerPopupRoute } from './boxer.route';
import { BoxerPrintDialogueComponent, BoxerPrintPopupComponent } from './boxer-print-dialogue.component';
import { PrintBoxeurCardComponent } from './print-boxeur-card/print-boxeur-card.component';
import { PrintBoxeurListComponent } from './print-boxeur-list/print-boxeur-list.component';

const ENTITY_STATES = [...boxerRoute, ...boxerPopupRoute];

@NgModule({
  imports: [BoxingSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    BoxerComponent,
    BoxerDetailComponent,
    BoxerUpdateComponent,
    BoxerDeleteDialogComponent,
    BoxerDeletePopupComponent,
    BoxerPrintDialogueComponent,
    BoxerPrintPopupComponent,
    PrintBoxeurCardComponent,
    PrintBoxeurListComponent
  ],
  entryComponents: [BoxerDeleteDialogComponent, BoxerPrintDialogueComponent]
})
export class BoxingBoxerModule {}
