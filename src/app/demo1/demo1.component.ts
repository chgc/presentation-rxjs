import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { REACTIVE_FORM_DIRECTIVES, FormGroup, FormBuilder, Validators, AsyncValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';

@Component({
  moduleId: module.id,
  selector: 'app-demo1',
  templateUrl: 'demo1.component.html',
  styleUrls: ['demo1.component.css'],
  directives: [REACTIVE_FORM_DIRECTIVES]
})
export class Demo1Component implements OnInit {

  loginForm: FormGroup;
  searchForm: FormGroup;

  items = [];

  constructor(private builder: FormBuilder, private http: Http) { }

  ngOnInit() {
    console.clear();
    let button = document.querySelector('button');
    Observable.fromEvent(button, 'click')
      .subscribe(() => console.log('Clicked!'));

    this.loginForm = this.builder.group({

      login: ["", Validators.required],
      passwordRetry: this.builder.group({
        password: ["", Validators.required],
        passwordConfirmation: ["", Validators.required]
      })
    });
    /* Demo to show how FormGroup work with subscribe */
    this.loginForm.valueChanges.subscribe(
      value => console.log(value),
      err => console.error(err.message)
    );
    this.loginForm.statusChanges.subscribe(
      value => console.log('state:' + value),
      err => console.error(err.message)
    );

    /* Demo to show how ngControl work with subscribe */
    this.searchForm = this.builder.group({
      search: [""]
    });
    this.searchForm.controls['search'].valueChanges
      .debounceTime(400)
      .distinctUntilChanged()
      .flatMap((term) => {
        var url = 'https://api.spotify.com/v1/search?q=' + term + '&type=artist';
        return this.http.get(url).map(res => res.json())
          .map(data => data.artists.items);
      })
      .subscribe(
      values => {
        this.items = values;
      },
      err => console.error(err.message)
      );

  }
}
