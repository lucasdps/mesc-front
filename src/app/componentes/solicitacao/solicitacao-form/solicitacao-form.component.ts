import { MaterialService } from './../../../servicos/material/material.service';
import { Material } from './../../../modulos/material/material';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { AlertService } from './../../../servicos/alert/alert.service';
import { PrazoAtendimentoService } from 'src/app/servicos/prazo-atendimento/prazo-atendimento.service';
import { DepositoService } from './../../../servicos/deposito/deposito.service';
import { CentroService } from './../../../servicos/centro/centro.service';
import { SolicitacaoService } from './../../../servicos/solicitacao/solicitacao.service';
import { PrazoAtendimento } from './../../../modulos/prazo-atendimento/prazo-atendimento';
import { Deposito } from './../../../modulos/deposito/deposito';
import { Centro } from './../../../modulos/centro/centro';
import { Solicitacao } from './../../../modulos/solicitacao/solicitacao';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-solicitacao-form',
  templateUrl: './solicitacao-form.component.html',
  styleUrls: ['./solicitacao-form.component.css']
})
export class SolicitacaoFormComponent implements OnInit {

  sequencial: number = 0;
  form: FormGroup;
  submitted = false;
  strNpNmSAP: string = '';
  strLinkNpNmSAP: string = '';
  rbNPNM: string = 'NP';
  gerenciaPorCentro = '';
  listNPNM: string[] = [];

  solicitacaoRetornada: Solicitacao;

  solicitacoesRvt$: Observable<Material[]>;
  listMat: Material[] = [];
  listMatForaArea: Material[] = [];
  listMatNaoEncontrado: Material[] = [];
  listMatCompilado: Material[] = [];

  centro$: Observable<Centro[]>;
  listCentro: Centro[] = [];



  deposito$: Observable<Deposito[]>;
  listDeposito: Deposito[] = [];




  listPrazoAtendimento: PrazoAtendimento[] = [];
  prazosAtendimentos$: Observable<PrazoAtendimento[]>;


  constructor(private fb: FormBuilder,
    private service: SolicitacaoService,
    private serviceMaterial: MaterialService,
    private serviceCentro: CentroService,
    private serviceDeposito: DepositoService,
    private servicePrazoAtendimento: PrazoAtendimentoService,
    private modal: AlertService,
    public datepipe: DatePipe,
    //private location: Location,
    private route: ActivatedRoute) {

    this.centro$ = this.serviceCentro.list();
    this.centro$.subscribe(data => {
      this.listCentro = data;
    });





    //Listando as associações de Deposito e Local
    this.deposito$ = this.serviceDeposito.list();
    this.deposito$.subscribe(data => {
      this.listDeposito = data;
    });



    //Listando Prazos de atendimento
    this.prazosAtendimentos$ = this.servicePrazoAtendimento.list();
    this.prazosAtendimentos$.subscribe(data => {
      this.listPrazoAtendimento = data;
    });
  }

  ngOnInit(): void {

    console.log(this.route.snapshot.paramMap.get('id'));

    const solicitacao = this.route.snapshot.data['solicitacao'];
    this.form = this.fb.group({
      Id:[solicitacao.Id],
      Assunto: [solicitacao.Assunto],
      As:[solicitacao.As],
      Om: [solicitacao.Om],
      TipoCriticidade: [solicitacao.TipoCriticidade],
      JustificativaEmergencia: null,
      StatusSolicitacao: null,
      DataSolicitacao: null,
      Observacao: [solicitacao.Observacao],
      TipoMaterial: [solicitacao.TipoMaterial],
      TipoNpNm: [solicitacao.TipoNpNm],


    });
  }


  hasError(field: string) {
    return this.form.get(field).errors;
  }


