import { Injectable } from '@angular/core';
import { Post } from './post';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})

export class BlogService {
	draft: Post;

	constructor() { 
		this.draft = null;
	}

	fetchPosts(username: string): Promise<Post[]>
	{
	  return new Promise<Post[]>(function() 
	  {
		console.log("hello");
	  });
	}

	setCurrentDraft(post: Post): void {
		this.draft = post;
	}

	getCurrentDraft(): Post {
		return this.draft;
	}
}
