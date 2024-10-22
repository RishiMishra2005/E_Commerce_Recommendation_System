import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, from, fromEvent, map, merge, of, take } from 'rxjs';

@Component({
  selector: 'app-obs-and-operators',
  standalone: true,
  imports: [],
  templateUrl: './obs-and-operators.component.html',
  styleUrl: './obs-and-operators.component.scss'
})
export class ObsAndOperatorsComponent implements OnInit,OnDestroy  {
  sub!: Subscription;

  observe = new Observable((obs) => {
    console.log('Observable Starts');
    setTimeout(() => {
      obs.next('Discounts');
    }, 1000);
    setTimeout(() => {
      obs.next('Sale up to 50%');
    }, 2000);
    setTimeout(() => {
      obs.next('Friday offers3');
    }, 3000);
    setTimeout(() => {
      obs.complete();
    }, 4000);
  });

  ngOnInit(): void {
    this.sub = this.observe.subscribe({
      next: (value) => {
        console.log(value);
      },
      error: (err) => {
        console.log(err);
        console.log('Error');
      },
      complete: () => {
        console.log('Completed !');
      },
    });



    // from([2,5,8,9]).subscribe(data=>{console.log(data)})
    // of(5,8,10,16).subscribe(data=>{console.log(data)})
    // of([5,8,10,16]).subscribe(data=>{console.log(data)})


    // let obs=of("Hello World");

    // obs.pipe(map(data=>data.toUpperCase())).subscribe(data=>{console.log(data)})
    // obs.pipe(map(data=>data.toUpperCase().includes('E'))).subscribe(data=>{console.log(data)})

    // const obs1=fromEvent(document,'click');
    // obs1.subscribe(()=>
    // console.log("You clicked document")

  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    console.log('Obs Unsubscribe');
  }
}
