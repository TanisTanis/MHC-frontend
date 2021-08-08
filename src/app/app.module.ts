import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginService } from './services/login.service';
import { LoginComponent } from './landingpage/header/login/login.component';
import { NotfoundComponent } from './landingpage/notfound/notfound.component';
import { HeaderComponent } from './landingpage/header/header.component';
import { MainpageComponent } from './landingpage/mainpage/mainpage.component';
import { RegisterComponent } from './landingpage/header/register/register.component';
import { ButtonsComponent } from './landingpage/header/buttons/buttons.component';
import { FormsModule } from '@angular/forms';
import { UserPageComponent } from './user-page/user-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NotfoundComponent,
    HeaderComponent,
    MainpageComponent,
    RegisterComponent,
    ButtonsComponent,
    UserPageComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [LoginService],
  bootstrap: [AppComponent],
})
export class AppModule {}
