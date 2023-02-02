import { SolicitacaoRvtResolverGuard } from './../../componentes/solicitacao-rvt/guards/solicitacao-rvt-resolver.guard';
import { SolicitacaoRvtFormComponent } from './../../componentes/solicitacao-rvt/solicitacao-rvt-form/solicitacao-rvt-form.component';
import { SolicitacaoRvtComponent } from './../../componentes/solicitacao-rvt/solicitacao-rvt.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: SolicitacaoRvtComponent },
  {
    path: 'novo',
    component: SolicitacaoRvtFormComponent,
    resolve: {
      solicitacaoRvt: SolicitacaoRvtResolverGuard
    }
  },
  {
    path: 'editar/:id',
    component: SolicitacaoRvtFormComponent,
    resolve: {
      solicitacaoRvt: SolicitacaoRvtResolverGuard
  }
 }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SolicitacaoRvtRoutingModule { }
