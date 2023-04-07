
import { ActivatedRoute, Router } from '@angular/router';
import { ResultadoService } from './../../servicos/resultado/resultado.service';
import { Observable, Subject, empty } from 'rxjs';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Resultado, VisaoDia } from './../../modulos/resultado/resultado';
import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy, QueryList, ViewChildren } from '@angular/core';
import { AlertService } from 'src/app/servicos/alert/alert.service';
import { catchError } from 'rxjs/operators';
import { EntradaService } from 'src/app/servicos/entrada/entrada.service';
import { Operacao } from 'src/app/modulos/entrada/entrada';

import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-resultado',
  templateUrl: './resultado.component.html',
  styleUrls: ['./resultado.component.css'],
  preserveWhitespaces: true
})
export class ResultadoComponent implements  OnInit {

  deleteModalRef: BsModalRef;
  @ViewChild('deleteModal') deleteModal;
  resultadoModalRef: BsModalRef;
  @ViewChild('resultadoModal') resultadoModal;

  resultadoSelecionado: Resultado;
  operacoes: Array<Operacao>;
  viewCompleta: Array<VisaoDia>;
  // Observable
  resultados$: Observable<Resultado[]>;
  resultadoVisao: Resultado;
  error$ = new Subject<boolean>();

  
  

  //tipo
  tipoView: Number = 0;
  IdResultado: Number = 0;


  constructor(private service: ResultadoService,
    private modalService: BsModalService, // para modal de sim ou nao
    private alertService: AlertService,
    private router: Router,
    private route: ActivatedRoute) {
  }

  

  ngOnInit(): void {
    // this.service.list().subscribe(dados => this.ger(encias = dados);
    this.onRefresh();
    
  }

  

  onRefresh() {
    this.resultados$ = this.service.listar().pipe(
      catchError(error => {
        console.error(error);
        // this.error$.next(true);
        this.handleError();
        return empty();
      })
    );
  }

  handleError() {
    this.alertService.showAlertDanger('Erro ao carregar entradas. tente mais tarde');

  }

  onEdit(id){
    this.router.navigate(['editar', id], {relativeTo: this.route});
  }

  onDelete(entrada){
    this.resultadoSelecionado = entrada;
    this.deleteModalRef = this.modalService.show(this.deleteModal, {class: 'modal-sm'});
  }

  onRelatorio(resultado){
    this.resultadoSelecionado = resultado;
    this.IdResultado = this.resultadoSelecionado.id;
    this.resultadoModalRef = this.modalService.show(this.resultadoModal, {class: 'modal-lg'});
  }

  
  onConfirmDelete(){
    this.service.remove(this.resultadoSelecionado.id).subscribe(
      success => {
        this.onRefresh();
        this.deleteModalRef.hide();
      },
      error =>{
        this.alertService.showAlertDanger('Erro ao deletar');
        this.deleteModalRef.hide();
      }
    );
  }

  onDeclineDelete(){
    this.deleteModalRef.hide();
  }

  onDeclineResultado(){
    this.resultadoModalRef.hide();
  }
 

}
