import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssociacaoCentroGerenciaResolverGuard } from '../../componentes/associacao-centro-gerencia/guards/associacao-centro-gerencia-resolver.guard';
import { AssociacaoCentroGerenciaComponent } from '../../componentes/associacao-centro-gerencia/associacao-centro-gerencia.component';
import { AssociacaoCentroGerenciaFormComponent } from '../../componentes/associacao-centro-gerencia/associacao-centro-gerencia-form/associacao-centro-gerencia-form.component';




const routes: Routes = [ { path: '', component: AssociacaoCentroGerenciaComponent },
{
  path: 'novo',
  component: AssociacaoCentroGerenciaFormComponent,
  resolve: {
    AssociacaoCentroGerencia: AssociacaoCentroGerenciaResolverGuard
  }
},
{
  path: 'editar/:id',
  component: AssociacaoCentroGerenciaFormComponent,
  resolve: {
    AssociacaoCentroGerencia: AssociacaoCentroGerenciaResolverGuard
}
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssociacaoCentroGerenciaRoutingModule { }
