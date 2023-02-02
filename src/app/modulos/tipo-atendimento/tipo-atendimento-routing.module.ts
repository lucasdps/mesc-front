import { TipoAtendimentoResolverGuard } from './../../componentes/tipo-atendimento/guards/tipo-atendimento-resolver.guard';
import { TipoAtendimentoFormComponent } from './../../componentes/tipo-atendimento/tipo-atendimento-form/tipo-atendimento-form.component';
import { TipoAtendimentoComponent } from './../../componentes/tipo-atendimento/tipo-atendimento.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: TipoAtendimentoComponent },
  {
    path: 'novo',
    component: TipoAtendimentoFormComponent,
    resolve: {
      tipoAtendimento: TipoAtendimentoResolverGuard
    }
  },
  {
    path: 'editar/:codigo',
    component: TipoAtendimentoFormComponent,
    resolve: {
      tipoAtendimento: TipoAtendimentoResolverGuard
  }
 }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TipoAtendimentoRoutingModule { }
