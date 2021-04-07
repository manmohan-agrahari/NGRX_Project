import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { changeChannelName, customIncrement } from '../state/counter.actions';
import { getChannelName } from '../state/counter.selectors';
import { CounterState } from '../state/counter.state';

@Component({
  selector: 'app-custom-counter-input',
  templateUrl: './custom-counter-input.component.html',
  styleUrls: ['./custom-counter-input.component.scss']
})
export class CustomCounterInputComponent implements OnInit {

  value:number;
  channelName:string;
  cn$:Observable<string>;

  constructor(private store:Store<{counter:CounterState}>){}

  ngOnInit(): void {
    /*this.store.select('counter').subscribe((data) =>{
      console.log("channel name observable called")
      this.channelName=data.channelName})*/

     /* this.store.select(getChannelName).subscribe((data) =>{
        console.log("channel name observable called")
        this.channelName=data})*/
        this.cn$=this.store.select(getChannelName)
  }
  onAdd() {
    this.store.dispatch(customIncrement({count:+this.value}))
  }
  onChangeText() {
    this.store.dispatch(changeChannelName())
  }
}
