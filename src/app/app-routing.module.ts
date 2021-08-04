import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatsComponent } from './chats/chats.component';
import { EventComponent } from './event/event.component';
import { LoginComponent } from './login/login.component';
import { NeweditpostComponent } from './neweditpost/neweditpost.component';
import { PostsComponent } from './posts/posts.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: 'posts', component: PostsComponent },
  { path: 'events', component: EventComponent },
  { path: 'chats', component: ChatsComponent },
  { path: 'neweditpost', component: NeweditpostComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
