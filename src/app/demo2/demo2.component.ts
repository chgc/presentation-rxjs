import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';

@Component({
  moduleId: module.id,
  selector: 'app-demo2',
  templateUrl: 'demo2.component.html',
  styleUrls: ['demo2.component.css']
})
export class Demo2Component implements OnInit {

  items: Array<any> = [];

  constructor(private http: Http) { }

  getAsyncData() {
    return this.http.get('http://jsonplaceholder.typicode.com/todos')
      .flatMap(res => {
        return Observable.from(res.json())
      });
    // 
    // {
    //   "userId": 1,
    //   "id": 1,
    //   "title": "delectus aut autem",
    //   "completed": false
    // }
  }

  ngOnInit() {
    console.clear();

    // const subscriptionA = source
    //   .filter((todo: any) => todo.completed == true)
    //   .map((todo: any) => todo.title)
    //   .forEach(title => console.log(`Completed Todo: ${title}`));

    // console.log("=======Observable Below========");

    this.getAsyncData()
      .filter((todo: any) => todo.completed == true)
      .toArray()
      .subscribe(
      data => console.log(data),
      err => console.error(err.message)
      );
  }

}
