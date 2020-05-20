import { Injectable } from '@angular/core';
import { Post } from './post';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})

export class BlogService {
	/*httpOptions = {
		headers: new HttpHeaders({ 'Cookie': document.cookie })
	};*/
	draft: Post;

	constructor(private http: HttpClient) { 
		this.draft = null;
	}

	parseJWT(token: string) 
	{
		let base64Url = token.split('.')[1];
		let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
		return JSON.parse(atob(base64));
	}

	fetchPosts(username: string): Promise<Post[]>
	{
		console.log("fetch posts called");
		const url = `api/${username}`;
		let promise = new Promise<Post[]>((resolve, reject) =>
		{
			this.http.get<Post[]>(url)
				.toPromise()
				.then(res => 
					{
						resolve(res);
					})
				.catch(err => 
					{
						console.log(err.message);
						reject([]);
					});
		});
		return promise;
	}

	setCurrentDraft(post: Post): void {
		this.draft = post;
	}

	getCurrentDraft(): Post {
		return this.draft;
	}
}
