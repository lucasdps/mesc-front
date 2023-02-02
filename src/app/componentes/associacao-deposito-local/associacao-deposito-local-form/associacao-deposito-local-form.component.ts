import { Component, OnInit } from '@angular/core';
import { AssociacaoDepositoLocalService } from '../../../servicos/associacao-deposito-local/associacao-deposito-local.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Deposito } from '../../../modulos/deposito/deposito';
import { Observable, empty } from 'rxjs';
import { Local } from '../../../modulos/local/local';
import { LocalService } from '../../../servicos/local/local.service';
import { DepositoService } from '../../../servicos/deposito/deposito.service';
import { AlertService } from 'src/app/servicos/alert/alert.service';
import { ActivatedRoute } from '@angular/router';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-associacao-deposito-local-form',
  templateUrl: './associacao-deposito-local-form.component.html',
  styleUrls: ['./associacao-deposito-local-form.component.css'],
  preserveWhitespaces: true
})
export class AssociacaoDepositoLocalFormComponent implements OnInit {

  form: FormGroup;
  submitted = false;

  deposito$: Observable<Deposito[]>;
  depositoList: Deposito[] = [];

  local$: Observable<Local[]>;
  localList: Local[] = [];


  constructor(private fb: FormBuilder,
    private service: AssociacaoDepositoLocalService,
    private serviceDeposito: DepositoService,
    private serviceLocal: LocalService,
    private modal: AlertService,
    private route: ActivatedRoute) {

    this.deposito$ = this.serviceDeposito.list().pipe(
      catchError(error => {
        console.error(error);
        // this.error$.next(true);
        return empty();
      })
    );

    this.deposito$.subscribe(data => {

      this.depositoList = data;

    });
    console.log(this.depositoList);


    this.local$ = this.serviceLocal.list().pipe(
      catchError(error => {
        console.error(error);
        // this.error$.next(true);
        return empty();
      })
    );
    this.local$.subscribe(data => {
      this.localList = data;
    });

  }

  ngOnInit(): void {




    console.log(this.route.snapshot.paramMap.get('id'));

    const cg = this.route.snapshot.data['AssociacaoDepositoLocal'];

    this.form = this.fb.group({
      id: [cg.id],
      deposito: [cg.deposito],
      local: [cg.local]
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
