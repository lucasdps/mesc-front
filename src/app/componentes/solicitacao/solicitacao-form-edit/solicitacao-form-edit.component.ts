import { FormGroup, FormBuilder } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Solicitacao } from './../../../modulos/solicitacao/solicitacao';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-solicitacao-form-edit',
  templateUrl: './solicitacao-form-edit.component.html',
  styleUrls: ['./solicitacao-form-edit.component.css']
})
export class SolicitacaoFormEditComponent implements OnInit {
  solicitacao: Solicitacao;
  form: FormGroup;
  submitted = false;
  constructor(public bsModalRef: BsModalRef,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    const solicitacao = this.solicitacao;
    this.form = this.fb.group({
      Id:[solicitacao.Id],
      Assunto: [solicitacao.Assunto],
      As:[solicitacao.As],
      Om: [solicitacao.Om],
      TipoCriticidade: [solicitacao.TipoCriticidade],
      JustificativaEmergencia: null,
      StatusSolicitacao: null,
      DataSolicitacao: null,
      Observacao: [solicitacao.Observacao],
      TipoMaterial: [solicitacao.TipoMaterial],
      TipoNpNm: [solicitacao.TipoNpNm],


    });
  }

  onCloseSolicitacao(){
    this.bsModalRef.hide();
  }
  hasError(field: string) {
    return this.form.get(field).errors;
  }


  onSubmit(): void {



    if (this.form.valid) {
      console.log('submit');

      //this.service.save(this.form.value).subscribe(
      //  success => { this.modal.showAlertSucess('Salvo com sucesso!') },
      //  error => { this.modal.showAlertDanger('Erro ao salvar') },
      //  () => console.log('request save completo')
      // );

    }
  }

  onCancel(): void {
    this.submitted = false;
    this.form.reset();
  }
}
