import { AlertService } from './../../../servicos/alert/alert.service';
import { CentroService } from './../../../servicos/centro/centro.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-centro-form',
  templateUrl: './centro-form.component.html',
  styleUrls: ['./centro-form.component.css'],
  preserveWhitespaces: true
})
export class CentroFormComponent implements OnInit {

  form: FormGroup;
  submitted = false;
  isCreate: boolean = false;

  constructor(private fb: FormBuilder,
    private service: CentroService,
     private modal: AlertService,
     private location: Location,
     private route: ActivatedRoute) { }

  ngOnInit(): void {

    if(!this.route.snapshot.paramMap.get('codigo')){
      this.isCreate = true;
    }
    console.log('será criado elemento? ' + this.isCreate);

    const centro = this.route.snapshot.data['centro'];
    this.form = this.fb.group({
      Codigo: [centro.Codigo, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      Descricao: [centro.Descricao, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      DescricaoSAP: [centro.DescricaoSAP, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      NomeGerencia: [centro.NomeGerencia, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      AreaAtendimento: [centro.AreaAtendimento, [Validators.required]]
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

      this.service.save(this.isCreate, this.form.value).subscribe(
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
