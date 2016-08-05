import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';

@Component({
  moduleId: module.id,
  selector: 'app-demo1',
  templateUrl: 'demo1.component.html',
  styleUrls: ['demo1.component.css']
})
export class Demo1Component implements OnInit {

  constructor() { }

  ngOnInit() {
    console.clear();
    let button = document.querySelector('button');
    Observable.fromEvent(button, 'click')
      .subscribe(() => console.log('Clicked!'));
  }





}
