import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../post';
import { BlogService } from '../blog.service';
//import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  @Input() username: string;
  @Input() postid: number;
  post: Post;
  constructor(public blogService: BlogService) 
  { 
  }

  ngOnInit(): void 
  {
    //this.post = this.blogService.getCurrentDraft();
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
}
