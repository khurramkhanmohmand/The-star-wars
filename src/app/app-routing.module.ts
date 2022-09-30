
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkInProgressComponent } from './work-in-progress/work-in-progress.component';

const routes: Routes = [
  // { path: 'films', component: FilmListComponent },
  // { path: 'films/:id', component: FilmDetailsComponent },
  // { path: 'people', component: PeopleListComponent },
  // { path: 'people/:id', component: PeopleDetailComponent },
  {
    path: 'films', loadChildren: () =>
      import('./features/films/films.module').then(
        (m) => m.FilmsModule
      ),
  },
  {
    path: 'people', loadChildren: () =>
      import('./features/people/people.module').then(
        (m) => m.PeopleModule
      ),
  },
  { path: '', pathMatch: 'full', redirectTo: '/films' },
  { path: '**', component: WorkInProgressComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
