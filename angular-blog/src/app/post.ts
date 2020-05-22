export class Post {
  constructor(
    postid: number, 
    created: number, 
    modified: number, 
    title: string, 
    body: string, 
    unsaved: boolean,
    isNewPost: boolean)
  {
    this.postid = postid;
    this.created = created;
    this.modified = modified;
    this.title = title;
    this.body = body;
    this.unsaved = unsaved;
    this.isNewPost = isNewPost;
  }
  
    postid: number;
    created: number;
    modified: number;
    title: string;
    body: string;
    unsaved: boolean;
    isNewPost: boolean;
  }