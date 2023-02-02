import { AlertService } from './../../../servicos/alert/alert.service';
import { UsuarioService } from './../../../servicos/usuario/usuario.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.css'],
  preserveWhitespaces: true
})
export class UsuarioFormComponent implements OnInit {

  form: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder,
    private service: UsuarioService,
     private modal: AlertService,
     //private location: Location,
     private route: ActivatedRoute) { }

  ngOnInit(): void {

    console.log(this.route.snapshot.paramMap.get('id'));

    const usuario = this.route.snapshot.data['usuario'];
    this.form = this.fb.group({
      id: [usuario.id],
      nome: [usuario.nome, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      chave: [usuario.chave, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      gerencia: [usuario.gerencia, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      perfil: [usuario.perfil, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]]
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
