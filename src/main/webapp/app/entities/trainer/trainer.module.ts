import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BoxingSharedModule } from 'app/shared/shared.module';
import { TrainerComponent } from './trainer.component';
import { TrainerDetailComponent } from './trainer-detail.component';
import { TrainerUpdateComponent } from './trainer-update.component';
import { TrainerDeletePopupComponent, TrainerDeleteDialogComponent } from './trainer-delete-dialog.component';
import { trainerRoute, trainerPopupRoute } from './trainer.route';

const ENTITY_STATES = [...trainerRoute, ...trainerPopupRoute];

@NgModule({
  imports: [BoxingSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    TrainerComponent,
    TrainerDetailComponent,
    TrainerUpdateComponent,
    TrainerDeleteDialogComponent,
    TrainerDeletePopupComponent
  ],
  entryComponents: [TrainerDeleteDialogComponent]
})
export class BoxingTrainerModule {}
