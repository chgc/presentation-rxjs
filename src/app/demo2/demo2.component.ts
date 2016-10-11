import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';

@Component({
  selector: 'app-demo2',
  templateUrl: 'demo2.component.html',
  styleUrls: ['demo2.component.css']
})
export class Demo2Component implements OnInit {

  items: Array<any> = [];

  constructor(private http: Http) { }

  getAsyncData(): Observable<any> {
    return this.http.get('http://jsonplaceholder.typicode.com/todos');
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

    /* Simple Way */
    this.getAsyncData()
      .map(res => res.json())
      .map(data => {
        return data.filter(todo => todo.completed == true)
      })
      .subscribe(
      data => console.log('simple way:' , data),
      err => console.error(err.message)
      );
    /* More Complex way */
    this.getAsyncData()
      .flatMap(res => {
        return Observable.from(res.json());
      })
      .filter((todo: any) => {
        return todo.completed == true
      })
      .toArray()
      .subscribe(
      data => console.log('complex way:' , data),
      err => console.error(err.message)
      );
  }

}
