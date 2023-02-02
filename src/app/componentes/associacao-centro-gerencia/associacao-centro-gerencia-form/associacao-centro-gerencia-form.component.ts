import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CentroService } from '../../../servicos/centro/centro.service';
import { AssociacaoCentroGerenciaService } from '../../../servicos/AssociacaoCentroGerencia/associacao-centro-gerencia.service';
import { AlertService } from '../../../servicos/alert/alert.service';

import { GerenciaService } from '../../../servicos/gerencia/gerencia.service';
import { Observable, empty } from 'rxjs';
import { Centro } from '../../../modulos/centro/centro';
import { Gerencia } from 'src/app/modulos/gerencia/gerencia';
import { catchError } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-associacao-centro-gerencia-form',
  templateUrl: './associacao-centro-gerencia-form.component.html',
  styleUrls: ['./associacao-centro-gerencia-form.component.css'],
  preserveWhitespaces: true
})
export class AssociacaoCentroGerenciaFormComponent implements OnInit {
  form: FormGroup;
  submitted = false;




  constructor(private fb: FormBuilder,
    private service: AssociacaoCentroGerenciaService,
    private modal: AlertService,
    private route: ActivatedRoute) {



  }

  ngOnInit(): void {

    console.log(this.route.snapshot.paramMap.get('id'));

    const cg = this.route.snapshot.data['AssociacaoCentroGerencia'];

    this.form = this.fb.group({
      id: [cg.id],
      centro: [cg.centro],
      centroDescricao: [cg.centroDescricao],
      gerencia: [cg.gerencia],
      areaAtendida: [cg.areaAtendida]
    });
  }


  hasError(field: string) {
    return this.form.get(field).errors;
  }


  onSubmit(): void {
    this.submitted = true;
    console.log(this.form.value);
    if (this.form.valid) {
      console.log('submit');

      this.service.save(this.form.value).subscribe(
        success => { this.modal.showAlertSucess('Salvo com sucesso!') },
        error => { this.modal.showAlertDanger('Erro ao salvar') },
        () => console.log('request save completo')
      );

    }
  }

  onCancel(): void {
    this.submitted = false;
    this.form.reset();
  }
}
