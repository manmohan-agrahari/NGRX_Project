import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { Store } from '@ngrx/store'
import { map, mergeMap } from 'rxjs/operators'
import { addPost, addPostSuccess } from 'src/app/auth/state/auth.actions'
import { PostsService } from 'src/app/services/posts.Service'
import { AppState } from 'src/app/store/app.state'
import { loadPosts, loadPostsSuccess, updatePost, updatePostSuccess } from './posts.actions'

@Injectable()
export class PostsEffects {
  constructor(private actions$: Actions, private postsService: PostsService,store:Store<AppState>) {}
  loadPosts$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(loadPosts),
        mergeMap((action) => {
          return this.postsService.getPosts().pipe(
            map((posts) => {
              console.log(posts)
              return loadPostsSuccess({ posts});

            }),
          )
        }),
      )
    },

  )
  updatePost$=createEffect(
    ()=> {
      return this.actions$.pipe (
          ofType(updatePost),
          mergeMap((action)=>{
            return this.postsService.updatePost(action.post).pipe(
              map((data)=>{
              return  updatePostSuccess({post:action.post})

              }))
          })

  )})

  addPost$=createEffect(
    ()=> {
      return this.actions$.pipe (
          ofType(addPost),
          mergeMap((action)=>{
            return this.postsService.addPost(action.post).pipe(
              map((data)=>{
                console.log(data)

              }))
          })

  )},{dispatch:false})

}
