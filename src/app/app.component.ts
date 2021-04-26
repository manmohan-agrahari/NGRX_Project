import { CompileShallowModuleMetadata } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { autoLogin} from './auth/state/auth.actions';
import { setLoadingSpinner } from './shared/shared.actions';
import { getErrorMessage, getLoading } from './shared/shared.selector';
import { SharedState } from './shared/shared.state';
import { AppState } from './store/app.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'counter-ngrx';
  showLoading:Observable<boolean>;
  errorMessage:Observable<string>;
  constructor(private store:Store<AppState>){}

  ngOnInit(){
    this.showLoading = this.store.select(getLoading);
    this.errorMessage=this.store.select(getErrorMessage);
    this.store.dispatch(autoLogin())
  }

}
