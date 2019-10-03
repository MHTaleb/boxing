import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BoxingSharedModule } from 'app/shared/shared.module';
import { VersementComponent } from './versement.component';
import { VersementDetailComponent } from './versement-detail.component';
import { VersementUpdateComponent } from './versement-update.component';
import { VersementDeletePopupComponent, VersementDeleteDialogComponent } from './versement-delete-dialog.component';
import { versementRoute, versementPopupRoute } from './versement.route';

const ENTITY_STATES = [...versementRoute, ...versementPopupRoute];

@NgModule({
  imports: [BoxingSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    VersementComponent,
    VersementDetailComponent,
    VersementUpdateComponent,
    VersementDeleteDialogComponent,
    VersementDeletePopupComponent
  ],
  entryComponents: [VersementDeleteDialogComponent]
})
export class BoxingVersementModule {}
