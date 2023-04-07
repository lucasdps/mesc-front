import { MaterialModule } from './modulos/material/material.module';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '', pathMatch: 'full', redirectTo: ''
  },
  {
    path: 'entrada', loadChildren: () => import('./modulos/entrada/entrada.module').then(m => m.EntradaModule)
  },
  {
    path: 'gerencia', loadChildren: () => import('./modulos/gerencia/gerencia.module').then(m => m.GerenciaModule)
  },
  {
    path: 'resultado', loadChildren: () => import('./modulos/resultado/resultado.module').then(m => m.ResultadoModule)
  },
  {
    path: 'local', loadChildren: () => import('./modulos/local/local.module').then(m => m.LocalModule)
  },
  {
    path: 'deposito', loadChildren: () => import('./modulos/deposito/deposito.module').then(m => m.DepositoModule)
  },
  {
    path: 'tipoAtendimento', loadChildren: () => import('./modulos/tipo-atendimento/tipo-atendimento.module').then(m => m.TipoAtendimentoModule)
  },
  {
    path: 'usuario', loadChildren: () => import('./modulos/usuario/usuario.module').then(m => m.UsuarioModule)
  },
  {
    path: 'prazoAtendimento', loadChildren: () => import('./modulos/prazo-atendimento/prazo-atendimento.module').then(m => m.PrazoAtendimentoModule)
  },
  {
    path: 'solicitacaoRvt', loadChildren: () => import('./modulos/solicitacao-rvt/solicitacao-rvt.module').then(m => m.SolicitacaoRvtModule)
  },
  {
    path: 'solicitacao', loadChildren: () => import('./modulos/solicitacao/solicitacao.module').then(m => m.SolicitacaoModule)
  }
  ,
  {
    path: 'material', loadChildren: () => import('./modulos/material/material.module').then(m => m.MaterialModule)
  }
  ,
  {
    path: 'associacaoCentroGerencia', loadChildren: () => import('./modulos/associacao-centro-gerencia/associacao-centro-gerencia.module').then(m => m.AssociacaoCentroGerenciaModule)
  },
  {
    path: 'associacaoDepositoLocal', loadChildren: () => import('./modulos/associacao-deposito-local/associacao-deposito-local.module').then(m => m.AssociacaoDepositoLocalModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
