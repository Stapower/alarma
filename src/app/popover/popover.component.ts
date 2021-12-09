import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PopoverController } from "@ionic/angular";

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {

  @Input() user;
  @Output() userSelected = new EventEmitter();

  constructor( private popover: PopoverController) { }

  ngOnInit() {


  }

}
