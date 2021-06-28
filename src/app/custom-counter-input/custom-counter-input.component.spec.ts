import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { customIncrement } from '../counter/state/counter.actions';
import { getCounter } from '../counter/state/counter.selectors';
import { CounterState } from '../counter/state/counter.state';

import { CustomCounterInputComponent } from './custom-counter-input.component';

describe('CustomCounterInputComponent', () => {
  let component: CustomCounterInputComponent;
  let fixture: ComponentFixture<CustomCounterInputComponent>;
  let store: MockStore<CounterState>;
  let inputElement:DebugElement;
  const initialState = {
    counter:22,
    channelName:"first"
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomCounterInputComponent ],
      imports: [FormsModule],
      providers:[provideMockStore({initialState})],
      schemas:[CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    store=TestBed.inject(MockStore)
    fixture = TestBed.createComponent(CustomCounterInputComponent);
    component = fixture.componentInstance;
    inputElement = fixture.debugElement
    fixture.detectChanges();
    jest.spyOn(store, 'dispatch').mockImplementation()
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('onAdd call custom increment',() => {
    component.value=82
    component.onAdd()
    expect(store.dispatch).toHaveBeenCalledWith(customIncrement({count:component.value}))
  })
  it('check input field',()=>{
    inputElement= inputElement.query(By.css('#custom'))
    console.log(inputElement)
  })
});
