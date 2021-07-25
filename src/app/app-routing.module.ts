import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotfoundComponent } from './landingpage/notfound/notfound.component';
import { ButtonsComponent } from './landingpage/header/buttons/buttons.component';
import { LoginComponent } from './landingpage/header/login/login.component';
import { HeaderComponent } from './landingpage/header/header.component';
import { RegisterComponent } from './landingpage/header/register/register.component';
import { MainpageComponent } from './landingpage/mainpage/mainpage.component';

const routes: Routes = [
  {path: '', component: MainpageComponent, outlet: 'info'},
  {path: '', component: HeaderComponent, outlet: "primary", children: [
    {path: '', component: ButtonsComponent, outlet: "secondary"},
  ]},
  {path: 'login', component: HeaderComponent, outlet: "primary", children: [
    {path: '', component: LoginComponent, outlet: "secondary"}
  ]},
  {path: 'register', component: HeaderComponent, outlet: "primary", children: [
    {path: '', component: RegisterComponent, outlet: "secondary"}
  ]},
  {path: '**', component: HeaderComponent, outlet: "primary", children: [
    {path: '', component: NotfoundComponent, outlet: "secondary"}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
