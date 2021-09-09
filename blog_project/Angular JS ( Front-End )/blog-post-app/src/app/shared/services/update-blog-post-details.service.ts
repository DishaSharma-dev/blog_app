import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { domain } from 'src/contants';
import { IPost } from './interfaces/post';

@Injectable({
  providedIn: 'root'
})
export class UpdateBlogPostDetailsService {

  constructor(private http : HttpClient) { }

  editBlogPostDetails(id : number, body : any)
  {
    return this.http.put(domain + id, body);
  }
}
