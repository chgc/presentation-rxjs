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
    this.sub1.unsubscribe();
  }

  getAsyncData() {
    const observable$ = this.http.get('http://jsonplaceholder.typicode.com/todos')
      .map(res => res.json()).share();
    
    observable$.subscribe(() => {
      console.info('log from getAsyncData');
    });

    return observable$;
  }

  sub1: Subscription;
  getData() {
    this.sub1 = this.getAsyncData().subscribe(
      data => console.log('action1'),
      err => console.error(err.message)
    );
  }
}
