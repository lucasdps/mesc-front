import { TipoAtendimento } from './../tipo-atendimento/TipoAtendimento';

import { Centro } from './../../modulos/centro/centro';
export interface Deposito {
  Id: number;
  CodigoSAP: string;
  DescricaoSAP: string;
  Descricao: string;
  CentroCodigo: string;
  TipoAtendimentoCodigo: string;
  Centro: Centro;
  TipoAtendimento: TipoAtendimento;
}
