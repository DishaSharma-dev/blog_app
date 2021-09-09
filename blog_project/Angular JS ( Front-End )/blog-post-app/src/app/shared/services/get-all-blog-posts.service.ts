import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { domain } from 'src/contants';
import { IPost } from './interfaces/post';

@Injectable({
  providedIn: 'root'
})
export class GetAllBlogPostsService {

  constructor(private http : HttpClient) { }

  getPosts() : Observable<IPost[]>
  {
    return this.http.get<IPost[]>(domain);
  }
}
