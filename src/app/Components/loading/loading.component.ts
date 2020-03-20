import { Component, OnInit, Input, Output } from '@angular/core';
import { EventEmitter } from 'protractor';

@Component({
  selector: 'app-loading',
  template: `<div *ngIf="Loading" class="loading"></div>`
})
export class LoadingComponent {

  @Input() Loading: boolean
}
