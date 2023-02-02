import { TipoAtendimento } from './../../modulos/tipo-atendimento/TipoAtendimento';
import { TipoAtendimentoService } from './../../servicos/tipo-atendimento/tipo-atendimento.service';
import { catchError } from 'rxjs/operators';
import { AlertService } from './../../servicos/alert/alert.service';
import { DepositoService } from './../../servicos/deposito/deposito.service';
import { Deposito } from './../../modulos/deposito/deposito';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, Subject, empty } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-deposito',
  templateUrl: './deposito.component.html',
  styleUrls: ['./deposito.component.css'],
  preserveWhitespaces: true
})
export class DepositoComponent implements OnInit {


  deleteModalRef: BsModalRef;
  @ViewChild('deleteModal') deleteModal;
  depositoSelecionado: Deposito;
  // Observable
  depositos$: Observable<Deposito[]>;
  error$ = new Subject<boolean>();


  tipoAtendimento$: Observable<TipoAtendimento[]>;
  tipoAtendimentoList: TipoAtendimento[] = [];


  constructor(private service: DepositoService,
    private modalService: BsModalService, // para modal de sim ou nao
    private alertService: AlertService,
    private serviceTipoAtendimento:  TipoAtendimentoService,
    private router: Router,
    private route: ActivatedRoute) {

      this.tipoAtendimento$  = this.serviceTipoAtendimento.list().pipe(
        catchError(error => {
          console.error(error);
          // this.error$.next(true);
          //s this.handleError();
          return empty();
        })
      );

      this.tipoAtendimento$.subscribe(data => {

        this.tipoAtendimentoList = data;

    });
    console.log(this.tipoAtendimentoList );
  }

  ngOnInit(): void {
    // this.service.list().subscribe(dados => this.gerencias = dados);
    this.onRefresh();

  }

  onRefresh() {
    this.depositos$ = this.service.list().pipe(
      catchError(error => {
        console.error(error);
        // this.error$.next(true);
        this.handleError();
        return empty();
      })
    );
  }

  handleError() {
    this.alertService.showAlertDanger('Erro ao carregar locais. tente mais tarde');

  }

  onEdit(codigo){
    this.router.navigate(['editar', codigo], {relativeTo: this.route});
  }

  onDelete(deposito){
    this.depositoSelecionado = deposito;
    this.deleteModalRef = this.modalService.show(this.deleteModal, {class: 'modal-sm'});
  }

  onConfirmDelete(){
    this.service.remove(this.depositoSelecionado.Id).subscribe(
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

  getTipoAtendimento(obj: TipoAtendimento){
    if(obj){
      return this.tipoAtendimentoList.find(x=>x.Codigo == obj.Codigo).Descricao;
    }
    return '';
  }
}
