import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditComponent } from './edit/edit.component';
import { PreviewComponent } from './preview/preview.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';


const routes: Routes = [
  { 
    path: '', 
    children: [
      { path: 'edit/:id', component: EditComponent },
      { path: 'preview/:id', component: PreviewComponent },
    ]
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, {useHash: true}) ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
