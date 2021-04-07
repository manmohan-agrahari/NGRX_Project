import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RouterModule, Routes } from '@angular/router'
import { StoreModule } from '@ngrx/store'
import { AddPostComponent } from './add-post/add-post.component'
import { EditPostComponent } from './edit-post/edit-post.component'
import { PostsListComponent } from './posts-list/posts-list.component'
import { postsReducer } from './posts-list/state/posts.reducer'

const routes: Routes = [
  {
    path: '',
    component: PostsListComponent,
    children: [
      { path: 'edit/:id', component: EditPostComponent },
      { path: 'add', component: AddPostComponent },
    ],
  },
]
@NgModule({
  declarations: [AddPostComponent, EditPostComponent, PostsListComponent],
  imports: [CommonModule, RouterModule.forChild(routes),ReactiveFormsModule,
StoreModule.forFeature('posts',postsReducer)],
})
export class PostsModule {}
