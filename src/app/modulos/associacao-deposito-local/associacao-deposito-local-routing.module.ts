import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssociacaoDepositoLocalComponent } from '../../componentes/associacao-deposito-local/associacao-deposito-local.component';
import { AssociacaoDepositoLocalFormComponent } from '../../componentes/associacao-deposito-local/associacao-deposito-local-form/associacao-deposito-local-form.component';
import { AssociacaoDepositoLocalResolverGuard } from '../../componentes/associacao-deposito-local/guards/associacao-deposito-local-resolver.guard';

const routes: Routes = [ { path: '', component: AssociacaoDepositoLocalComponent },
{
  path: 'novo',
  component: AssociacaoDepositoLocalFormComponent,
  resolve: {
    AssociacaoDepositoLocal: AssociacaoDepositoLocalResolverGuard
  }
},
{
  path: 'editar/:id',
  component: AssociacaoDepositoLocalFormComponent,
  resolve: {
    AssociacaoDepositoLocal: AssociacaoDepositoLocalResolverGuard
}
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssociacaoDepositoLocalRoutingModule { }
