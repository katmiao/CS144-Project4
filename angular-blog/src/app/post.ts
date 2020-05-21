export class Post {
  constructor(
    postid: number, 
    created: number, 
    modified: number, 
    title: string, 
    body: string, 
    unsaved: boolean)
  {
    this.postid = postid;
    this.created = created;
    this.modified = modified;
    this.title = title;
    this.body = body;
    this.unsaved = unsaved;
  }
  
    postid: number;
    created: number;
    modified: number;
    title: string;
    body: string;
    unsaved: boolean;
  }