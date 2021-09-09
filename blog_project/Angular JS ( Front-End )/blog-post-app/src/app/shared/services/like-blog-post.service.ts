import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { domain } from 'src/contants';

@Injectable({
  providedIn: 'root'
})
export class LikeBlogPostService {

  constructor(private http : HttpClient) { }

  likeBlogPost(id : number, body : any)
  {
    return this.http.patch(domain + id, body);
  }
}
