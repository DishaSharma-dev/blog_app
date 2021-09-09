import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { domain } from 'src/contants';

@Injectable({
  providedIn: 'root',
})
export class AddBlogPostService {
  constructor(private http: HttpClient) {}

  addBlogPost(body: any) {
    return this.http.post<any>(domain, body, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      observe: 'response',
    });
  }
}
