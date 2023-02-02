import { Component, OnInit, ViewChild } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { empty, Subject, Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/servicos/alert/alert.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AssociacaoDepositoLocalService } from '../../servicos/associacao-deposito-local/associacao-deposito-local.service';
import { Local } from '../../modulos/local/local';
import { Deposito } from '../../modulos/deposito/deposito';
import { AssociacaoDepositoLocal } from '../../modulos/associacao-deposito-local/associacao-deposito-local';
import { LocalService } from '../../servicos/local/local.service';
import { DepositoService } from '../../servicos/deposito/deposito.service';

@Component({
  selector: 'app-associacao-deposito-local',
  templateUrl: './associacao-deposito-local.component.html',
  styleUrls: ['./associacao-deposito-local.component.css']
})
export class AssociacaoDepositoLocalComponent implements OnInit {

  //bsModalRef: BsModalRef;
  deleteModalRef: BsModalRef;
  @ViewChild('deleteModal') deleteModal;
  cgSelecionado:  AssociacaoDepositoLocal;
  // Observable
  dl$: Observable< AssociacaoDepositoLocal[]>;



  error$ = new Subject<boolean>();
  constructor(private service:  AssociacaoDepositoLocalService,
    private modalService: BsModalService, // para modal de sim ou nao
    private alertService: AlertService,
    private router: Router,
    private route: ActivatedRoute) {


  }

  ngOnInit(): void {
    // this.service.list().subscribe(dados => this.gerencias = dados);
    this.onRefresh();

  }



  onRefresh() {

    this.dl$ = this.service.list().pipe(
      catchError(error => {
        console.error(error);
        // this.error$.next(true);
        this.handleError();
        return empty();
      })
    );
  }

  handleError() {
    this.alertService.showAlertDanger('Erro ao carregar centros. tente mais tarde');

  }

  onEdit(id){
    this.router.navigate(['editar', id], {relativeTo: this.route});
  }

  onDelete(cg){
    this.cgSelecionado = cg;
    this.deleteModalRef = this.modalService.show(this.deleteModal, {class: 'modal-sm'});
  }

  onConfirmDelete(){
    this.service.remove(this.cgSelecionado.id).subscribe(
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

}
