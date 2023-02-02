import { TipoAtendimento } from './../tipo-atendimento/TipoAtendimento';
export interface PrazoAtendimento {
  Id: number;
  EscalaInicio: number;
  EscalaFim: number;
  DiasUteisNormal: number;
  DiasUteisEmergencia: number;
  TipoAtendimentoCodigo: string;
  TipoAtendimento: TipoAtendimento;
}
