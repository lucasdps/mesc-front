import { ActivatedRoute } from '@angular/router';
import { AlertService } from './../../../servicos/alert/alert.service';
import { TipoAtendimentoService } from './../../../servicos/tipo-atendimento/tipo-atendimento.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tipo-atendimento-form',
  templateUrl: './tipo-atendimento-form.component.html',
  styleUrls: ['./tipo-atendimento-form.component.css']
})
export class TipoAtendimentoFormComponent implements OnInit {

  form: FormGroup;
  submitted = false;
  isCreate: boolean = false;

  constructor(private fb: FormBuilder,
    private service: TipoAtendimentoService,
    private modal: AlertService,
     //private location: Location,
    private route: ActivatedRoute) {

    }

  ngOnInit(): void {

    if(!this.route.snapshot.paramMap.get('codigo')){
      this.isCreate = true;
  }

    const tipoAtendimento = this.route.snapshot.data['tipoAtendimento'];
    this.form = this.fb.group({
      Codigo: [tipoAtendimento.Codigo, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      Descricao: [tipoAtendimento.Descricao, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]]
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
