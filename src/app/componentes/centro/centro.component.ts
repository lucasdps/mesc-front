import { catchError } from 'rxjs/operators';
import { AlertService } from './../../servicos/alert/alert.service';
import { CentroService } from './../../servicos/centro/centro.service';
import { Centro } from './../../modulos/centro/centro';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject, Observable, empty } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-centro',
  templateUrl: './centro.component.html',
  styleUrls: ['./centro.component.css'],
  preserveWhitespaces: true
})
export class CentroComponent implements OnInit {
 // gerencias: Gerencia[];


  //bsModalRef: BsModalRef;
  deleteModalRef: BsModalRef;
  @ViewChild('deleteModal') deleteModal;
  centroSelecionado: Centro;
  // Observable
  centros$: Observable<Centro[]>;
  error$ = new Subject<boolean>();
  constructor(private service: CentroService,
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
    this.centros$ = this.service.list().pipe(
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

  onEdit(codigo){
    this.router.navigate(['editar', codigo], {relativeTo: this.route});
  }

  onDelete(centro){
    this.centroSelecionado = centro;
    this.deleteModalRef = this.modalService.show(this.deleteModal, {class: 'modal-sm'});
  }

  onConfirmDelete(){
    this.service.remove(this.centroSelecionado.Id).subscribe(
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

  isAreaAtendimento(n){
    if(n==0){
      return 'Não';
    }
    else{
      return 'Sim';
    }
  }



}
