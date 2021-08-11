import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-today-view',
  templateUrl: './today-view.component.html',
  styleUrls: ['./today-view.component.scss'],
})
export class TodayViewComponent implements OnInit {
  constructor() {}

  @Input() email: String;

  currentDate: moment.Moment;
  dayTitle: string;
  buttonIds: string[] = ['btn_bad', 'btn_ng', 'btn_med', 'btn_gd', 'btn_gre'];
  buttonColors: string[] = [
    '#8b0000',
    '#FF7F50',
    '#FF8C00',
    '#90EE90',
    '#00FF7F',
  ];

  ngOnInit(): void {
    this.currentDate = moment(new Date());
    this.dayTitle = this.currentDate.format('MMMM Do YYYY');
  }

  feelingClick(buttonId: string) {
    const color = this.buttonColors[this.buttonIds.indexOf(buttonId)];
    for (let btn of this.buttonIds) {
      if (btn !== buttonId) {
        let button: HTMLButtonElement = <HTMLButtonElement>(
          document.getElementById(btn)
        );
        button.style.backgroundColor = '#909090';
      } else {
        let button: HTMLButtonElement = <HTMLButtonElement>(
          document.getElementById(buttonId)
        );
        button.style.backgroundColor = color;
      }
    }
  }

  autoExpand(e: KeyboardEvent) {
    console.log(e);
    const textArea = <HTMLTextAreaElement>(
      document.getElementById('day_entry_text_area')
    );
    textArea.style.height = textArea.scrollHeight + 'px';
  }

  completed: boolean = false;
}
