import { AlertComponent } from 'src/app/componentes/shared/alert/alert.component';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
//Shared Components
import { ModalModule } from 'ngx-bootstrap/modal';

import { ContentComponent } from './componentes/shared/content/content.component';
import { HeadlerComponent } from './componentes/shared/headler/headler.component';
import { MenuComponent } from './componentes/shared/menu/menu.component';
import { FooterComponent } from './componentes/shared/footer/footer.component';
import { SettingComponent } from './componentes/shared/setting/setting.component';
import { GerenciaComponent } from './componentes/gerencia/gerencia.component';
//import { AlertComponent } from './componentes/shared/alert/alert.component';
import { SharedModule } from './componentes/shared/shared.module';
import { GerenciaFormComponent } from './componentes/gerencia/gerencia-form/gerencia-form.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CentroComponent } from './componentes/centro/centro.component';
import { CentroFormComponent } from './componentes/centro/centro-form/centro-form.component';
import { LocalComponent } from './componentes/local/local.component';
import { LocalFormComponent } from './componentes/local/local-form/local-form.component';
import { DepositoComponent } from './componentes/deposito/deposito.component';
import { DepositoFormComponent } from './componentes/deposito/deposito-form/deposito-form.component';
import { UsuarioComponent } from './componentes/usuario/usuario.component';
import { UsuarioFormComponent } from './componentes/usuario/usuario-form/usuario-form.component';
import { PrazoAtendimentoComponent } from './componentes/prazo-atendimento/prazo-atendimento.component';
import { PrazoAtendimentoFormComponent } from './componentes/prazo-atendimento/prazo-atendimento-form/prazo-atendimento-form.component';
import { SolicitacaoRvtComponent } from './componentes/solicitacao-rvt/solicitacao-rvt.component';
import { SolicitacaoRvtFormComponent } from './componentes/solicitacao-rvt/solicitacao-rvt-form/solicitacao-rvt-form.component';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { AssociacaoCentroGerenciaComponent } from './componentes/associacao-centro-gerencia/associacao-centro-gerencia.component';
import { AssociacaoCentroGerenciaFormComponent } from './componentes/associacao-centro-gerencia/associacao-centro-gerencia-form/associacao-centro-gerencia-form.component';
import { AssociacaoDepositoLocalComponent } from './componentes/associacao-deposito-local/associacao-deposito-local.component';
import { AssociacaoDepositoLocalFormComponent } from './componentes/associacao-deposito-local/associacao-deposito-local-form/associacao-deposito-local-form.component';

import { APP_BASE_HREF, LocationStrategy, HashLocationStrategy } from '@angular/common';

import { DatePipe } from '@angular/common';
import { TipoAtendimentoComponent } from './componentes/tipo-atendimento/tipo-atendimento.component';
import { TipoAtendimentoFormComponent } from './componentes/tipo-atendimento/tipo-atendimento-form/tipo-atendimento-form.component';
import { SolicitacaoComponent } from './componentes/solicitacao/solicitacao.component';
import { SolicitacaoFormComponent } from './componentes/solicitacao/solicitacao-form/solicitacao-form.component';
import { MaterialComponent } from './componentes/material/material.component';
import { SolicitacaoFormEditComponent } from './componentes/solicitacao/solicitacao-form-edit/solicitacao-form-edit.component';
import { EntradaComponent } from './componentes/entrada/entrada.component';
import { EntradaFormComponent } from './componentes/entrada/entrada-form/entrada-form.component';
import { ResultadoComponent } from './componentes/resultado/resultado.component';
import { ViewDiasComponent } from './componentes/resultado/view-dias/view-dias.component';


@NgModule({

  declarations: [
    AppComponent,
    ContentComponent,
    HeadlerComponent,
    MenuComponent,
    FooterComponent,
    SettingComponent,
    GerenciaComponent,
    GerenciaFormComponent,
    CentroComponent,
    CentroFormComponent,
    LocalComponent,
    LocalFormComponent,
    DepositoComponent,
    DepositoFormComponent,
    UsuarioComponent,
    UsuarioFormComponent,
    PrazoAtendimentoComponent,
    PrazoAtendimentoFormComponent,
    SolicitacaoRvtComponent,
    SolicitacaoRvtFormComponent,
    AssociacaoCentroGerenciaComponent,
    AssociacaoCentroGerenciaFormComponent,
    AssociacaoDepositoLocalComponent,
    AssociacaoDepositoLocalFormComponent,
    TipoAtendimentoComponent,
    TipoAtendimentoFormComponent,
    SolicitacaoComponent,
    SolicitacaoFormComponent,
    AlertComponent,
    MaterialComponent,
    SolicitacaoFormEditComponent,
    EntradaComponent,
    EntradaFormComponent,
    ResultadoComponent,
    ViewDiasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ModalModule.forRoot(),
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    DataTablesModule.forRoot()

  ],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
     DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
