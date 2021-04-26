import { createReducer, on } from '@ngrx/store'
import { addPostSuccess, deletePost,loadPostsSuccess,updatePost, updatePostSuccess} from './posts.actions'
import { initialState } from './posts.state'

const _postsReducer = createReducer(
  initialState,

on(updatePostSuccess,(state,action)=>{
  const updatePosts=state.posts.map((post)=>{return post.id==action.post.id ? action.post:post})
  return {
    ...state,
    posts:updatePosts
  }}),
  on(addPostSuccess, (state, action) => {
    let post = { ...action.post }
    return {
      ...state,
      posts: [...state.posts, post],
    }
  }),

  on(deletePost,(state,action)=>{
    const updatePosts=state.posts.filter((post)=>{return post.id!==action.id})
    return {
      ...state,
      posts:updatePosts
    }
  }),



on(loadPostsSuccess,(state,action)=>{
  return {
    ...state,
    posts:action.posts
  }}),)

export function postsReducer(state, action) {
  return _postsReducer(state, action)
}
