import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBlogPostComponent } from './components/add-blog-post/add-blog-post.component';
import { BlogPostDetailsComponent } from './components/blog-post-details/blog-post-details.component';
import { PostsComponent } from './components/posts/posts.component';

const routes: Routes = [
  { path : '', component : PostsComponent },
  { path : 'blogPost/:id', component : BlogPostDetailsComponent },
  { path : 'addBlogPost', component : AddBlogPostComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
