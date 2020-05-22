import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../post';
import { BlogService } from '../blog.service';
//import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  @Input() username: string;
  @Input() postid: number;
  post: Post;
  constructor(public blogService: BlogService, private route: ActivatedRoute, private router: Router) 
  { 
  }

  ngOnInit(): void 
  {
    //this.post = this.blogService.getCurrentDraft();
    this.route.queryParams.subscribe(params => {
      // this.name = params['name'];
    });
  }

  ngOnChanges(): void
  {
    if(this.blogService.getCurrentDraft() === null)
    {
      this.getPost();
    }
    else
    {
      this.post = this.blogService.getCurrentDraft();
    }
  }

  getPost(): void
  {
    this.blogService
      .getPost(this.username, this.postid)
      .then(res => {
        this.post = res;
        this.post.unsaved = false;
      });
  }

  onPreview(): void
  {
    this.router.navigate(['preview', this.post.postid])
  }

  onDelete(): void
  {
    this.blogService.deletePost(this.username, this.postid);
    this.router.navigate(['/'])
  }
}
