import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { map } from 'rxjs/operator/map';

declare var Promise: any;

@Component({
  selector: 'app-demo3',
  templateUrl: 'demo3.component.html',
  styleUrls: ['demo3.component.css']
})
export class Demo3Component implements OnInit {

  constructor(private http: Http) { }

  ngOnInit() {
    console.clear();
    Observable.forkJoin(
      this.http.get('http://jsonplaceholder.typicode.com/todos').map(res => res.json()),
      this.http.get('https://jsonplaceholder.typicode.com/users').map(res => res.json())
    ).subscribe(
      data => console.log(data),
      err => console.error(err.message)
      );

    let p1 = this.http.get('http://jsonplaceholder.typicode.com/todos').map(res => res.json()).toPromise();
    let p2 = this.http.get('https://jsonplaceholder.typicode.com/users').map(res => res.json()).toPromise();

    Promise.all([p1, p2]).then(values => {
      console.log('Promise', values);
    })
  }

}
