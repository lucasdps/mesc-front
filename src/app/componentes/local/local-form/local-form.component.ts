import { AlertService } from './../../../servicos/alert/alert.service';
import { LocalService } from './../../../servicos/local/local.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-local-form',
  templateUrl: './local-form.component.html',
  styleUrls: ['./local-form.component.css']
})
export class LocalFormComponent implements OnInit {

  form: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder,
    private service: LocalService,
     private modal: AlertService,
     private location: Location,
     private route: ActivatedRoute) { }

  ngOnInit(): void {

    console.log(this.route.snapshot.paramMap.get('id'));

    const local = this.route.snapshot.data['local'];
    this.form = this.fb.group({
      id: [local.id],
      descricao: [local.descricao, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      canteiro: [local.canteiro]
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
