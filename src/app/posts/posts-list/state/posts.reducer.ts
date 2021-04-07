import { createReducer, on } from '@ngrx/store'
import { addPost, deletePost,updatePost} from './posts.actions'
import { initialState } from './posts.state'

const _postsReducer = createReducer(
  initialState,
    
on(updatePost,(state,action)=>{
  const updatePosts=state.posts.map((post)=>{return post.id==action.post.id ? action.post:post})
  return {
    ...state,
    posts:updatePosts
  }}),
  on(addPost, (state, action) => {
    let post = { ...action.post }
    post.id = (state.posts.length + 1).toString()
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
    }}),  
)

export function postsReducer(state, action) {
  return _postsReducer(state, action)
}
