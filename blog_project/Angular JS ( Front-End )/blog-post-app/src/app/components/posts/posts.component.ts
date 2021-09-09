import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GetAllBlogPostsService } from 'src/app/shared/services/get-all-blog-posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit, OnDestroy {
  public posts: any = [];
  sub!: Subscription;
  constructor(private _getAllBlogPostsService: GetAllBlogPostsService) {}

  ngOnInit(): void {
    this.sub = this._getAllBlogPostsService.getPosts()
                                            .subscribe({
                                              next: (data) => (this.posts = data),
                                              error: (err) => console.log(err.message),
                                            });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
