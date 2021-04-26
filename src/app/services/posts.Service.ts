import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { Post } from '../models/posts.model'

@Injectable({ providedIn: 'root' })
export class PostsService {
  constructor(private http: HttpClient) {}

  getPosts(): Observable<Post[]> {
    return this.http
      .get<Post[]>(
        `https://auth-development-768f3-default-rtdb.firebaseio.com//Posts.json`,
      )
      .pipe(
        map((data) => {
          const posts: Post[] = []
          for (let key in data) {
            posts.push({ ...data[key], id: key })
          }
          return posts
        }),
      )
  }

  addPost(post: Post) {
   const postData={
     title:post.title,
     description:post.description

   }
    return this.http.post(
      `https://auth-development-768f3-default-rtdb.firebaseio.com//Posts.json`,
      postData,
    )
  }
  updatePost(post: Post) {
    const postData={
      [post.id]:{title:post.title, description:post.description},
    };
    return this.http.patch(
      `https://auth-development-768f3-default-rtdb.firebaseio.com//Posts.json`,
      postData
    )
  }
}
