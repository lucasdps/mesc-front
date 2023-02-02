import { DepositoService } from './../../../servicos/deposito/deposito.service';
import { CentroService } from './../../../servicos/centro/centro.service';
import { Deposito } from './../../../modulos/deposito/deposito';
import { Centro } from './../../../modulos/centro/centro';
import { AlertService } from './../../../servicos/alert/alert.service';
import { SolicitacaoRvtService } from './../../../servicos/solicitacao-rvt.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import * as XLSX from 'xlsx';
import { Observable } from 'rxjs';
import { SolicitacaoRvt } from 'src/app/modulos/solicitacao-rvt/solicitacao-rvt';
//import { catchError } from 'rxjs/operators';

import { find } from 'rxjs/operators';

import { PrazoAtendimentoService } from 'src/app/servicos/prazo-atendimento/prazo-atendimento.service';
import { PrazoAtendimento } from '../../../modulos/prazo-atendimento/prazo-atendimento';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-solicitacao-rvt-form',
  templateUrl: './solicitacao-rvt-form.component.html',
  styleUrls: ['./solicitacao-rvt-form.component.css'],
  preserveWhitespaces: true
})
export class SolicitacaoRvtFormComponent implements OnInit {

  sequencial: number = 0;
  form: FormGroup;
  submitted = false;
  strNpNmSAP: string = '';
  strLinkNpNmSAP: string = '';
  rbNPNM: string = 'NP';
  gerenciaPorCentro = '';
  listNPNM: string[] = [];

  solicitacoesRvt$: Observable<SolicitacaoRvt[]>;
  listSolRvt: SolicitacaoRvt[] = [];
  listSolRvtForaArea: SolicitacaoRvt[] = [];
  listSolRvtNaoEncontrado: SolicitacaoRvt[] = [];
  listSolRvtCompilado: SolicitacaoRvt[] = [];

  centro$: Observable<Centro[]>;
  listCentro: Centro[] = [];



  deposito$: Observable<Deposito[]>;
  listDeposito: Deposito[] = [];




  listPrazoAtendimento: PrazoAtendimento[] = [];
  prazosAtendimentos$: Observable<PrazoAtendimento[]>;


  constructor(private fb: FormBuilder,
    private service: SolicitacaoRvtService,
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

    const solicitacaoRvt = this.route.snapshot.data['solicitacaoRvt'];
    this.form = this.fb.group({
      id: [solicitacaoRvt.id],
      npNm: [solicitacaoRvt.npNm],
      assunto: [solicitacaoRvt.assunto],
      numeroAS: [solicitacaoRvt.numeroAS],
      numeroOrdem: [solicitacaoRvt.numeroOrdem],
      tipoCriticidade: [solicitacaoRvt.tipoCriticidade],
      justificativaEmergencia: [solicitacaoRvt.justificativaEmergencia],
      solicitacao: [solicitacaoRvt.solicitacao],
      statusSolicitacao: [solicitacaoRvt.statusSolicitacao],
      dataSolicitacao: [solicitacaoRvt.dataSolicitacao],
      usuarioSolicitante: [solicitacaoRvt.usuarioSolicitante],
      gerenciaSolicitante: [solicitacaoRvt.gerenciaSolicitante],
      justificativaASOrdem: [solicitacaoRvt.justificativaASOrdem],
      observacao: [solicitacaoRvt.observacao],
      tipoMaterial: [solicitacaoRvt.tipoMaterial],
      tipoNpNm: [solicitacaoRvt.tipoNpNm]


    });
  }


  hasError(field: string) {
    return this.form.get(field).errors;
  }


