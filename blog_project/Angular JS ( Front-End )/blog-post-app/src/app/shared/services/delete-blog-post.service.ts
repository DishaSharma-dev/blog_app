import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { domain } from 'src/contants';

@Injectable({
  providedIn: 'root'
})
export class DeleteBlogPostService {

  constructor(private http : HttpClient) { }

  deleteBlogPost(id : number)
  {
    return this.http.delete(domain + id);
  }
}
