import { PrazoAtendimentoResolverGuard } from './../../componentes/prazo-atendimento/guards/prazo-atendimento-resolver.guard';
import { PrazoAtendimentoFormComponent } from './../../componentes/prazo-atendimento/prazo-atendimento-form/prazo-atendimento-form.component';
import { PrazoAtendimentoComponent } from './../../componentes/prazo-atendimento/prazo-atendimento.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: PrazoAtendimentoComponent },
  {
    path: 'novo',
    component: PrazoAtendimentoFormComponent,
    resolve: {
      prazoAtendimento: PrazoAtendimentoResolverGuard
    }
  },
  {
    path: 'editar/:id',
    component: PrazoAtendimentoFormComponent,
    resolve: {
      prazoAtendimento: PrazoAtendimentoResolverGuard
  }
 }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrazoAtendimentoRoutingModule { }
