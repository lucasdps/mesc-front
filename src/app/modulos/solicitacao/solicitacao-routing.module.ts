import { SolicitacaoResolverGuard } from './../../componentes/solicitacao/guards/solicitacao-resolver.guard';
import { SolicitacaoFormComponent } from './../../componentes/solicitacao/solicitacao-form/solicitacao-form.component';
import { SolicitacaoComponent } from './../../componentes/solicitacao/solicitacao.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: SolicitacaoComponent },
  {
    path: 'novo',
    component: SolicitacaoFormComponent,
    resolve: {
      solicitacao: SolicitacaoResolverGuard
    }
  },
  {
    path: 'editar/:id',
    component: SolicitacaoFormComponent,
    resolve: {
      solicitacao: SolicitacaoResolverGuard
  }
 }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SolicitacaoRoutingModule { }
