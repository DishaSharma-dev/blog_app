import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { IPost } from './interfaces/post';
import { catchError, tap} from 'rxjs/operators';
import { domain } from 'src/contants';

@Injectable({
  providedIn: 'root'
})
export class GetBlogPostDetailsService {

  constructor(private http : HttpClient) { }

  getPostDetails(id : number) : Observable<IPost[]>
  {
    return this.http.get<IPost[]>(domain + id).pipe(
      tap( data => console.log(JSON.stringify(data)) ) 
    );
  }
  
}
