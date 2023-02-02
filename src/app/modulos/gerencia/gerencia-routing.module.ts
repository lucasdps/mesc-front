import { GerenciaResolverGuard } from './../../componentes/gerencia/guards/gerencia-resolver.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GerenciaComponent } from '../../componentes/gerencia/gerencia.component';
import { GerenciaFormComponent } from 'src/app/componentes/gerencia/gerencia-form/gerencia-form.component';

const routes: Routes = [
  { path: '', component: GerenciaComponent },
  {
    path: 'novo',
    component: GerenciaFormComponent,
    resolve: {
      gerencia: GerenciaResolverGuard
    }
  },
  {
    path: 'editar/:id',
    component: GerenciaFormComponent,
    resolve: {
    gerencia: GerenciaResolverGuard
  }
 }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GerenciaRoutingModule { }
