import { Component, OnInit } from '@angular/core';
import { BlogService } from './blog.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular-blog';
  
  constructor(public blogService: BlogService) {
    
  }

  ngOnInit(): void
  {
    window.localStorage.setItem('username', this.blogService.parseJWT(document.cookie)["usr"]);
  }
}
