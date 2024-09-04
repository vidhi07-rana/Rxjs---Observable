import { Component, DestroyRef, effect, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { interval, map, Observable, take } from 'rxjs';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent  implements OnInit{
  clickCount = signal(0);
  //create the observable 
  clickCount$ = toObservable(this.clickCount)
  private destrotRef = inject(DestroyRef)
  interval$ =interval(1000).pipe(take(10));
  intervalSignal = toSignal(this.interval$, {initialValue:0, manualCleanup: true} )

  //creating observable from scratch

  customInterval$ = new Observable((subcriber)=>{
let timeExecuted = 0;
      // subcriber.error();

    let interval = setInterval(()=>{
      // subcriber.error();
      if(timeExecuted > 3){
        clearInterval(interval)

        subcriber.complete();
        // subcriber.error();

        return;
      }
  console.log("Emitting new Value....")
  subcriber.next({message: 'new Value'});
timeExecuted++;
},2000)
  });

  constructor(){
    // effect(()=>{
    //   console.log(`Clicked buttton ${this.clickCount()} 'times.`)
    // })

    // toObservable(this.clickCount)
  }
  ngOnInit() {

  //  const subscription= interval(1000).pipe(take(4)
  // ,map((val)=> val * 2)
  // ).subscribe({//subscribe methods takes the observable 
  //     next:(val)=>    console.log(val),
      
  //   })
  //   this.destrotRef.onDestroy(()=>{

  //   })
  // const subscription=this.clickCount$.subscribe({
  //   next:(val)=>console.log(`clicked button ${this.clickCount()}'times`)
  // });

  // this.destrotRef.onDestroy((()=>{
  //   subscription.unsubscribe();
  // }))
  this.customInterval$.subscribe({
    next:(val)=>console.log(val),
    complete:()=>console.log('COPLETED!'),
    error:(err)=>console.log(err)
  })


  }
  onClick(){
this.clickCount.update((preCount)=> preCount + 1)
  }

}
