import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BreakingChangesComponent} from "./breaking-changes/breaking-changes.component";

const routes: Routes = [
  { path: '', redirectTo: '/breaking-changes', pathMatch: 'full' },
  { path: 'breaking-changes', component: BreakingChangesComponent },
  {path: '**', redirectTo: '/breaking-changes', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
