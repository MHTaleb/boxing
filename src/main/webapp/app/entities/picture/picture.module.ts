import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BoxingSharedModule } from 'app/shared/shared.module';
import { PictureComponent } from './picture.component';
import { PictureDetailComponent } from './picture-detail.component';
import { PictureUpdateComponent } from './picture-update.component';
import { PictureDeletePopupComponent, PictureDeleteDialogComponent } from './picture-delete-dialog.component';
import { pictureRoute, picturePopupRoute } from './picture.route';

const ENTITY_STATES = [...pictureRoute, ...picturePopupRoute];

@NgModule({
  imports: [BoxingSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    PictureComponent,
    PictureDetailComponent,
    PictureUpdateComponent,
    PictureDeleteDialogComponent,
    PictureDeletePopupComponent
  ],
  entryComponents: [PictureDeleteDialogComponent]
})
export class BoxingPictureModule {}
