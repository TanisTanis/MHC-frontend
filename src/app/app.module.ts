import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import { LoginService } from './services/login.service';

import { AppComponent } from './app.component';
import { LoginComponent } from './landingpage/header/login/login.component';
import { NotfoundComponent } from './landingpage/notfound/notfound.component';
import { HeaderComponent } from './landingpage/header/header.component';
import { MainpageComponent } from './landingpage/mainpage/mainpage.component';
import { RegisterComponent } from './landingpage/header/register/register.component';
import { ButtonsComponent } from './landingpage/header/buttons/buttons.component';
import { MainUserPageComponent } from './user-page/main-user-page/main-user-page.component';
import { MonthCalendarComponent } from './user-page/month-calendar/month-calendar.component';
import { TodayViewComponent } from './user-page/today-view/today-view.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NotfoundComponent,
    HeaderComponent,
    MainpageComponent,
    RegisterComponent,
    ButtonsComponent,
    MainUserPageComponent,
    MonthCalendarComponent,
    TodayViewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
  providers: [LoginService],
  bootstrap: [AppComponent],
})
export class AppModule {}