  onSubmit(): void {
    if (this.listMatCompilado.length < 1) {
      this.modal.showAlertDanger('Preencha todos os campos!!');
      return;
    }

    this.submitted = true;
    let Id = null;
    let isCreate = true;
    if(this.route.snapshot.paramMap.get('id')){
      Id = this.route.snapshot.paramMap.get('id');
      isCreate = false;
    }
    const newSol = <Solicitacao>({
      Id: Id,
      As: this.form.value['As'],
      TipoMaterial: this.form.value['TipoMaterial'],
      Assunto: this.form.value['Assunto'],
      Om: this.form.value['Om'],
      Observacao: this.form.value['Observacao'],
      TipoCriticidade: this.form.value['TipoCriticidade'],
      JustificativaEmergencia: this.form.value['JustificativaEmergencia'],
      TipoNpNm: this.rbNPNM,
      DataSolicitacao: new Date()

    });



    this.service.save(newSol,isCreate).subscribe(
      (data: Solicitacao) => {
        this.solicitacaoRetornada = data;
        console.log(this.solicitacaoRetornada );
        this.listMatCompilado.forEach((item: Material) => {
          console.log(item);
          if (item.Check == true) {
            //item.Solicitacao = this.solicitacaoRetornada;
            item.SolicitacaoId = this.solicitacaoRetornada.Id;
            item.Centro = null;
            item.Deposito = null;
            this.serviceMaterial.save(item, true).subscribe(
              success => {
                this.modal.showAlertSucess('Salvo com sucesso! ' + item.Contador)
            },
              error => { this.modal.showAlertDanger('Erro ao salvar ' + item.Contador) },
              () => console.log('request save completo')
            );
          }
        });
       },
      error => { this.modal.showAlertDanger('Erro ao salvar') },
      () => console.log('request save completo')
    );


    if (this.form.valid) {
      console.log('submit');

      //this.service.save(this.form.value).subscribe(
      //  success => { this.modal.showAlertSucess('Salvo com sucesso!') },
      //  error => { this.modal.showAlertDanger('Erro ao salvar') },
      //  () => console.log('request save completo')
      // );

    }
  }

  onCancel(): void {
    this.submitted = false;
    this.form.reset();
  }


