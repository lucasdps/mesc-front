import { LocalResolverGuard } from './../../componentes/local/guards/local-resolver.guard';
import { LocalFormComponent } from './../../componentes/local/local-form/local-form.component';
import { LocalComponent } from './../../componentes/local/local.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: LocalComponent },
  {
    path: 'novo',
    component: LocalFormComponent,
    resolve: {
      local: LocalResolverGuard
    }
  },
  {
    path: 'editar/:id',
    component: LocalFormComponent,
    resolve: {
    local: LocalResolverGuard
  }
 }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocalRoutingModule { }
