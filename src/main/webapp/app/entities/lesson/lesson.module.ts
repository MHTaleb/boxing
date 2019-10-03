import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BoxingSharedModule } from 'app/shared/shared.module';
import { LessonComponent } from './lesson.component';
import { LessonDetailComponent } from './lesson-detail.component';
import { LessonUpdateComponent } from './lesson-update.component';
import { LessonDeletePopupComponent, LessonDeleteDialogComponent } from './lesson-delete-dialog.component';
import { lessonRoute, lessonPopupRoute } from './lesson.route';

const ENTITY_STATES = [...lessonRoute, ...lessonPopupRoute];

@NgModule({
  imports: [BoxingSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [LessonComponent, LessonDetailComponent, LessonUpdateComponent, LessonDeleteDialogComponent, LessonDeletePopupComponent],
  entryComponents: [LessonDeleteDialogComponent]
})
export class BoxingLessonModule {}
