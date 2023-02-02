import { TipoAtendimentoService } from './../../servicos/tipo-atendimento/tipo-atendimento.service';
import { catchError } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from './../../servicos/alert/alert.service';
import { Subject, Observable, empty } from 'rxjs';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { TipoAtendimento } from './../../modulos/tipo-atendimento/TipoAtendimento';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-tipo-atendimento',
  templateUrl: './tipo-atendimento.component.html',
  styleUrls: ['./tipo-atendimento.component.css'],
  preserveWhitespaces: true
})
export class TipoAtendimentoComponent implements OnInit {

   //bsModalRef: BsModalRef;
   deleteModalRef: BsModalRef;
   @ViewChild('deleteModal') deleteModal;
   tipoAtendimentoSelecionado: TipoAtendimento;
   // Observable
   tipoAtendimentos$: Observable<TipoAtendimento[]>;
   error$ = new Subject<boolean>();
  constructor(private service: TipoAtendimentoService,
    private modalService: BsModalService, // para modal de sim ou nao
    private alertService: AlertService,
    private router: Router,
    private route: ActivatedRoute) { }

    ngOnInit(): void {
      // this.service.list().subscribe(dados => this.gerencias = dados);
      this.onRefresh();

    }

    onRefresh() {
      this.tipoAtendimentos$ = this.service.list().pipe(
        catchError(error => {
          console.error(error);
          // this.error$.next(true);
          this.handleError();
          return empty();
        })
      );
    }

    handleError() {
      this.alertService.showAlertDanger('Erro ao carregar tipos de atendimentos. tente mais tarde');

    }

    onEdit(codigo){
      this.router.navigate(['editar', codigo], {relativeTo: this.route});
    }

    onDelete(centro){
      this.tipoAtendimentoSelecionado = centro;
      this.deleteModalRef = this.modalService.show(this.deleteModal, {class: 'modal-sm'});
    }

    onConfirmDelete(){
      this.service.remove(this.tipoAtendimentoSelecionado.Codigo).subscribe(
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
