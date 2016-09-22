import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';

@Component({
  selector: 'app-demo5',
  templateUrl: 'demo5.component.html',
  styleUrls: ['demo5.component.css']
})
export class Demo5Component implements OnInit, OnDestroy {

  constructor( private route: ActivatedRoute) { }
  queryId: any;
  sub: Subscription;

  ngOnInit() {
    console.log('component init');
    this.sub = this.route.params.subscribe(params => {
      console.log(params['id']);
      this.queryId = params['id'];
    })
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
