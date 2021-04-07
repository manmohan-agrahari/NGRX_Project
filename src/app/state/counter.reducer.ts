import { createReducer, on } from '@ngrx/store'
import { Action } from 'rxjs/internal/scheduler/Action'
import { INCREMENT, DECREMENT, RESET, customIncrement, changeChannelName } from './counter.actions'
import { initialState } from './counter.state'

const _counterReducer = createReducer(
  initialState,
  on(INCREMENT, (state) => {
    return {
      ...state,
      counter: state.counter + 1,
    }
  }),
  on(DECREMENT, (state) => {
    return {
      ...state,
      counter: state.counter - 1,
    }
  }),
  on(RESET, (state) => {
    return {
      ...state,
      counter:0
    }
  }),
  on(customIncrement, (state,action) => {
    return {
      ...state,
      counter:action.count+state.counter
    }
  }),
  on(changeChannelName,(state,action)=>{
    return {
      ...state,
      channelName:"ruby web"
    }
  })
)

export function counterReducer(state,action) {
    return _counterReducer(state,action)
}

