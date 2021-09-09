import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DeleteBlogPostService } from 'src/app/shared/services/delete-blog-post.service';
import { GetBlogPostDetailsService } from 'src/app/shared/services/get-blog-post-details.service';
import { LikeBlogPostService } from 'src/app/shared/services/like-blog-post.service';
import { UpdateBlogPostDetailsService } from 'src/app/shared/services/update-blog-post-details.service';

@Component({
  selector: 'app-blog-post-details',
  templateUrl: './blog-post-details.component.html',
  styleUrls: ['./blog-post-details.component.css'],
})
export class BlogPostDetailsComponent implements OnInit, OnDestroy {
  enableForm = false;
  id: any;
  Likes!: number;
  sub!: Subscription;

  showAlert = false;
  alertClass = '';
  alertMessage = '';
  alertBoldMessage = '';

  public postDetails: any = [];

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private _getBlogPostDetails: GetBlogPostDetailsService,
    private router: Router,
    private _updateBlogPostDetails: UpdateBlogPostDetailsService,
    private _deleteBlogPost: DeleteBlogPostService,
    private _likeBlogPost : LikeBlogPostService
  ) {}

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {

    // operation for getting all post details and showing on UI
    this.activatedRoute.paramMap.subscribe((params) => {
      this.id = params.get('id');

      this.sub = this._getBlogPostDetails
                      .getPostDetails(this.id)
                      .subscribe((data) => {
                        this.postDetails = data;

                        if (this.postDetails.length > 0) {
                          this.editBlogPostForm.patchValue({
                            title: this.postDetails[0].Title,
                            category: this.postDetails[0].Category,
                            description: this.postDetails[0].Description,
                          });
                          this.Likes = this.postDetails[0].Likes;
                        } else {
                          this.showAlert = true;
                          this.alertClass = 'alert-danger';
                          this.alertBoldMessage = 'Failed !';
                          this.alertMessage = 'Blog post not found.';

                          setTimeout(() => {
                            this.router.navigate(['/']);
                          }, 3000);
                        }
                      });
    });
  }

  editBlogPostForm = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength(150)]],
    category: ['', [Validators.required, Validators.maxLength(150)]],
    description: ['', [Validators.required]],
  });


// function for updating blog post details
  editForm() {
    const body = {
      "title" : this.editBlogPostForm.get('title')?.value,
      "category" : this.editBlogPostForm.get('category')?.value,
      "description" : this.editBlogPostForm.get('description')?.value,
    }
    this._updateBlogPostDetails
        .editBlogPostDetails(+this.id, body)
        .subscribe(
          {
            next : () => {
              this.enableForm = false;
              this.showAlert = true;
              this.alertBoldMessage = 'Success';
              this.alertMessage = "Blog post updated successfully.";
              this.alertClass = 'alert-success';
            },
            error : () => {
              this.showAlert = true;
              this.alertBoldMessage = 'Failed';
              this.alertMessage = 'Error in saving data.';
              this.alertClass = 'alert-danger';
            }
          }
        );
      setTimeout(() => {
        this.showAlert = false;
      }, 3500);
  }


// function for deleting blog post
  deleteBlogPost() {
    this.sub = this._deleteBlogPost.deleteBlogPost(+this.id).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.showAlert = true;
        this.alertClass = 'alert-danger';
        this.alertBoldMessage = 'Failed !';
        this.alertMessage = err.message;
      },
    });
  }


// function for liking blog post
  likeBlogPost() {
    let body = {
      "likes" : this.Likes + 1
    }

    this._likeBlogPost.likeBlogPost(this.id, body).subscribe({
      next : () => {
        this.Likes += 1;
        this.showAlert = true;
        this.alertClass = 'alert-success';
        this.alertBoldMessage = 'Hooray';
        this.alertMessage = 'You liked the blog post';
      },
      error : (err) => {
        this.showAlert = true;
        this.alertClass = 'alert-danger';
        this.alertBoldMessage = 'Failed';
        this.alertMessage = err.message;
      }
    });
    
    setTimeout(() => {
      this.showAlert = false;
    }, 3500);
  }



//functions for making input handling easier
  get title() {
    return this.editBlogPostForm.get('title')!;
  }
  get category() {
    return this.editBlogPostForm.get('category')!;
  }
  get description() {
    return this.editBlogPostForm.get('description')!;
  }
}
