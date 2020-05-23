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

	/** TODO
	*  Subscribe to the URL activation event
	*  so that the post to display can be obtained with BlogService 
	*  and rendered as HTML when a “preview URL” is activated
	*/

  	constructor(private blogService: BlogService, private route: ActivatedRoute, private router: Router) { }

  	ngOnInit(): void {
		this.blogService.getCurrentDraftObservable()
			.subscribe(res => {
				this.post = res;
			});
  		this.parser = new Parser();
		this.htmlRenderer = new HtmlRenderer(); 
		this.preview();
	}
	  
	ngOnChanges(): void
	{
		this.preview();
	}

  	preview(): void {
  		if (this.post == null) {
			console.log("---ERROR: previewing null post");
			this.router.navigate(['notFound']);
  			return;
		}

  		this.markdownTitle = this.htmlRenderer.render(this.parser.parse(this.post.title));
  		this.markdownBody = this.htmlRenderer.render(this.parser.parse(this.post.body));
	}
	  
	toEdit(): void {
		this.router.navigate(['edit', this.post.postid]);
	}

}
