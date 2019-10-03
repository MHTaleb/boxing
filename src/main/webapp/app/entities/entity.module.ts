import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'picture',
        loadChildren: () => import('./picture/picture.module').then(m => m.BoxingPictureModule)
      },
      {
        path: 'trainer',
        loadChildren: () => import('./trainer/trainer.module').then(m => m.BoxingTrainerModule)
      },
      {
        path: 'boxer',
        loadChildren: () => import('./boxer/boxer.module').then(m => m.BoxingBoxerModule)
      },
      {
        path: 'lesson',
        loadChildren: () => import('./lesson/lesson.module').then(m => m.BoxingLessonModule)
      },
      {
        path: 'versement',
        loadChildren: () => import('./versement/versement.module').then(m => m.BoxingVersementModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class BoxingEntityModule {}
