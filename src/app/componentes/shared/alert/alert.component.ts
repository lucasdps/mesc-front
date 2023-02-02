import { catchError } from 'rxjs/operators';
import { Observable, empty } from 'rxjs';
import { Material } from './../../../modulos/material/material';
import { MaterialService } from './../../../servicos/material/material.service';
import { Component, OnInit, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  @Input() message: string;
  @Input() type = 'success';

  constructor(public bsModalRef: BsModalRef ) { }

  ngOnInit(): void {
  }


  onClose(){
    this.bsModalRef.hide();
  }



}
