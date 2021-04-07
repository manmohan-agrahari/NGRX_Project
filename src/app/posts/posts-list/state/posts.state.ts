import { Post } from "src/app/models/posts.model";

export interface PostsState {
    posts:Post[]
}
export const initialState:PostsState={
    posts:[
        { id:'1', title:'title1', description:'description 1'},
        {id :'2', title:'title2',description:'description 2'}
    ]
}
