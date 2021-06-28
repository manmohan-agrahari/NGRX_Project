import { ComponentFixture, TestBed } from '@angular/core/testing'
import {CounterComponent} from './counter.component'
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core'
import {MockStore,provideMockStore} from '@ngrx/store/testing'
import { CounterState } from './state/counter.state'
import { DECREMENT, INCREMENT, RESET } from './state/counter.actions'
describe('counter component',()=> {
  let component:CounterComponent;
  let fixture:ComponentFixture<CounterComponent>;
  let store:MockStore<CounterState>;
  const initialState = {
    counter:23,
    channelName:'demo'
  }
  beforeEach(()=> {
    TestBed.configureTestingModule({
      declarations:[CounterComponent],
      providers:[provideMockStore({initialState})],
      schemas:[CUSTOM_ELEMENTS_SCHEMA]
    })
    store=TestBed.inject(MockStore)
    fixture = TestBed.createComponent(CounterComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
    jest.spyOn(store,'dispatch').mockImplementation(()=>{})

  })
  it('should initialise counter component',()=> {
    expect(component).toBeDefined()
  })
  it('onIncrement should dispatch INCREMENT',()=>{
        component.onIncrement();
        expect(store.dispatch).toHaveBeenCalledWith(INCREMENT())
  })
  it('onDecrement should dispatch DECREMENT',()=>{
    component.onDecrement();
    expect(store.dispatch).toHaveBeenCalledWith(DECREMENT())
})
it('onReset should dispatch RESET',()=>{
  component.onReset();
  expect(store.dispatch).toHaveBeenCalledWith(RESET())
})

})
