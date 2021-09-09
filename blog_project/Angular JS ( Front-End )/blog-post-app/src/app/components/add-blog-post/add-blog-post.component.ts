import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AddBlogPostService } from 'src/app/shared/services/add-blog-post.service';

@Component({
  selector: 'app-add-blog-post',
  templateUrl: './add-blog-post.component.html',
  styleUrls: ['./add-blog-post.component.css'],
})
export class AddBlogPostComponent implements OnDestroy {
  constructor(
    private fb: FormBuilder,
    private _addBlogPost: AddBlogPostService
  ) {}

  sub!: Subscription;
  showAlert = false;
  alertClass = '';
  alertMessage: any = [];
  alertBoldMessage = '';

  ngOnDestroy() {
    if (this.sub != null) this.sub.unsubscribe();
  }

  addBlogPostForm = this.fb.group({
    title: ['', [Validators.required, Validators.max(150)]],
    category: ['', [Validators.required, Validators.max(150)]],
    description: ['', [Validators.required]],
  });


//function for adding new  blog post  
  addBlog() {
    this.sub = this._addBlogPost
                    .addBlogPost(this.addBlogPostForm.value)
                    .subscribe({
                      next: (data) => {
                        this.showAlert = true;
                        this.alertClass = 'alert-success';
                        this.alertBoldMessage = 'Success';
                        this.alertMessage = [];
                        this.alertMessage.push(data.body.message);
                        this.addBlogPostForm.reset();

                        setTimeout(() => {
                          this.showAlert = false;
                        }, 3000);
                      },
                      error: (err) => {
                        this.showAlert = true;
                        this.alertClass = 'alert-danger';
                        this.alertBoldMessage = 'Failed';
                        this.alertMessage = [];
                        err.error.forEach((element: any) => {
                          this.alertMessage.push(element.msg);
                        });
                      },
                    });
  }



// these functions is used for handling of addBlogPostForm input easily
  get title() {
    return this.addBlogPostForm.get('title')!;
  }
  get category() {
    return this.addBlogPostForm.get('category')!;
  }
  get description() {
    return this.addBlogPostForm.get('description')!;
  }
}
