import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
//import { CustomHttpInterceptorService } from './custom-request.option';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ThingsComponent } from './things/things.component';
import { ThingsSLComponent } from './things/things-sl/things-sl.component';
import { ThingsItemComponent } from './things/things-item/things-item.component';
import { ThingsSlItemComponent } from './things/things-sl/things-sl-item/things-sl-item.component';
import { MinistryWorksComponent } from './MinistryWorks/MinistryWorks.component';
import { MinistryWorksSlComponent } from './MinistryWorks/MinistryWorks-sl/MinistryWorks-sl.component';
import { MinistryWorksSlItemComponent } from './MinistryWorks/MinistryWorks-sl/MinistryWorks-sl-item/MinistryWorks-sl-item.component';
import { MinistryWorksItemComponent } from './MinistryWorks/MinistryWorks-item/MinistryWorks-item.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    ThingsComponent,
    ThingsSLComponent,
    ThingsItemComponent,
    ThingsSlItemComponent,
    MinistryWorksComponent,
    MinistryWorksSlComponent,
    MinistryWorksItemComponent,
    MinistryWorksSlItemComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: CustomHttpInterceptorService,
    //   multi: true,
    // },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