  onSubmit(): void {
    this.submitted = true;
    this.listSolRvt.forEach((item: SolicitacaoRvt) => {
      item.tipoMaterial = this.form.value['tipoMaterial'];
      item.assunto = this.form.value['assunto'];
      item.numeroAS = this.form.value['numeroAS'];
      item.numeroOrdem = this.form.value['numeroOrdem'];
      item.observacao = this.form.value['observacao'];
      item.tipoCriticidade = this.form.value['tipoCriticidade'];
      console.log(item);
      if (item.check == true) {
        item.id = 0;
        this.service.save(item).subscribe(
          success => { this.modal.showAlertSucess('Salvo com sucesso!') },
          error => { this.modal.showAlertDanger('Erro ao salvar') },
          () => console.log('request save completo')
        );
      }
    });
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
      let i = 0;
      data.forEach(element => {
        if (data[data.length - 1]['NP ou NM'] == element['NP ou NM'] && i == data.length - 1)
          this.strNpNmSAP += element['NP ou NM'];
        else
          this.strNpNmSAP += element['NP ou NM'] + ';';

        i++;
        this.listNPNM.push(`${element['NP ou NM']}`.trim());
      });
      // console.log(data); // Data will be logged in array format containing objects

      this.strLinkNpNmSAP = this.service.SAPScriptNpNm(this.rbNPNM, this.strNpNmSAP);
    };
  }

  onSetTipoCriticidade(event){

    this.listSolRvtCompilado.forEach(item =>{
      item.tipoCriticidade = event.target.value;
    });
  }

  onCalculaPrazoAtendimento(){
    let tp = this.form.value['tipoCriticidade'];
    this.listSolRvtCompilado.forEach(item =>{
      let days = 0;
      if(tp == 1){

       days = this.listPrazoAtendimento.find(pa=>pa.TipoAtendimentoCodigo ==
          this.listDeposito.find(d=>d.CodigoSAP == item.deposito && d.CentroCodigo == item.centro).TipoAtendimentoCodigo
          &&
          pa.EscalaInicio >= item.qtdSolicitada && pa.EscalaFim <= item.qtdSolicitada
          ).DiasUteisNormal;


      }
      else{
        days = this.listPrazoAtendimento.find(pa=>pa.TipoAtendimentoCodigo ==
          this.listDeposito.find(d=>d.CodigoSAP == item.deposito && d.CentroCodigo == item.centro).TipoAtendimentoCodigo
          &&
          pa.EscalaInicio >= item.qtdSolicitada && pa.EscalaFim <= item.qtdSolicitada
          ).DiasUteisEmergencia;

      }
      if(item.dataSolicitacao){
        item.dataPrazoAtendimento = new Date(item.dataSolicitacao);
        item.dataSolicitacao = new Date(item.dataSolicitacao);
        let day = 60 * 60 * 24 * 1000
        item.dataPrazoAtendimento.setDate(item.dataSolicitacao.getDate() + (days*day));
          console.log('dias adicionados para dtPA: ' + (days*day) + ' ' + item.dataSolicitacao.getDate() );
      }

    });
  }

  onFinalizar(){

    this.listSolRvtCompilado = [];

    this.listSolRvt.forEach(item =>{
      if(item.check)
        this.listSolRvtCompilado.push(item);
    });

    this.listSolRvtForaArea.forEach(item =>{
      if(item.check)
        this.listSolRvtCompilado.push(item);
    });

    this.listSolRvtNaoEncontrado.forEach(item =>{
      if(item.check)
        this.listSolRvtCompilado.push(item);
    });


    this.onCalculaPrazoAtendimento();



  }

  RetornarEstoqueSAPPorNPNM() {
    this.listSolRvt = [];
    this.listSolRvtForaArea = [];
    this. listSolRvtNaoEncontrado = [];

    this.solicitacoesRvt$ = this.service.RetornarEstoqueSAPPorNPNM(this.rbNPNM, this.strNpNmSAP);
    this.solicitacoesRvt$.subscribe(data => {

      data.forEach(item => {
        item.id = this.sequencial;
        this.sequencial++;
        item.np = item.np.trim();
        item.nm = item.nm.trim();

        if(this.listCentro.find(x=>x.Id+'' == item.centro)){
              this.listSolRvt.push(item);
        }else{
          this.listSolRvtForaArea.push(item);
        }




      });

      this.listNPNM.forEach(item => {


        if(this.rbNPNM == "NP"){

          if(!this.listSolRvt.some(x => x.np == item) && !this.listSolRvtForaArea.some(x => x.np == item) ){
            this.onAdd(this.listSolRvtNaoEncontrado, item);
          }
        }
        else
        {
          if(this.listSolRvt.some(x => x.nm == item) && this.listSolRvtForaArea.some(x => x.nm == item) ){
            this.onAdd(this.listSolRvtNaoEncontrado, item);
          }
        }


      });


    });




  }


  onChange(event, campo, itemFront, listaGeral) {
    //console.log(event.target.value + ' ' + campo + ' ' + itemFront.id);
    let inputValue;
    if (campo == 'check')
      inputValue = event.target.checked;
    else
      inputValue = event.target.value;




    listaGeral.forEach(item => {
      if (item['id'] == itemFront.id) {
        item[campo] = inputValue;
        console.log(inputValue);
      }
    });

    if (campo == 'centro')
      this.getDescricaoCentro(itemFront);
    if (campo == 'deposito')
      this.getDescricaoDeposito(itemFront);

    return itemFront;
  }

  onAdd(lista, parameterNpNm?: string) {

    //pegando o maximo sequencial
    if (lista) {
      lista.forEach(item => {
        if (this.sequencial <= item.id) {
          this.sequencial = item.id
        }
      });
    }
    else {
      lista = [];
    }
    let NP = null;
    let NM = null;

    if(parameterNpNm){

      if(this.rbNPNM == "NP")
        NP = parameterNpNm;
      else
        NM = parameterNpNm;

    }
    //adicionando elemento
    let newItem: SolicitacaoRvt = {
      id: this.sequencial,
      check: false,
      sap: false,
      np: NP,
      nm: NM,
      descricao: null,
      centro: null,
      unidade: null,
      deposito: null,
      saldoSAP: null,
      local: null,
      qtdSolicitada: null,
      npNm: parameterNpNm,
      assunto: null,
      numeroAS: null,
      numeroOrdem: null,
      tipoCriticidade: null,
      justificativaEmergencia: null,
      solicitacao: null,
      statusSolicitacao: null,
      dataSolicitacao: null,
      usuarioSolicitante: null,
      gerenciaSolicitante: null,
      justificativaASOrdem: null,
      observacao: null,
      tipoMaterial: null,
      tipoNpNm: null,

      dataPrazoAtendimento: null,
      reserva: null,
      itemReserva: null,
      ns: null,
      bp: null
    };
    lista.push(newItem);
    this.sequencial++;

  }

  getDescricaoCentro(item) {
    item.gerenciaSolicitante = '';
    this.listCentro.forEach(objeto => {
      if (objeto.Id == item.centro ) {
        return objeto.Id ;

      }
    });

  }


  getDescricaoDeposito(item) {
    item.local = '';
    this.listDeposito.forEach(objeto => {
      if (objeto.CodigoSAP == item.deposito && objeto.CentroCodigo == item.centro) {
       return objeto.CodigoSAP + '-' + objeto.DescricaoSAP

      }
    });

  }




}
