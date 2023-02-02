import { CentroResolverGuard } from './../../componentes/centro/guards/centro-resolver.guard';
import { CentroFormComponent } from './../../componentes/centro/centro-form/centro-form.component';
import { CentroComponent } from './../../componentes/centro/centro.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: CentroComponent },
  {
    path: 'novo',
    component: CentroFormComponent,
    resolve: {
      centro: CentroResolverGuard
    }
  },
  {
    path: 'editar/:codigo',
    component: CentroFormComponent,
    resolve: {
    centro: CentroResolverGuard
  }
 }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CentroRoutingModule { }
