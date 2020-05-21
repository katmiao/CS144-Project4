import { Component, OnInit } from '@angular/core';
import { Post } from '../post';
import { BlogService } from '../blog.service';
import { Parser, HtmlRenderer } from 'commonmark';

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

  	constructor(private blogService: BlogService) { }

  	ngOnInit(): void {
  		this.parser = new Parser();
  		this.htmlRenderer = new HtmlRenderer();
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
		  
	}

}
