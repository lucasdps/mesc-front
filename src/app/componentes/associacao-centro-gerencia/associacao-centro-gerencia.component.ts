import { Component, OnInit, ViewChild } from '@angular/core';
import { AssociacaoCentroGerencia } from '../../modulos/associacao-centro-gerencia/AssociacaoCentroGerencia';
import { AssociacaoCentroGerenciaService } from '../../servicos/AssociacaoCentroGerencia/associacao-centro-gerencia.service';
import { Subject, Observable, empty } from 'rxjs';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertService } from '../../servicos/alert/alert.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CentroService } from 'src/app/servicos/centro/centro.service';
import { GerenciaService } from '../../servicos/gerencia/gerencia.service';
import { catchError } from 'rxjs/operators';
import { Centro } from '../../modulos/centro/centro';
import { Gerencia } from '../../modulos/gerencia/gerencia';
import { identifierModuleUrl } from '@angular/compiler';

@Component({
  selector: 'app-associacao-centro-gerencia',
  templateUrl: './associacao-centro-gerencia.component.html',
  styleUrls: ['./associacao-centro-gerencia.component.css'],
  preserveWhitespaces: true
})
export class AssociacaoCentroGerenciaComponent implements OnInit {

  //bsModalRef: BsModalRef;
  deleteModalRef: BsModalRef;
  @ViewChild('deleteModal') deleteModal;
  cgSelecionado:  AssociacaoCentroGerencia;
  // Observable
  cg$: Observable< AssociacaoCentroGerencia[]>;

  centro$: Observable<Centro[]>;
  centroList: Centro[] = [];

  gerencia$: Observable<Gerencia[]>;
  gerenciaList: Gerencia[] = [];

  error$ = new Subject<boolean>();
  constructor(private service:  AssociacaoCentroGerenciaService,
    private serviceCentro:  CentroService,
    private serviceGerencia: GerenciaService,
    private modalService: BsModalService, // para modal de sim ou nao
    private alertService: AlertService,
    private router: Router,
    private route: ActivatedRoute) {

      this.centro$  = this.serviceCentro.list().pipe(
        catchError(error => {
          console.error(error);
          // this.error$.next(true);
          this.handleError();
          return empty();
        })
      );

      this.centro$.subscribe(data => {

          this.centroList = data;

      });
      console.log(this.centroList );


      this.gerencia$  = this.serviceGerencia.list().pipe(
        catchError(error => {
          console.error(error);
          // this.error$.next(true);
          this.handleError();
          return empty();
        })
      );
      this.gerencia$.subscribe(data => {
          this.gerenciaList = data;
      });
  }

  ngOnInit(): void {
    // this.service.list().subscribe(dados => this.gerencias = dados);
    this.onRefresh();

  }

  getListCentroById(codigo){
    return this.centroList.find( x=> x.Id == codigo);
  }

  getListGerenciaById(id){
    return this.gerenciaList.find( x=> x.id == id);
  }

  getAreaAtendida(bool){
    if(bool){
      return 'Sim';
    }else{
      return 'Não';
    }
  }

  onRefresh() {

    this.cg$ = this.service.list().pipe(
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
