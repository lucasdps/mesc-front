import { UsuarioResolverGuard } from './../../componentes/usuario/guards/usuario-resolver.guard';
import { UsuarioFormComponent } from './../../componentes/usuario/usuario-form/usuario-form.component';
import { UsuarioComponent } from './../../componentes/usuario/usuario.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: UsuarioComponent },
  {
    path: 'novo',
    component: UsuarioFormComponent,
    resolve: {
      usuario: UsuarioResolverGuard
    }
  },
  {
    path: 'editar/:id',
    component: UsuarioFormComponent,
    resolve: {
    usuario: UsuarioResolverGuard
  }
 }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }
