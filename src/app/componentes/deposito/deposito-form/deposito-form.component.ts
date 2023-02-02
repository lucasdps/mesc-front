import { TipoAtendimentoService } from './../../../servicos/tipo-atendimento/tipo-atendimento.service';
import { TipoAtendimento } from './../../../modulos/tipo-atendimento/TipoAtendimento';
import { DepositoService } from './../../../servicos/deposito/deposito.service';
import { AlertService } from './../../../servicos/alert/alert.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CentroService } from 'src/app/servicos/centro/centro.service';
import { Centro } from 'src/app/modulos/centro/centro';
import { Subject, Observable, empty } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-deposito-form',
  templateUrl: './deposito-form.component.html',
  styleUrls: ['./deposito-form.component.css'],
  preserveWhitespaces: true
})
export class DepositoFormComponent implements OnInit {

  form: FormGroup;
  submitted = false;
  isCreate: boolean = false;

  centro$: Observable<Centro[]>;
  centroList: Centro[] = [];

  tipoAtendimento$: Observable<TipoAtendimento[]>;
  tipoAtendimentoList: TipoAtendimento[] = [];

  constructor(private fb: FormBuilder,
    private service: DepositoService,
    private serviceCentro:  CentroService,
    private serviceTipoAtendimento:  TipoAtendimentoService,
    private modal: AlertService,
     //private location: Location,
    private route: ActivatedRoute) {
        this.centro$  = this.serviceCentro.list().pipe(
          catchError(error => {
            console.error(error);
            // this.error$.next(true);
            //s this.handleError();
            return empty();
          })
        );
        this.centro$.subscribe(data => {

          this.centroList = data;

      });
      console.log(this.centroList );


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

    if(!this.route.snapshot.paramMap.get('Id')){
      this.isCreate = true;
  }

    const deposito = this.route.snapshot.data['deposito'];
    this.form = this.fb.group({
      Id: [deposito.Id],
      CodigoSAP: [deposito.CodigoSAP, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      Descricao: [deposito.Descricao, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      DescricaoSAP: [deposito.DescricaoSAP, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      CentroCodigo: [deposito.CentroCodigo, [Validators.required]],
      TipoAtendimentoCodigo: [deposito.TipoAtendimentoCodigo, [Validators.required]]
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

      this.service.save(this.form.value, this.isCreate).subscribe(
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
