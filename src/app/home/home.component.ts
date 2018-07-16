import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Observer, Subscription, interval } from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  generateNumbersSubscription: Subscription;
  customSubscription: Subscription;

  constructor() { }

  ngOnInit() {
    const generateNumbers = interval(1000).pipe(map((n:number)=>n*2));
    this.generateNumbersSubscription = generateNumbers.subscribe(number =>{
      console.log(number);
    });

    const myObservable = Observable.create((observer: Observer<string>)=>{
      setTimeout(()=>{
        observer.next('SUCCESS');
      },2000);

      setTimeout(()=>{
        observer.next('SUCCESS');
      },5000);
    });

    this.customSubscription = myObservable.subscribe(data => console.log({status: data}), error=>console.log({error: error}));
  }

  ngOnDestroy(): void {
    this.generateNumbersSubscription.unsubscribe();
    this.customSubscription.unsubscribe();
  }

}
