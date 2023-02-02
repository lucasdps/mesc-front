import { SolicitacaoFormEditComponent } from './../solicitacao/solicitacao-form-edit/solicitacao-form-edit.component';
import { Solicitacao } from './../../modulos/solicitacao/solicitacao';
import { MaterialService } from './../../servicos/material/material.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { Material } from './../../modulos/material/material';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.css']
})
export class MaterialComponent implements OnInit {

  //@Input() message: string;
  //@Input() type = 'success';
  solicitacao: any;

  materiais$: Observable<Material[]>;
  listMateriais: Material[];

  constructor(public bsModalRef: BsModalRef,
    private modalService: BsModalService,
    private materialService: MaterialService ) { }

  ngOnInit(): void {
    this.materiais$=  this.materialService.loadBySolicitacaoId(this.solicitacao.Id);
    this.materiais$.subscribe(data => {
      this.listMateriais = data;
    });
  }

  onEditSolicitacao(){
    const initialState = {solicitacao: this.solicitacao};
    let bsModalRef =  this.modalService.show(SolicitacaoFormEditComponent, {initialState} );
    bsModalRef.setClass('modal-lg');
  }


  onCloseMaterial(){
    this.bsModalRef.hide();
  }



}
