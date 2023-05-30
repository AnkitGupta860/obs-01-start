import { Component, OnDestroy, OnInit } from '@angular/core';
import {  Subscription, interval} from 'rxjs';
import { Observable } from 'rxjs-compat';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  private firstObsUnsubscribe : Subscription;

  constructor() { }
  
  ngOnInit() {
    // this.firstObsUnsubscribe = interval(1000).subscribe(count => {
      // console.log(count);
    // });

    const customObesrvable = Observable.create((observer: {
      [x: string]: any; next: (arg0: number) => void; console: { error: (arg0: string) => void; }; 
}) => {
      let count = 0;
      setInterval( () => {
        observer.next(count);
        count++;
        if(count==2){
          observer.complete();
        }
        if(count>3)
        {
          observer.error("Count is greater than 3!");
          
        }
      },1000);
    })

    this.firstObsUnsubscribe = customObesrvable.subscribe((value: any) => {
      console.log(value);
    },
          error => {
        console.log(error);
        alert(error.message);
      }
    );

  }
  
  ngOnDestroy(): void {
    this.firstObsUnsubscribe.unsubscribe();
  }
}
