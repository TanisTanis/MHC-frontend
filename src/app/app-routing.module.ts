import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotfoundComponent } from './landingpage/notfound/notfound.component';
import { ButtonsComponent } from './landingpage/header/buttons/buttons.component';
import { LoginComponent } from './landingpage/header/login/login.component';
import { HeaderComponent } from './landingpage/header/header.component';
import { RegisterComponent } from './landingpage/header/register/register.component';
import { MainpageComponent } from './landingpage/mainpage/mainpage.component';
import { UserPageComponent } from './user-page/user-page.component';

const routes: Routes = [
  { path: 'u/:id', component: UserPageComponent, outlet: 'primary' },
  {
    path: '',
    component: HeaderComponent,
    outlet: 'primary',
    children: [
      { path: '', component: ButtonsComponent, outlet: 'secondary' },
      { path: '', component: MainpageComponent, outlet: 'info' },
    ],
  },
  {
    path: 'login',
    component: HeaderComponent,
    outlet: 'primary',
    children: [
      { path: '', component: LoginComponent, outlet: 'secondary' },
      { path: '', component: MainpageComponent, outlet: 'info' },
    ],
  },
  {
    path: 'register',
    component: HeaderComponent,
    outlet: 'primary',
    children: [
      { path: '', component: RegisterComponent, outlet: 'secondary' },
      { path: '', component: MainpageComponent, outlet: 'info' },
    ],
  },
  {
    path: '**',
    component: HeaderComponent,
    outlet: 'primary',
    children: [
      { path: '', component: NotfoundComponent, outlet: 'secondary' },
      { path: '', component: MainpageComponent, outlet: 'info' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
