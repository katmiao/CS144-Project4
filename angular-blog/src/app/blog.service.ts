import { Injectable } from '@angular/core';
import { Post } from './post';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
	providedIn: 'root'
})

export class BlogService {
	httpOptions = {
		headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
		responseType: 'text' as 'json'
	};
	draft: Post;
	postList: Post[];
	nextPostid: number;

	constructor(public http: HttpClient) { 
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
		const url = `/api/${username}`;
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
					reject(err.message);
				});
		});
		return promise;
	}

	getPost(username: string, postid: number): Promise<Post>
	{
		const url = `/api/${username}/${postid}`;
		return new Promise<Post>((resolve, reject) => {
			this.http
				.get<Post>(url)
				.toPromise()
				.then(res => {
					resolve(res);
				})
				.catch(err => {
					reject(err.message);
				});
		});
	}

	newPost(username: string, post: Post): Promise<void>
	{
		const url = `/api/${username}/${post.postid}`;
		return new Promise<void>((resolve, reject) => {
			this.http
				.post<void>(url, post, this.httpOptions)
				.toPromise()
				.then(() => {
					resolve();
				})
				.catch(err => {
					reject(err.message);
				});
		});
	}

	updatePost(username: string, post: Post): Promise<void> 
	{
		const url = `/api/${username}/${post.postid}`;
		return new Promise<void>((resolve, reject) => {
			this.http
				.put<void>(url, post, this.httpOptions)
				.toPromise()
				.then((res) => {
					resolve();
				})
				.catch(err => {
					reject(err.message);
				});
		});
	}

	deletePost(username: string, postid: number): Promise<void> 
	{
		const url = `/pi/${username}/${postid}`;
		return new Promise<void>((resolve, reject) => {
			this.http
				.delete<void>(url, this.httpOptions)
				.toPromise()
				.then(() => {
					resolve();
				})
				.catch(err => {
					reject(err.message);
				});
		});
	}

	setCurrentDraft(post: Post): void {
		this.draft = post;
	}

	getCurrentDraft(): Post {
		return this.draft;
	}

	// local API
	getLocalPosts(): Observable<Post[]>
	{
		return of(this.postList);
	}

	getCurrentDraftObservable(): Observable<Post>
	{
		return of(this.draft);
	}

	getNextPostId(): number
	{
		return this.nextPostid;
	}

	incrementNextPostId(): void
	{
		this.nextPostid++;
	}

	addLocalPost(post: Post): void
	{
		this.postList.push(post);
	}

	deleteLocalPost(postid: number): void
	{
		for(let i = 0; i < this.postList.length; i++)
		{
			if(this.postList[i].postid == postid)
			{
				this.postList.splice(i, 1);
				break;
			}
		}
	}

	updateLocalPosts(): Promise<void>
	{
		return this.fetchPosts(localStorage.getItem('username'))
					.then(res => {
						this.nextPostid = res[res.length - 1].postid + 1;
						
						for(let i = 0; i < res.length; i++)
						{
							res[i].unsaved = false;
							res[i].isNewPost = false;
						}
						
						this.postList = res;
					})
					.catch(err => {
						console.log(err);
					});
				};
}
