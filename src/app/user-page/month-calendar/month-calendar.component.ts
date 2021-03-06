import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-month-calendar',
  templateUrl: './month-calendar.component.html',
  styleUrls: ['./month-calendar.component.scss'],
})
export class MonthCalendarComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  viewDate: Date = new Date();
  month: number = new Date().getMonth();
}