  onFileChange(event: any) {
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>(event.target);
    if (target.files.length !== 1) {
      throw new Error('Cannot use multiple files');
    }
    const reader: FileReader = new FileReader();
    reader.readAsBinaryString(target.files[0]);
    reader.onload = (e: any) => {
      /* create workbook */
      const binarystr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(binarystr, { type: 'binary' });

      /* selected the first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      const data = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], { range: 0, defval: "" });
      this.strNpNmSAP = "";
      data.some(element => {
        let elemento: string = element['NP ou NM'] + '';
        if(!elemento || elemento == '')
          return;
        elemento = elemento.replace('.','').trim();
        if (!this.listNPNM.some(x=>x == `${elemento}`.trim())) {
          this.strNpNmSAP += elemento + ';';
          this.listNPNM.push(`${elemento}`);
        }
      });
      this.strNpNmSAP = this.strNpNmSAP.substr(0, this.strNpNmSAP.length - 1);
      console.log(this.strNpNmSAP ); // Data will be logged in array format containing objects

      this.strLinkNpNmSAP = this.service.SAPScriptNpNm(this.rbNPNM, this.strNpNmSAP);
    };
  }

  onSetTipoCriticidade(event){

    //this.listMatCompilado.forEach(item =>{
      //item.TipoCriticidade = event.target.value;
    //});
  }

  onCalculaPrazoAtendimento(){
    let tp = this.form.value['TipoCriticidade'];
    this.listMatCompilado.forEach(item =>{
      item.DataSolicitacao = new Date();
      let days = 0;
      let prazo: PrazoAtendimento = this.listPrazoAtendimento.find(pa=>pa.TipoAtendimentoCodigo ==
        this.listDeposito.find(d=>d.Id == item.DepositoId).TipoAtendimentoCodigo
        &&
        item.QtdSolicitada >= pa.EscalaInicio  && item.QtdSolicitada <= pa.EscalaFim
        );
        console.log('onCalculaPrazoAtendimento');
        console.log(prazo)
        if(prazo){
          if(tp == 'N'){

            days = prazo.DiasUteisNormal;


           }
           else{
             days = prazo.DiasUteisEmergencia;

           }

            item.DataPrazoAtendimento = new Date(item.DataSolicitacao);
            item.DataSolicitacao = new Date(item.DataSolicitacao);
            console.log('dias adicionados para dtPA: ' + (days) + ' ' + item.DataSolicitacao.getDate() );
            item.DataPrazoAtendimento.setDate(item.DataSolicitacao.getDate() + (days));

            return this.getDateRender(item.DataPrazoAtendimento);


        }

    });
  }

  onExplodirItens(lista: Material[], tipoMaterial: string){
    lista.forEach(item =>{
      if(item.Check)
        if(tipoMaterial == 'S'){
          this.listMatCompilado.push(item);
        }else{
          for (let i = 1; i <= item.QtdSolicitada; i++) {
            let newItem = {
              Id: item.Id,
              Contador: item.Contador,

              SolicitacaoId: item.SolicitacaoId,
              Solicitacao: item.Solicitacao,

              DataSolicitacao: item.DataSolicitacao,
              DataPrazoAtendimento: item.DataPrazoAtendimento,
              DataCriacao: item.DataCriacao,
              NP: item.NP,
              NM: item.NM,
              DescricaoMaterial: item.DescricaoMaterial,
              NS: item.NS,
              BP: item.BP,
              Unidade: item.Unidade,

              CentroCodigo: item.CentroCodigo,
              Centro: item.Centro,

              DepositoId: item.DepositoId,
              Deposito: item.Deposito,

              QtdSaldoSAP: item.QtdSaldoSAP,
              QtdSolicitada: item.QtdSolicitada,
              Observacao: item.Observacao,
              JustificativaSol: item.JustificativaSol,
              JustificativaArea: item.JustificativaArea,
              StatusRvt: item.StatusRvt,
              Reserva: item.Reserva,
              ItemReserva: item.ItemReserva,
              Check: item.Check,
              SAP: item.SAP
            };
            newItem.QtdSolicitada = 1;
            newItem.Contador = newItem.Contador + (i/(10));
            this.listMatCompilado.push(newItem);
          }

        }

    });
  }

  onFinalizar(){
    let tipoMaterial = this.form.value['TipoMaterial'];
    this.listMatCompilado = [];

    this.onExplodirItens(this.listMat, tipoMaterial);
    this.onExplodirItens(this.listMatForaArea, tipoMaterial);
    this.onExplodirItens(this.listMatNaoEncontrado, tipoMaterial);
    this.onCalculaPrazoAtendimento();
  }

  onAddVerificandoUnicidade(list: Material[], item: Material){
    let tipoMaterial = this.form.value['TipoMaterial'];
    if (tipoMaterial == 'S') {
      if(!list.some(m=>m.NP == item.NP && m.NM==item.NM && m.CentroCodigo == item.CentroCodigo && m.DepositoId == item.DepositoId))
        list.push(item);
    }
    else{
      if(!list.some(m=>m.NP == item.NP && m.NM==item.NM && m.CentroCodigo == item.CentroCodigo && m.DepositoId == item.DepositoId))
        list.push(item);
    }


  }

  RetornarEstoqueSAPPorNPNM() {

    this.solicitacoesRvt$ = this.service.RetornarEstoqueSAPPorNPNM(this.rbNPNM, this.strNpNmSAP);

    this.solicitacoesRvt$.subscribe(data => {

      console.log(this.listMat);
      console.log(this.listMatForaArea);
      this.listNPNM.forEach(item => {

        let addNaoEncontrado = false;
        if(this.rbNPNM == "NP"){

          if(!this.listMat.some(x => x.NP == item) && !this.listMatForaArea.some(x => x.NP == item) ){
            addNaoEncontrado=true;//this.onAdd(this.listMatNaoEncontrado, item);
          }
        }
        else
        {
          if(this.listMat.some(x => x.NM == item) && this.listMatForaArea.some(x => x.NM == item) ){
            addNaoEncontrado=true;//this.onAdd(this.listMatNaoEncontrado, item);
          }
        }
        if(addNaoEncontrado)
          this.onAdd(this.listMatNaoEncontrado, item);


      });


    });




  }


  onChange(event, campo, itemFront: Material, listaGeral: Material[]) {
    //console.log(event.target.value + ' ' + campo + ' ' + itemFront.id);
    let inputValue;
    if (campo == 'Check'){
      inputValue = event.target.checked;

    }
    else
      inputValue = event.target.value;





    listaGeral.forEach(item => {
      if (item.Contador == itemFront.Contador) {
        item[campo] = inputValue;
        if(campo == 'QtdSolicitada'){

          if(item.SAP && (item.QtdSolicitada > item.QtdSaldoSAP || item.QtdSolicitada < 0)){
            item.QtdSolicitada = 0;
            event.target.value = 0;
            console.log('alerta de consumo acima do saldo SAP');
          }
        }
        if(campo == 'QtdSaldoSAP'){

          if(item.SAP != true){
            item.QtdSaldoSAP = 0;
            event.target.value = 0;
            console.log('item não teve verificação no SAP');
          }
        }
       
        if(campo == 'DepositoId'){
          item.Deposito = this.listDeposito.find(d=>d.Id == item.DepositoId);
        }
        if(campo == 'DataSolicitacao'){
          this.form.value['DataPrazoAtendimento'+item.Contador] = this.onCalculaPrazoAtendimento();
        }
        console.log(inputValue);
      }

    });



    return itemFront;
  }

  onAdd(lista: Material[], parameterNpNm?: string) {

    //pegando o maximo sequencial
    if (lista) {
      lista.forEach(item => {
        if (this.sequencial <= item.Contador) {
          this.sequencial = item.Contador
        }
      });
    }
    else {
      lista = [];
    }
    let NP = null;
    let NM = null;
    let SAP = null;

    if(parameterNpNm){

      if(this.rbNPNM == "NP")
        NP = parameterNpNm;
      else
        NM = parameterNpNm;
    }
    //adicionando elemento
    let newItem: Material = {

      Id: null,
      Contador: this.sequencial,

      SolicitacaoId: null,
      Solicitacao: null,

      DataSolicitacao: new Date(),
      DataPrazoAtendimento: null,
      DataCriacao: null,
      NP: NP,
      NM: NM,
      DescricaoMaterial: null,
      NS: null,
      BP: null,
      Unidade: null,

      CentroCodigo: null,
      Centro: null,

      DepositoId: null,
      Deposito: null,

      QtdSaldoSAP: null,
      QtdSolicitada: null,
      Observacao: null,
      JustificativaSol: null,
      JustificativaArea: null,
      StatusRvt: null,
      Reserva: null,
      ItemReserva: null,
      Check: null,
      SAP: null,
    };
    lista.push(newItem);
    this.sequencial++;

  }

  getDescricaoCentro(item: Centro) {
    this.listCentro.forEach(objeto => {
      if (objeto.Id == item.Id ) {
        return objeto.Id + '-' ;

      }
    });

  }


  getDescricaoDeposito(item: Deposito) {
    this.listDeposito.forEach(objeto => {
      if (objeto.Id == item.Id) {
       return objeto.CodigoSAP + '-' + objeto.DescricaoSAP

      }

    });

  }

  getDepositosByCentroCodigo(CentroCodigo: string){
    let aux: Deposito[] = [];
    this.listDeposito.filter(d=>d.CentroCodigo == CentroCodigo).forEach(item => {
      if(item.CentroCodigo == CentroCodigo){
        aux.push(item);
      }
    });



      return aux;

  }

  getDateRender(date){
    let auxDate = new Date(date);
    return this.datepipe.transform(auxDate, 'yyyy-MM-dd');
  }

}
