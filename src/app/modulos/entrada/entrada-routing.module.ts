import { EntradaResolverGuard } from './../../componentes/entrada/guards/entrada-resolver.guard';
import { EntradaFormComponent } from './../../componentes/entrada/entrada-form/entrada-form.component';
import { EntradaComponent } from './../../componentes/entrada/entrada.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: EntradaComponent },
  {
    path: 'novo',
    component: EntradaFormComponent
  },
  {
    path: 'editar/:id',
    component: EntradaFormComponent,
    resolve: {
    entrada: EntradaResolverGuard
  }
 }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntradaRoutingModule { }
