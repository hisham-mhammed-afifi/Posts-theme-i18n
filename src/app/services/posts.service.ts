import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Post {
  _id: string;
  title: string;
  imgId: string;
  postImg: string;
  tags: string[];
  description: string;
  createdAt: string;
}

export interface PostsResponse {
  apiStatus: boolean;
  data: Post[];
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  BaseURL: string = 'https://social-node-js.vercel.app';

  constructor(private _http: HttpClient) {}

  allPosts(): Observable<PostsResponse> {
    return this._http.get<PostsResponse>(this.BaseURL + '/posts');
  }

  addPost(data: Post): Observable<any> {
    return this._http.post<any>(this.BaseURL + '/posts', data);
  }

  deletePost(postId: string): Observable<any> {
    return this._http.delete<any>(this.BaseURL + '/posts/removepost/' + postId);
  }
}
