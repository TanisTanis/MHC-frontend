import { Component, ElementRef, OnInit } from '@angular/core';
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
    private userService: UserService,
    private elementRef: ElementRef
  ) {}

  id: number;
  email: string;
  page: string = 'home';
  backgroundColors: { [key: string]: string; } = {
    // home: '#f0f8ff',
    home: '#bfc1c2',
    today: '#f8f8ff',
    calendar: '#fff5ee',
    data: '#f0fff0',
    settings: '#f8f4ff'
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = this.backgroundColors['home'];
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
    console.log(page);
    this.page = page;
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = this.backgroundColors[page];
  }
}
