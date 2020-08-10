import { map } from 'rxjs/operators';
import { Post } from './post.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({providedIn: 'root'})
export class PostsService {

    constructor(private http: HttpClient) {}
    url: string = 'https://angularfirebase-d2607.firebaseio.com/posts.json';

    createAndStorePosts(title: string, content: string) {
        const postData: Post = {title: title, content: content};
        this.http.post<{name: string}>(this.url, postData).subscribe(response => {
        console.log(response);
    });
    }

    fetchPosts() {
       return this.http.get<{[key: string]: Post}>(this.url)
        .pipe(map(responseData => {
        const postsArray: Post[] = [];
            for(const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
            postsArray.push({ ...responseData[key], id: key });
            }
        }
        return postsArray;
        }));
    }

    deletePosts() {
       return this.http.delete(this.url);
    }
}