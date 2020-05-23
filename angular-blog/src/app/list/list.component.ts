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

  constructor(public blogService: BlogService, private route: ActivatedRoute, private router: Router) 
  {
  }

  ngOnInit(): void 
  {
    this.blogService.updateLocalPosts()
      .then(() => {
        this.blogService
          .getLocalPosts()
          .subscribe(res => {
            this.posts = res;
          });
      });
    
    this.route.queryParams.subscribe(params => {
      // todo - https://angular.io/guide/router - for all components 
    });
  }


  onSelect(post: Post)
  {
    this.blogService.setCurrentDraft(post);
    this.router.navigate(['edit', post.postid]); 
  }

  onNewPost()
  {
    let currentUtc = new Date().getTime();
    let p = new Post(this.blogService.getNextPostId(), currentUtc, currentUtc, "", "", true, true);
    //console.log(this.blogService.getNextPostId());
    this.blogService.addLocalPost(p);
    this.blogService.setCurrentDraft(p);
    this.blogService.incrementNextPostId();
    this.router.navigate(['edit', p.postid]);
  }


  onDeletePost(post: Post)
  {
    this.blogService.setCurrentDraft(null);
    this.blogService.deleteLocalPost(post.postid);
  }
}
