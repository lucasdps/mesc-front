import { Material } from './../../modulos/material/material';
import { MaterialService } from './../material/material.service';
import { Injectable } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AlertComponent } from 'src/app/componentes/shared/alert/alert.component';
import { catchError } from 'rxjs/internal/operators/catchError';
import { empty, Observable } from 'rxjs';

export enum AlerTypes{
  DANGER = 'danger',
  SUCCESS = 'success'
}

@Injectable({
  providedIn: 'root'
})
export class AlertService {




  constructor(private modalService: BsModalService) { }

  private showAlert(message: string, type: AlerTypes, dismisTimout?: number){
    const bsModalRef: BsModalRef = this.modalService.show( AlertComponent);
    bsModalRef.content.type = type;
    bsModalRef.content.message = message;
    if(dismisTimout){
      setTimeout( () => bsModalRef.hide(),dismisTimout);
    }

  }

  showAlertDanger(message: string){
    this.showAlert(message,AlerTypes.DANGER);
  }

  showAlertSucess(message: string){
    this.showAlert(message,AlerTypes.SUCCESS, 5000);
  }


}
