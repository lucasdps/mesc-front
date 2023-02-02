import { SolicitacaoRvtService } from './../../servicos/solicitacao-rvt.service';
import { SolicitacaoRvt } from './../../modulos/solicitacao-rvt/solicitacao-rvt';
import { Component, OnInit, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable, Subject, empty } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AlertService } from 'src/app/servicos/alert/alert.service';
import { ActivatedRoute, Router } from '@angular/router';


import * as XLSX from 'xlsx';

@Component({
  selector: 'app-solicitacao-rvt',
  templateUrl: './solicitacao-rvt.component.html',
  styleUrls: ['./solicitacao-rvt.component.css'],
  preserveWhitespaces: true
})
export class SolicitacaoRvtComponent implements OnInit {

  deleteModalRef: BsModalRef;
  @ViewChild('deleteModal') deleteModal;
  solicitacaoRvtSelecionado: SolicitacaoRvt;
  // Observable
  solicitacoesRvt$: Observable<SolicitacaoRvt[]>;
  error$ = new Subject<boolean>();
  constructor(private service: SolicitacaoRvtService,
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
    this.service.remove(this.solicitacaoRvtSelecionado.id).subscribe(
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


  onFileChange(event: any) {
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>(event.target);
    if (target.files.length !== 1) {
      throw new Error('Cannot use multiple files');
    }
    const reader: FileReader = new FileReader();
    reader.readAsBinaryString(target.files[0]);
    reader.onload = (e: any) => {
      /* create workbook */
      const binarystr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(binarystr, { type: 'binary' });

      /* selected the first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      const data = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], { range: 6, defval: "" });
      console.log(data); // Data will be logged in array format containing objects
    };
 }



}
