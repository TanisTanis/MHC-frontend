import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss'],
})
export class UserPageComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  id: number;

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.userService.getUserData(this.id).subscribe((res) => {
      console.log(res);
    });
  }

  openNav() {
    const navBar = <HTMLElement>document.getElementById('mySidenav');
    navBar.style.width = '250px';
    const mainPage = <HTMLElement>document.getElementById('main');
    mainPage.style.marginLeft = '250px';
  }

  closeNav() {
    const navBar = <HTMLElement>document.getElementById('mySidenav');
    navBar.style.width = '0px';
    const mainPage = <HTMLElement>document.getElementById('main');
    mainPage.style.marginLeft = '0px';
  }
}
