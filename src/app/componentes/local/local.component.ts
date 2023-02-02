import { catchError } from 'rxjs/operators';
import { Route } from '@angular/compiler/src/core';
import { AlertService } from './../../servicos/alert/alert.service';
import { LocalService } from './../../servicos/local/local.service';
import { Local } from './../../modulos/local/local';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, Subject, empty } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-local',
  templateUrl: './local.component.html',
  styleUrls: ['./local.component.css'],
  preserveWhitespaces: true
})
export class LocalComponent implements OnInit {

  deleteModalRef: BsModalRef;
  @ViewChild('deleteModal') deleteModal;
  localSelecionado: Local;
  // Observable
  locais$: Observable<Local[]>;
  error$ = new Subject<boolean>();
  constructor(private service: LocalService,
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
    this.locais$ = this.service.list().pipe(
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

  onDelete(local){
    this.localSelecionado = local;
    this.deleteModalRef = this.modalService.show(this.deleteModal, {class: 'modal-sm'});
  }

  onConfirmDelete(){
    this.service.remove(this.localSelecionado.id).subscribe(
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
