import { TipoAtendimentoService } from './../../servicos/tipo-atendimento/tipo-atendimento.service';
import { TipoAtendimento } from './../../modulos/tipo-atendimento/TipoAtendimento';
import { catchError } from 'rxjs/operators';
import { AlertService } from './../../servicos/alert/alert.service';
import { PrazoAtendimentoService } from './../../servicos/prazo-atendimento/prazo-atendimento.service';
import { PrazoAtendimento } from './../../modulos/prazo-atendimento/prazo-atendimento';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, Subject, empty } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-prazo-atendimento',
  templateUrl: './prazo-atendimento.component.html',
  styleUrls: ['./prazo-atendimento.component.css'],
  preserveWhitespaces: true
})
export class PrazoAtendimentoComponent implements OnInit {

  //bsModalRef: BsModalRef;
  deleteModalRef: BsModalRef;
  @ViewChild('deleteModal') deleteModal;
  prazoAtendimentoSelecionado: PrazoAtendimento;
  // Observable
  prazoAtendimentos$: Observable<PrazoAtendimento[]>;
  error$ = new Subject<boolean>();

  tipoAtendimento$: Observable<TipoAtendimento[]>;
  tipoAtendimentoList: TipoAtendimento[] = [];


  constructor(private service: PrazoAtendimentoService,
    private serviceTipoAtendimento: TipoAtendimentoService,
    private modalService: BsModalService, // para modal de sim ou nao
    private alertService: AlertService,
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

    this.onRefresh();

  }

  onRefresh() {
    this.prazoAtendimentos$ = this.service.list().pipe(
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

  onEdit(id) {
    this.router.navigate(['editar', id], { relativeTo: this.route });
  }

  onDelete(prazoAtendimento) {
    this.prazoAtendimentoSelecionado = prazoAtendimento;
    this.deleteModalRef = this.modalService.show(this.deleteModal, { class: 'modal-sm' });
  }

  onConfirmDelete() {
    this.service.remove(this.prazoAtendimentoSelecionado.Id).subscribe(
      success => {
        this.onRefresh();
        this.deleteModalRef.hide();
      },
      error => {
        this.alertService.showAlertDanger('Erro ao deletar');
        this.deleteModalRef.hide();
      }
    );
  }

  onDeclineDelete() {
    this.deleteModalRef.hide();
  }

  onSimOuNao(condicao) {
    if (condicao) {
      return 'Sim';
    } else {
      return 'Não';
    }
  }

  getDescricaoTipoAtendimento(Codigo) {
    try{
      return this.tipoAtendimentoList.find(x => x.Codigo == Codigo).Descricao;
    }catch(_e){
        let e:Error= _e;
        return  '';
    }

  }
}
