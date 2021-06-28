import { changeChannelName, customIncrement, DECREMENT, INCREMENT, RESET } from './counter.actions'
import * as fromReducer from './counter.reducer'
import * as CounterState from './counter.state'

describe('Counter Reducer', () => {
  describe('Unknown action', () => {
    it('should return  the default state', () => {
      const { initialState } = CounterState
      /* const action ={
        type:'[counter component] Decrement'
      }

      it is equivalent ==========> DECREMENT
      */
      const action = {
        type: 'unknown',
      }
      const state = fromReducer.counterReducer(initialState, action)
      expect(state.counter).toBe(0)
    })
  })

  describe('increment action', () => {
    it('should update the state by 1', () => {
      const { initialState } = CounterState
      const action = INCREMENT
      const state = fromReducer.counterReducer(initialState, action)
      expect(state.counter).toBe(1)
    })
  })
  describe('decrement action', () => {
    it('should update the state by -1', () => {
      const { initialState } = CounterState
      const action = DECREMENT
      const state = fromReducer.counterReducer(initialState, action)
      expect(state.counter).toBe(-1)
    })
  })

  describe('checking other action', () => {
    let initialState
    beforeEach(() => {
      initialState = CounterState
    })
    it('counter should be 0 on reset action', () => {
      const action = RESET
      const state = fromReducer.counterReducer(initialState, action)
      expect(state.counter).toBe(0)
    })
 it('should be increased by 10 on customIncrementAction by 10',()=>{
     let value=2
      const action = customIncrement({count:+value})
      const state = fromReducer.counterReducer(initialState, action)
      expect(state.counter).toBe(10)
    })

     it('should change channel name on changeChannelName Action',()=>{
       const action = changeChannelName;
       const state =fromReducer.counterReducer(initialState,action)
       expect(state.channelName).toBe("channel 2")
     })

  })
})
