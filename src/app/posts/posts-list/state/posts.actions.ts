import { createAction, props } from '@ngrx/store'
import { Post } from 'src/app/models/posts.model'

export const LOAD_POSTS = '[posts page] load posts'
export const ADD_POST_ACTION = '[posts page] add post'
export const UPDATE_POST_ACTION = '[posts page] update post'
export const DELETE_POST_ACTION = '[delete page] Delete posts'
export const ADD_POST_SUCCESS = '[posts page] success post'
export const LOAD_POSTS_SUCCESS = '[posts page] load post'
export const UPDATE_POST_SUCCESS= '[edit page] update post success'



export const updatePostSuccess = createAction(
  UPDATE_POST_SUCCESS,
  props<{ post: Post }>(),
)

export const updatePost = createAction(
  UPDATE_POST_ACTION,
  props<{ post: Post }>(),
)
export const deletePost = createAction(
  DELETE_POST_ACTION,
  props<{ id: string }>(),
)
export const addPost = createAction(ADD_POST_ACTION, props<{post }>())
export const addPostSuccess = createAction(ADD_POST_SUCCESS, props<{ post }>())
export const loadPosts = createAction(LOAD_POSTS)
export const loadPostsSuccess = createAction(
  LOAD_POSTS_SUCCESS,
  props<{ posts: Post[] }>(),
)
