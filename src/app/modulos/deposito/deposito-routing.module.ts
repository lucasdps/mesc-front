import { DepositoResolverGuard } from './../../componentes/deposito/guards/deposito-resolver.guard';
import { DepositoFormComponent } from './../../componentes/deposito/deposito-form/deposito-form.component';
import { DepositoComponent } from './../../componentes/deposito/deposito.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: DepositoComponent },
  {
    path: 'novo',
    component: DepositoFormComponent,
    resolve: {
      deposito: DepositoResolverGuard
    }
  },
  {
    path: 'editar/:Id',
    component: DepositoFormComponent,
    resolve: {
      deposito: DepositoResolverGuard
  }
 }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepositoRoutingModule { }
