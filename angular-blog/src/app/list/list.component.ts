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

  constructor(public blogService: BlogService) 
  {
  }

  ngOnInit(): void 
  {
    this.getPosts();
  }

  onSelect(post: Post)
  {
    this.blogService.setCurrentDraft(post);
  }

  onNewPost()
  {
    let currentUtc = new Date().getTime();
    let p = new Post(this.nextPostid, currentUtc, currentUtc, "", "", true);
    this.posts.push(p);
    this.blogService.setCurrentDraft(p);
    this.nextPostid++;
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
        }
        
        this.posts = res;
      })
  }
}
