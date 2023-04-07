import { catchError } from 'rxjs/operators';
import { AlertService } from './../../servicos/alert/alert.service';
import { EntradaService } from './../../servicos/entrada/entrada.service';
import { Entrada } from './../../modulos/entrada/entrada';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject, Observable, empty } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-entrada',
  templateUrl: './entrada.component.html',
  styleUrls: ['./entrada.component.css'],
  preserveWhitespaces: true
})
export class EntradaComponent implements OnInit {

  deleteModalRef: BsModalRef;
  @ViewChild('deleteModal') deleteModal;
  calculoModalRef: BsModalRef;
  @ViewChild('calculoModal') calculoModal;

  entradaSelecionado: Entrada;
  // Observable
  entradas$: Observable<Entrada[]>;
  error$ = new Subject<boolean>();
  constructor(private service: EntradaService,
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
    this.entradas$ = this.service.list().pipe(
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
    this.entradaSelecionado = entrada;
    this.deleteModalRef = this.modalService.show(this.deleteModal, {class: 'modal-sm'});
  }

  onCalculo(entrada){
    this.entradaSelecionado = entrada;
    this.calculoModalRef = this.modalService.show(this.calculoModal, {class: 'modal-sm'});
  }

  onConfirmCalculo(){
    this.service.CalcularProgramacaoLinear(this.entradaSelecionado.id).subscribe(
      success => {
        this.onRefresh();
        this.calculoModalRef.hide();
      },
      error =>{
        this.alertService.showAlertDanger('Erro ao executar programação linear');
        this.calculoModalRef.hide();
      }
    );
  }

  onConfirmDelete(){
    this.service.remove(this.entradaSelecionado.id).subscribe(
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

  onDeclineCalculo(){
    this.calculoModalRef.hide();
  }




}
