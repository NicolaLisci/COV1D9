import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ItalyComponent} from './components/italy/italy.component';
import {WorldComponent} from './components/world/world.component';


const routes: Routes = [
  {path: '', redirectTo: 'world', pathMatch: 'full'},
  {path: 'italy', component: ItalyComponent},
  {path: 'world', component: WorldComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
