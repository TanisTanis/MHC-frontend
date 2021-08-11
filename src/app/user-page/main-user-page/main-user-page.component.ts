import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './main-user-page.component.html',
  styleUrls: ['./main-user-page.component.scss'],
})
export class MainUserPageComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  id: number;
  email: string;
  page: string;

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.userService.getUserData(this.id).subscribe((res) => {
      console.log(res);
    });
  }

  openNav(): void {
    const navBar = <HTMLElement>document.getElementById('mySidenav');
    navBar.style.width = '250px';
    const mainPage = <HTMLElement>document.getElementById('main');
    mainPage.style.marginLeft = '250px';
  }

  closeNav(): void {
    const navBar = <HTMLElement>document.getElementById('mySidenav');
    navBar.style.width = '0px';
    const mainPage = <HTMLElement>document.getElementById('main');
    mainPage.style.marginLeft = '0px';
  }

  navigation(page: string): void {
    this.page = page;
  }
}
