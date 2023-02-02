import { TipoAtendimentoService } from './../../../servicos/tipo-atendimento/tipo-atendimento.service';
import { TipoAtendimento } from './../../../modulos/tipo-atendimento/TipoAtendimento';
import { PrazoAtendimentoService } from './../../../servicos/prazo-atendimento/prazo-atendimento.service';
import { AlertService } from './../../../servicos/alert/alert.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { empty, Observable } from 'rxjs';

@Component({
  selector: 'app-prazo-atendimento-form',
  templateUrl: './prazo-atendimento-form.component.html',
  styleUrls: ['./prazo-atendimento-form.component.css']
})
export class PrazoAtendimentoFormComponent implements OnInit {

  form: FormGroup;
  submitted = false;

  tipoAtendimento$: Observable<TipoAtendimento[]>;
  tipoAtendimentoList: TipoAtendimento[] = [];

  constructor(private fb: FormBuilder,
    private service: PrazoAtendimentoService,
    private serviceTipoAtendimento: TipoAtendimentoService,
     private modal: AlertService,
     //private location: Location,
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

    console.log(this.route.snapshot.paramMap.get('id'));

    const prazoAtendimento = this.route.snapshot.data['prazoAtendimento'];


    this.form = this.fb.group({
      Id: [prazoAtendimento.Id],
      EscalaInicio: [prazoAtendimento.EscalaInicio],
      EscalaFim: [prazoAtendimento.EscalaFim],
      DiasUteisNormal: [prazoAtendimento.DiasUteisNormal],
      DiasUteisEmergencia: [prazoAtendimento.DiasUteisEmergencia],
      TipoAtendimentoCodigo: [prazoAtendimento.TipoAtendimentoCodigo]
    });
  }


  hasError (field: string){
    return this.form.get(field).errors;
  }


  onSubmit(): void {
    this.submitted = true;
    console.log(this.form.value);
    if (this.form.valid){
      console.log('submit');

      this.service.save(this.form.value).subscribe(
        success => { this.modal.showAlertSucess('Salvo com sucesso!')},
        error => {this.modal.showAlertDanger('Erro ao salvar')},
        () => console.log('request save completo')
      );

    }
  }

  onCancel(): void {
    this.submitted = false;
    this.form.reset();
  }



}
