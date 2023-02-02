import { AlertService } from './../../servicos/alert/alert.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { GerenciaService } from '../../servicos/gerencia/gerencia.service'
import { Gerencia } from 'src/app/modulos/gerencia/gerencia';
import { Observable, empty, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BsModalService, ModalContainerComponent, BsModalRef } from 'ngx-bootstrap/modal';
import { AlertComponent } from '../shared/alert/alert.component';
import { Route } from '@angular/compiler/src/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-gerencia',
  templateUrl: './gerencia.component.html',
  styleUrls: ['./gerencia.component.css'],
  preserveWhitespaces: true
})
export class GerenciaComponent implements OnInit {

  // gerencias: Gerencia[];


  //bsModalRef: BsModalRef;
  deleteModalRef: BsModalRef;
  @ViewChild('deleteModal') deleteModal;
  gerenciaSelecionada: Gerencia;
  // Observable
  gerencias$: Observable<Gerencia[]>;
  error$ = new Subject<boolean>();
  constructor(private service: GerenciaService,
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
    this.gerencias$ = this.service.list().pipe(
      catchError(error => {
        console.error(error);
        // this.error$.next(true);
        this.handleError();
        return empty();
      })
    );
  }

  handleError() {
    this.alertService.showAlertDanger('Erro ao carregar gerências. tente mais tarde');
    // this.bsModalRef = this.modalService.show(AlertComponent);
    // this.bsModalRef.content.type = 'danger';
    // this.bsModalRef.content.message = 'Erro ao carregar gerências';

  }

  onEdit(id){
    this.router.navigate(['editar',id], {relativeTo: this.route});
  }

  onDelete(gerencia){
    this.gerenciaSelecionada = gerencia;
    this.deleteModalRef = this.modalService.show(this.deleteModal, {class:'modal-sm'});
  }

  onConfirmDelete(){
    this.service.remove(this.gerenciaSelecionada.id).subscribe(
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
