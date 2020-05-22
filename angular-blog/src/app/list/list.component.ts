import { Component, OnInit } from '@angular/core';
import { Post } from '../post';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  posts: Post[];
  username: string;
  nextPostid: number;
  editComp: boolean;
  previewComp: boolean;

  constructor(public blogService: BlogService) 
  {
  }

  ngOnInit(): void 
  {
    this.editComp = false;
    this.previewComp = false;
    this.getPosts();
  }

  onSelect(post: Post)
  {
    this.blogService.setCurrentDraft(post);
    console.log(this.blogService.getCurrentDraft());
    this.editComp = true;
    this.previewComp = false;
  }

  onNewPost()
  {
    let currentUtc = new Date().getTime();
    let p = new Post(this.nextPostid, currentUtc, currentUtc, "", "", true, true);
    this.posts.push(p);
    this.blogService.setCurrentDraft(p);
    this.nextPostid++;
    this.editComp = true;
  }

  getPosts(): void
  {
    this.username = this.blogService.parseJWT(document.cookie)["usr"];
    this.blogService
      .fetchPosts(this.username)
      .then(res => {
        this.nextPostid = res[res.length - 1].postid + 1;
        
        for(let i = 0; i < res.length; i++)
        {
          res[i].unsaved = false;
          res[i].isNewPost = false;
        }
        
        this.posts = res;
      })
      .catch(err => {
        console.log(err);
      });
  }

  onDeletePost(post: Post)
  {
    this.blogService.setCurrentDraft(null);
    this.editComp = false;
    for(let i = 0; i < this.posts.length; i++)
    {
      if(this.posts[i].postid == post.postid)
      {
        this.posts.splice(i, 1);
        break;
      }
    }
  }

  onPreviewPost()
  {
    this.editComp = false;
    this.previewComp = true;
  }
}
