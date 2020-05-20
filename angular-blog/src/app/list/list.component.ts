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
  selectedPost: Post;

  constructor(private blogService: BlogService) 
  {
  }

  ngOnInit(): void 
  {
    this.getPosts();
  }

  onSelect(post: Post)
  {
    this.selectedPost = post;
  }

  getPosts(): void
  {
    let username = this.blogService.parseJWT(document.cookie)["usr"];
    console.log(username);
    this.blogService
      .fetchPosts(username)
      .then(res => {
        this.posts = res;
      });
  }

  parseDate(epoch: string): string
  {
    let date = new Date(epoch);
    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();
    let hour = date.getHours();
    let minutes = date.getMinutes();
    let zeroHour = "";
    let zeroDay = "";
    let zeroMonth = "";
    let zeroMinute = "";
    let meridium = "AM";
    if(hour > 12)
    {
      hour = hour % 12;
      meridium = "PM";
    }
      
    if(hour < 10)
      zeroHour = "0";
    if(day < 10)
      zeroDay = "0";
    if(month < 10)
      zeroMonth = "0";
    if(minutes < 10)
      zeroMinute = "0";
    return `${zeroMonth}${month}/${zeroDay}${day}/${year}, 
            ${zeroHour}${hour}:${zeroMinute}${minutes} ${meridium}`;
  }
}
