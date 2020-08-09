import { Post } from './post.model';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
   loadedPosts = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchPosts();
  }

  onCreatePost(postData: Post) {
    // Send Http request
    this.http.post<{name: string}>('https://angularfirebase-d2607.firebaseio.com/posts.json', postData).subscribe(response => {
        console.log(response);
    });
  }

  onFetchPosts() {
    // Send Http request
    this.fetchPosts();
  }

  onClearPosts() {
    // Send Http request
  }

  //send a http request and fetch posts from the firebase
  private fetchPosts() {
    this.http.get<{[key: string]: Post}>('https://angularfirebase-d2607.firebaseio.com/posts.json')
    .pipe(map(responseData => {
      const postsArray: Post[] = [];
        for(const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
          postsArray.push({ ...responseData[key], id: key });
        }
      }
      return postsArray;
    }))
    .subscribe(response => {
        console.log(response);
    });
  }
}
