import { Component, OnInit, OnDestroy } from '@angular/core';
import { Http } from '@angular/http';
import { Observable, Subscription } from 'rxjs/Rx';
import 'rxjs/Rx';

@Component({
  selector: 'app-demo4',
  templateUrl: 'demo4.component.html',
  styleUrls: ['demo4.component.css']
})
export class Demo4Component implements OnInit, OnDestroy {

  constructor(private http: Http) { }
  ngOnInit() {
    console.clear();
  }

  ngOnDestroy() {
  }

  cancelRequest() {
    var observable = this.http.get('http://jsonplaceholder.typicode.com/todos');

    var subscription = observable.subscribe(res => {
      console.log('The response is received.');
    });

    setTimeout(() => {
      subscription.unsubscribe();
    }, 50);
  }
}
