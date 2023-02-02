import { DatePipe } from '@angular/common';
import { MaterialComponent } from './../material/material.component';
import { catchError } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from './../../servicos/alert/alert.service';
import { Observable, Subject, empty } from 'rxjs';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { SolicitacaoService } from './../../servicos/solicitacao/solicitacao.service';
import { Solicitacao } from './../../modulos/solicitacao/solicitacao';
import { Component, OnInit, ViewChild } from '@angular/core';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-solicitacao',
  templateUrl: './solicitacao.component.html',
  styleUrls: ['./solicitacao.component.css']
})
export class SolicitacaoComponent implements OnInit {

  dtOptions: any = {};

  deleteModalRef: BsModalRef;
  @ViewChild('deleteModal') deleteModal;
  solicitacaoRvtSelecionado: Solicitacao;
  // Observable
  solicitacoesRvt$: Observable<Solicitacao[]>;
  error$ = new Subject<boolean>();
  constructor(private service: SolicitacaoService,
    private modalService: BsModalService, // para modal de sim ou nao
    private alertService: AlertService,
    private router: Router,
    private route: ActivatedRoute,
    public datepipe: DatePipe,) {
  }

  ngOnInit(): void {
    // this.service.list().subscribe(dados => this.gerencias = dados);
    this.onRefresh();

    this.dtOptions = {
      ajax: {
        "url": this.service.caminhoGet(),
        "dataSrc": "",
        "dataType": "json"
      },
      "columns": [
        { "data": "Id", "name": "Id", "title": "ID" },
        {
          "data": null, "title": "Tipo Material",
          "render": function (data, type, row, meta) {
            if (data.TipoMaterial == 'E') {
              return 'Equipamento'
            }
            else if(data.TipoMaterial == 'F'){
              return 'Ferramenta';
            }else{
              return 'Sobressalente';
            }


          }
      },
        { "data": "Assunto", "name": "Assunto", "title": "Assunto" },
        { "data": "As", "name": "As", "title": "As" },
        { "data": "Om", "name": "Om", "title": "Om" },
        {
            "data": null, "title": "Tipo criticidade",
            "render": function (data, type, row, meta) {
              if (data.TipoCriticidade == 'E') {
                return 'Emergência'
              }
              else{
                return 'Normal';
              }


            }
        },
        { "data": "JustificativaEmergencia", "name": "JustificativaEmergencia", "title": "Justificativa Emergência" },
        {
            "data": null, "title": "Status Solicitação",
            "render": function (data, type, row, meta) {
              if (data.StatusSolicitacao == 'E') {
                return 'Em execução'
              }
              else{
                return 'Em execução';
              }


            }
        },
        {
          "data": null, "title": "Data Solicitação",
          "render": function (data, type, row, meta) {
            var aux = data.DataSolicitacao + "";
            var date = aux.split('T')[0].split('-');
          return  (date[2] + '/' +date[1] + '/' + date[0]);

          }
      },
        { "data": "Observacao", "name": "Observacao", "title": "Observação" }

      ],
      rowCallback: (row: Node, data: any[] | Object, index: number) => {
        const self = this;
        // Unbind first in order to avoid any duplicate handler
        // (see https://github.com/l-lin/angular-datatables/issues/87)
        // Note: In newer jQuery v3 versions, `unbind` and `bind` are
        // deprecated in favor of `off` and `on`
        $('td', row).off('click');
        $('td', row).on('click', () => {
          let modalConfig = {animated: true, keyboard:true, backdrop:true, ignoreBackdropClick: false}
          const initialState = {solicitacao: data};
          let bsModalRef =  this.modalService.show(MaterialComponent, {initialState} );
          bsModalRef.setClass('modal-lg');
        });
        return row;
      }
    };

  }

  onRefresh() {
    this.solicitacoesRvt$ = this.service.list().pipe(
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

  onEdit(id){
    this.router.navigate(['editar', id], {relativeTo: this.route});
  }

  onDelete(solicitacaoRvt){
    this.solicitacaoRvtSelecionado = solicitacaoRvt;
    this.deleteModalRef = this.modalService.show(this.deleteModal, {class: 'modal-sm'});
  }

  onConfirmDelete(){
    this.service.remove(this.solicitacaoRvtSelecionado.Id).subscribe(
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

  getDateRender(date){
    this.datepipe.transform(date, 'yyyy-MM-dd');
    return date;
  }


}
