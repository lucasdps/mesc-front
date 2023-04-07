import { ResultadoComponent } from './../resultado.component';
import { ResultadoService } from './../../../servicos/resultado/resultado.service';
import { AlertService } from './../../../servicos/alert/alert.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { EntradaService } from 'src/app/servicos/entrada/entrada.service';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { Component, Input, OnInit, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-view-dias',
  templateUrl: './view-dias.component.html',
  styleUrls: ['./view-dias.component.css']
})
export class ViewDiasComponent implements AfterViewInit, OnDestroy, OnInit {

  //datatables
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  public dtTrigger: Subject<any> = new Subject<any>();


  @Input() Tipo = 0;
  @Input() IdResultado=0;

  constructor(private service: ResultadoService, 
    private modalService: BsModalService, // para modal de sim ou nao
    private alertService: AlertService,
    private resul : ResultadoComponent) { }

  ngOnInit(): void {
    this.dtOptions = {
      
      autoWidth: true,
      destroy: true,
      columns: [{
        title: 'Id Op',
        data: 'id'
      }, {
        title: 'Data Inicio',
        data: 'dataInicio'
      }, {
        title: 'DataFim',
        data: 'dataFim'
      },{
        title: 'Equipamento Id',
        data: 'equipamento'
      },{
        title: 'FP',
        data: 'fp'
      },{
        title: 'FS',
        data: 'fs'
      },{
        title: 'Realizado',
        data: 'realizado'
      }]
      
    };
    
  }
  
  

  ngAfterViewInit(): void {
    // this.dtTrigger1.next();
     this.dtTrigger.next();
     // this.dtTrigger1.next();
   }
 
   ngOnDestroy(): void {
     // Do not forget to unsubscribe the event
     //this.dtTrigger1.unsubscribe();
     this.dtTrigger.unsubscribe();
     // this.dtTrigger1.unsubscribe();
   }
 
   rerender(): void {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy(); // Will be ok on last dataTable, will fail on previous instances
         
      });
      setTimeout(() => {
        this.dtTrigger.next();     
      });
   }

   dtOptionsCustomizado():void{
    this.dtOptions = {
      ajax: (dataTablesParameters: any, callback) => {
        this.service.loadByIdResultadoTipo(this.IdResultado, this.Tipo).subscribe(resp => {
            callback({
              recordsTotal: 0,
              recordsFiltered: 0,
              data: resp.data            // <-- see here
            });
          });
      },
      autoWidth: true,
      destroy: true,
      columns: [{
        title: 'Id Op',
        data: 'id'
      }, {
        title: 'Data Inicio',
        data: 'dataInicio'
      }, {
        title: 'DataFim',
        data: 'dataFim'
      },{
        title: 'Equipamento Id',
        data: 'equipamento'
      },{
        title: 'FP',
        data: 'fp'
      },{
        title: 'FS',
        data: 'fs'
      },{
        title: 'Realizado',
        data: 'realizado'
      }]
      
    };
    this.rerender();
   }


   onConfirmOpDias(){
    this.Tipo = 0;
    this.dtOptionsCustomizado();
    
  }

  onConfirmOpEquipamentoDias(){
    this.Tipo = 1;
    this.dtOptionsCustomizado();
  }

  onConfirmOpFpDias(){
    this.Tipo = 2;
    this.dtOptionsCustomizado();
  }

  onConfirmOpFsDias(){
    this.Tipo = 3;
    this.dtOptionsCustomizado();
  }

  
  onDeclineResultado(){
    this.resul.onDeclineResultado();
  }
 


}
