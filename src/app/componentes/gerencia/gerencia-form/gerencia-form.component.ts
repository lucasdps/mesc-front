import { AlertService } from './../../../servicos/alert/alert.service';
import { GerenciaService } from './../../../servicos/gerencia/gerencia.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {Location} from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-gerencia-form',
  templateUrl: './gerencia-form.component.html',
  styleUrls: ['./gerencia-form.component.css']
})
export class GerenciaFormComponent implements OnInit {

  form: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder,
    private service: GerenciaService,
     private modal: AlertService,
     private location: Location,
     private route: ActivatedRoute) { }

  ngOnInit(): void {
    /*
    this.route.params
    .pipe(
      map((params: any) => params['id']),
      switchMap(id => this.service.loadById(id))
    )
    .subscribe( (gerencia) => this.updateForm(gerencia));
    */

    const gerencia = this.route.snapshot.data['gerencia'];
    this.form = this.fb.group({
      id: [gerencia.id],
      nome: [gerencia.nome, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]]
    });
  }

  // concatMap -> ordem da requisição importa
  // mergeMap -> ordem nao importa
  // exhaustMap -> casos de login

  /*
  updateForm(gerencia){
    this.form.patchValue({
      id: gerencia.id,
      nome:gerencia.nome
    });
  }
  */
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
      /*
      if(this.form.value.id){
        //update
        this.service.update(this.form.value).subscribe(
          sussess => {
            this.modal.showAlertSucess('Atualizado com sucesso!')
            //,
           // this.location.back();
          } ,
          error => this.modal.showAlertDanger('Erro ao atualizar gerência'),
          () => console.log('request update completo')
        );
      }

      this.service.create(this.form.value).subscribe(
        sussess => {
          this.modal.showAlertSucess('Criado com sucesso!')
          //,
         // this.location.back();
        } ,
        error => this.modal.showAlertDanger('Erro ao cadastrar gerência'),
        () => console.log('request insert completo')
      );
      */
    }
  }

  onCancel(): void {
    this.submitted = false;
    this.form.reset();
  }
}
