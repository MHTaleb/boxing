import { NgModule } from '@angular/core';
import { BoxingSharedLibsModule } from './shared-libs.module';
import { FindLanguageFromKeyPipe } from './language/find-language-from-key.pipe';
import { JhiAlertComponent } from './alert/alert.component';
import { JhiAlertErrorComponent } from './alert/alert-error.component';
import { JhiLoginModalComponent } from './login/login.component';
import { HasAnyAuthorityDirective } from './auth/has-any-authority.directive';
import { NgxBarcodeModule, NgxBarcodeComponent } from 'ngx-barcode';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { FlexLayoutModule } from '@angular/flex-layout';
@NgModule({
  imports: [BoxingSharedLibsModule, NgxBarcodeModule.forRoot(), LazyLoadImageModule, FlexLayoutModule],
  declarations: [FindLanguageFromKeyPipe, JhiAlertComponent, JhiAlertErrorComponent, JhiLoginModalComponent, HasAnyAuthorityDirective],
  entryComponents: [JhiLoginModalComponent],
  exports: [
    NgxBarcodeComponent,
    BoxingSharedLibsModule,
    LazyLoadImageModule,
    FindLanguageFromKeyPipe,
    JhiAlertComponent,
    JhiAlertErrorComponent,
    JhiLoginModalComponent,
    HasAnyAuthorityDirective,
    FlexLayoutModule
  ]
})
export class BoxingSharedModule {}
