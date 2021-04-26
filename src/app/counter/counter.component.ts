import { Component, OnDestroy, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable, Subscription } from 'rxjs'
import { INCREMENT, DECREMENT, RESET } from './state/counter.actions'
import { getCounter } from './state/counter.selectors'
import { CounterState } from './state/counter.state'
import { AppState } from '../store/app.state'
import { PostsState } from '../posts/posts-list/state/posts.state'

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss'],
})
export class CounterComponent implements OnInit, OnDestroy {
  c: number
  // c$:Observable<{counter:number}>
  counterSubscription: Subscription
//inject the store inside constructor
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    /*  this.counterSubscription =this.store.select('counter').subscribe((data)=>
   { console.log("counter observable called")
     this.c=data.counter})
 // this.c$=this.store.select('counter')
 */
    this.counterSubscription = this.store
      .select(getCounter)
      .subscribe((data) => {
        console.log('counter observable called')
        this.c = data
      })
    // this.c$=this.store.select('counter')
  }

  onIncrement() {
    return this.store.dispatch(INCREMENT())
  }

  onDecrement() {
    return this.store.dispatch(DECREMENT())
  }

  onReset() {
    return this.store.dispatch(RESET())
  }
  ngOnDestroy() {
    if (this.counterSubscription) {
      this.counterSubscription.unsubscribe()
    }
  }
}
