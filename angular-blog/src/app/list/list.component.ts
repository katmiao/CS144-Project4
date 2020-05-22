import { Component, OnInit } from '@angular/core';
import { Post } from '../post';
import { BlogService } from '../blog.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  posts: Post[];
  username: string;
  nextPostid: number;

  constructor(public blogService: BlogService, private route: ActivatedRoute, private router: Router) 
  {
  }

  ngOnInit(): void 
  {
    this.getPosts();
    this.route.queryParams.subscribe(params => {
      // todo - https://angular.io/guide/router - for all components 
    });
  }

  onSelect(post: Post)
  {
    this.blogService.setCurrentDraft(post);
    this.router.navigate(['edit', post.postid])
  }

  onNewPost()
  {
    let currentUtc = new Date().getTime();
    let p = new Post(this.nextPostid, currentUtc, currentUtc, "", "", true);
    this.posts.push(p);
    this.blogService.setCurrentDraft(p);
    this.nextPostid++;
    this.router.navigate(['edit', p.postid]);
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
