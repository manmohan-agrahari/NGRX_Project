import * as fromSelectors from './counter.selectors'
import { CounterState } from './counter.state'

describe('Selectors',()=>{
  it('should select counter',()=>{
    const initialState:CounterState={
      counter:111,
      channelName:'test channel'
    }
    //ngrx selector have projector method that can be used to
    //project my selector on some kind on state
    const result=fromSelectors.getCounter.projector(initialState)
    expect(result).toBe(111)
  })
  it('should select channel Name',()=>{
    const initialState:CounterState={
      counter:111,
      channelName:'test channel'
    }
    //ngrx selector have projector method that can be used to
    //project my selector on some kind on state
    const result=fromSelectors.getChannelName.projector(initialState)
    expect(result).toBe('test channel')
  })

})
