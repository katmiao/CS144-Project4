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
	@Input() post: Post;
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
  		this.parser = new Parser();
		this.htmlRenderer = new HtmlRenderer(); 
		this.preview();
	}
	  
	ngOnChanges(): void
	{
		this.preview();
	}

  	preview(): void {
		  console.log(this.blogService.getCurrentDraft());
  		if (this.post == null) {
  			console.log("---ERROR: previewing null post");
  			return;
		}
		  
		console.log(this.post.title);
  		this.markdownTitle = this.htmlRenderer.render(this.parser.parse(this.post.title));
  		this.markdownBody = this.htmlRenderer.render(this.parser.parse(this.post.body));
	}
	  
	toEdit(): void {
		this.router.navigate(['edit', this.post.postid]);
	}

}
