import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FormGroup, FormControl, FormBuilder, Validators, AsyncValidatorFn } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';

@Component({
  selector: 'app-demo1',
  templateUrl: 'demo1.component.html',
  styleUrls: ['demo1.component.css']
})
export class Demo1Component implements OnInit {

  loginForm: FormGroup;
  searchForm: FormGroup;

  items: any[] = [];

  constructor(private builder: FormBuilder, private http: Http) { }

  ngOnInit() {
    console.clear();
    let button = document.querySelector('button');
    Observable.fromEvent(button, 'click')
      .subscribe(() => console.log('Clicked!'));

    
    /* Demo to show how FormGroup work with subscribe */
    let password = new FormControl('', Validators.required);
    let passwordConfirmation = new FormControl('', [Validators.required, CustomValidators.equalTo(password)]);
    this.loginForm = this.builder.group({

      login: ["", Validators.required],
      passwordRetry: this.builder.group({
        password: password,
        passwordConfirmation: passwordConfirmation
      })
    });
    
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
        if (!term) return Observable.of([]);
        var url = 'https://api.spotify.com/v1/search?q=' + term + '&type=artist';
        return this.http.get(url).map(res => res.json())
          .map(data => data.artists.items);
      })
      .subscribe(
      (values: any[]) => {
        this.items = values;
      },
      err => console.error(err.message)
      );

  }
}
