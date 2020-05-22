import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Post } from '../post';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  @Input() username: string;
  @Input() post: Post;
  @Output() deletePostEvent: EventEmitter<Post> = new EventEmitter();
  @Output() previewEvent: EventEmitter<void> = new EventEmitter();

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

  getPost(): void
  {
    this.blogService
      .getPost(this.username, this.post.postid)
      .then(res => {
        this.post = res;
        this.post.unsaved = false;
      });
  }

  savePost(): void
  {
    if(this.post.isNewPost)
    {
      delete this.post.isNewPost;
      delete this.post.unsaved;
      console.log(this.post);
      this.blogService
        .newPost(this.username, this.post)
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
        .updatePost(this.username, this.post)
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
    this.blogService
      .deletePost(this.username, this.post.postid)
      .then(() => {
        this.blogService.setCurrentDraft(null);
        this.deletePostEvent.emit(this.post);
      })
      .catch(err => {
        console.log(err);
      });
  }

  previewPost(): void
  {
    this.blogService.setCurrentDraft(null);
    this.previewEvent.emit();
  }
}
