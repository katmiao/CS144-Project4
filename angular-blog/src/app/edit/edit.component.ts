import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Post } from '../post';
import { BlogService } from '../blog.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {;
  post: Post;
  notFound: boolean;

  constructor(
    public blogService: BlogService, 
    private route: ActivatedRoute, 
    private router: Router) 
  { 
  }

  ngOnInit(): void 
  {
    this.route.paramMap.subscribe(() => {
      let postid = parseInt(this.route.snapshot.paramMap.get('id'));
      this.notFound = false;
      this.getPost(postid);
    });
  }

  ngOnChanges(): void
  {
    
  }

  onChangeTitle(newTitle: string): void
  {
    if(!this.post.unsaved)
    {
      this.post.unsaved = true;
    }
    this.post.title = newTitle;
  }

  onChangeBody(newBody: string): void
  {
    if(!this.post.unsaved)
    {
      this.post.unsaved = true;
    }
    this.post.body = newBody;
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

  savePost(): void
  {
    if(this.post.isNewPost)
    {
      delete this.post.isNewPost;
      delete this.post.unsaved;
      this.blogService
        .newPost(localStorage.getItem('username'), this.post)
        .then(() => {
          this.post.isNewPost = false;
          this.post.unsaved = false;
          this.post.modified = new Date().getTime();
          this.blogService.setCurrentDraft(this.post);
        })
        .catch(err => {
          console.log(err);
        });
    }
    else
    {
      delete this.post.isNewPost;
      delete this.post.unsaved;
      this.blogService
        .updatePost(localStorage.getItem('username'), this.post)
        .then(() => {
          this.post.isNewPost = false;
          this.post.unsaved = false;
          this.post.modified = new Date().getTime();
          this.blogService.setCurrentDraft(this.post);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  deletePost(): void
  {
    this.blogService.setCurrentDraft(null);
    if(!this.post.unsaved)
    {
      this.blogService
        .deletePost(localStorage.getItem('username'), this.post.postid)
        .catch(err => {
          console.log(err);
        });
    }
    
    this.blogService.deleteLocalPost(this.post.postid);
    this.router.navigate(['/'])
  }

  previewPost(): void
  {
    this.router.navigate(['preview', this.post.postid])
  }
}
