import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostsComponent } from './components/posts/posts.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { GetAllBlogPostsService } from './shared/services/get-all-blog-posts.service';
import { BlogPostDetailsComponent } from './components/blog-post-details/blog-post-details.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AddBlogPostComponent } from './components/add-blog-post/add-blog-post.component';

@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    HeaderComponent,
    FooterComponent,
    BlogPostDetailsComponent,
    AddBlogPostComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [GetAllBlogPostsService],
  bootstrap: [AppComponent],
})
export class AppModule {}
