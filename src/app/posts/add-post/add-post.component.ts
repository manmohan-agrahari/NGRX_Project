import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Post } from 'src/app/models/posts.model';
import { AppState } from 'src/app/state1/app.state';
import {addPost} from '../posts-list/state/posts.actions'


@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit {
  postForm: FormGroup;
  constructor(private store:Store<AppState>) { }

  ngOnInit(): void {
    this.postForm=new FormGroup({
      title: new FormControl(null,
        [
          Validators.required,
          Validators.minLength(6),

        ]),
      description:new FormControl(null,[
        Validators.required,
        Validators.minLength(10)

      ])
      

    })
  }

  showDescriptionError()
  {
    if(this.postForm.get('description').touched && !this.postForm.get('description').valid) {
      if(this.postForm.get('description').errors.required) {
        return "Description is mandatory"
      }
      if(this.postForm.get('description').errors.minlength){
        return "minlength invalid...."
      }
    }

  }
  
  onAddPost() {
    const post:Post={
      title:this.postForm.value.title,
      description:this.postForm.value.description
    }
    console.log("manmohan"+post)
    this.store.dispatch(addPost({post}))
  }


}
