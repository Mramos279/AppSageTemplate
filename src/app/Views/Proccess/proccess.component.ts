import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-proccess',
  templateUrl: './proccess.component.html',
  styles: []
})
export class ProccessComponent implements OnInit {

  @Input() Loading:boolean = false;

  constructor() { }

  ngOnInit() {
  }

}
