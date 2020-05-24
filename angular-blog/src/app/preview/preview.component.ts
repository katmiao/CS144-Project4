import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../post';
import { BlogService } from '../blog.service';
import { Parser, HtmlRenderer } from 'commonmark';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  	selector: 'app-preview',
  	templateUrl: './preview.component.html',
  	styleUrls: ['./preview.component.css']
})
export class PreviewComponent implements OnInit {
	post: Post;
	markdownTitle: string;
	markdownBody: string;
	parser: Parser;
	htmlRenderer: HtmlRenderer;
	notFound: boolean;

  	constructor(private blogService: BlogService, private route: ActivatedRoute, private router: Router) { }

  	ngOnInit(): void {
		this.route.paramMap.subscribe(() => {
			let postid = parseInt(this.route.snapshot.paramMap.get('id'));
			this.notFound = false;
			this.getPost(postid);
			this.parser = new Parser();
			this.htmlRenderer = new HtmlRenderer(); 
			this.preview();
		  });
	}
	  
	ngOnChanges(): void
	{
		this.preview();
	}

  	preview(): void {
  		if (this.post == null) {
			console.log("---ERROR: previewing null post");
  			return;
		}

  		this.markdownTitle = this.htmlRenderer.render(this.parser.parse(this.post.title));
  		this.markdownBody = this.htmlRenderer.render(this.parser.parse(this.post.body));
	}
	  
	toEdit(): void {
		this.router.navigate(['edit', this.post.postid]);
	}

	getPost(postid: number): void
	{
	  
	  if(this.blogService.getCurrentDraft() === null || 
		 this.blogService.getCurrentDraft().postid != postid)
	  {
		this.blogService
		  .getPost(localStorage.getItem('username'), postid)
		  .then(res => {
			this.post = res;
			this.post.unsaved = false;
			this.markdownTitle = this.htmlRenderer.render(this.parser.parse(this.post.title));
			this.markdownBody = this.htmlRenderer.render(this.parser.parse(this.post.body));
			this.blogService.setCurrentDraft(this.post);
		  })
		  .catch(err => {
			console.log(err);
			this.notFound = true;
		  });
	  }
	  else
	  {
		this.post = this.blogService.getCurrentDraft();
	  }
	}
}
