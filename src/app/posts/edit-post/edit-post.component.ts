import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/models/posts.model';
import { AppState } from 'src/app/state1/app.state';
import { updatePost } from '../posts-list/state/posts.actions';
import { getPostById } from '../posts-list/state/posts.selector';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})
export class EditPostComponent implements OnInit,OnDestroy {

  post:Post;
  postForm:FormGroup;
  postSubscription:Subscription;
  constructor(private route:ActivatedRoute,private store:Store<AppState>) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params=>{
      const id=params.get('id');
      this.postSubscription=this.store.select(getPostById,{id}).subscribe((data)=>{
        this.post=data;
        console.log(this.post)
        this.createForm()

      })
    })
  }
  createForm(){
    this.postForm=new FormGroup(({
      title:new FormControl(this.post.title,[Validators.required,Validators.minLength(6)]),
      description:new FormControl(this.post.description,[Validators.required,Validators.minLength(10)])

    }))

  }
  onSubmit(){
    if(!this.postForm.valid) { 
      return;
    }
   
    const title=this.postForm.value.title;
    const description=this.postForm.value.description;
    const post:Post={
      id:this.post.id,
      title,description,
      

    }
    this.store.dispatch(updatePost({post}))

    //dispatch an action

  }
  ngOnDestroy(){
    if(this.postSubscription)
    {
      this.postSubscription.unsubscribe()
    }
  }

}
