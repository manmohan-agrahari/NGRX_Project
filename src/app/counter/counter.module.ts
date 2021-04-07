import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { RouterModule, Routes } from '@angular/router'
import { StoreModule } from '@ngrx/store'
import { CustomCounterInputComponent } from '../custom-counter-input/custom-counter-input.component'
import { counterReducer } from '../state/counter.reducer'
import { CounterComponent } from './counter.component'

const routes: Routes = [{ path:'', component: CounterComponent }]
@NgModule({
    declarations:[CounterComponent,CustomCounterInputComponent],
    imports:[CommonModule,RouterModule.forChild(routes),FormsModule,StoreModule.forFeature('counter',counterReducer)],
    exports:[]
})
export class CounterModule {}
