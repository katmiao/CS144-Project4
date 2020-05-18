import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})

export class BlogService {
	draft: Post;

	constructor() { 
		this.draft = null;
	}

	setCurrentDraft(post: Post): void {
		this.draft = post;
	}

	getCurrentDraft(): Post {
		return this.draft;
	}
}

export class Post {
	postid: number;
	created: Date;
	modified: Date;
	title: string;
	body: string;
}
