import { EntradaService } from './../../../servicos/entrada/entrada.service';
import { AlertService } from 'src/app/servicos/alert/alert.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-entrada-form',
  templateUrl: './entrada-form.component.html',
  styleUrls: ['./entrada-form.component.css'],
  preserveWhitespaces: true
})

export class EntradaFormComponent implements OnInit {
  form: FormGroup;
  submitted = false;
  isCreate: boolean = false;


  constructor(private fb: FormBuilder,
    private service: EntradaService,
     private modal: AlertService,
     private location: Location,
     private route: ActivatedRoute) { }

  ngOnInit(): void {

    if(!this.route.snapshot.paramMap.get('id')){
      this.isCreate = true;
    }
    console.log('será criado elemento? ' + this.isCreate);

    const entradaCadastroDto = this.route.snapshot.data['entrada'];
    this.form = this.fb.group({
      Descricao: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      Path: [null, [Validators.required]],
      DataCriacao: [null],
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

  onFileChange(fileList: FileList): void {
     this.form.patchValue({Path: fileList[0].name});
  }

}
