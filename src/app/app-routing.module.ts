import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {WorldComponent} from './components/world/world.component';

const routes: Routes = [
  {path: '', redirectTo: 'world', pathMatch: 'full'},
  {path: 'world', component: WorldComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
