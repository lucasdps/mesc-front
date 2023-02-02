import { Deposito } from './../deposito/deposito';
import { Centro } from './../centro/centro';
import { Solicitacao } from './../solicitacao/solicitacao';
export interface Material {
  Id: number;
  Contador: number;

  SolicitacaoId: number;
  Solicitacao: Solicitacao;

  DataSolicitacao: Date;
  DataPrazoAtendimento: Date;
  DataCriacao: Date;
  NP: string;
  NM: string;
  DescricaoMaterial: string;
  NS: string;
  BP: string;
  Unidade: string;

  CentroCodigo: string;
  Centro: Centro;

  DepositoId: number;
  Deposito: Deposito;

  QtdSaldoSAP: number;
  QtdSolicitada: number;
  Observacao: string;
  JustificativaSol: string;
  JustificativaArea: string;
  StatusRvt: string;
  Reserva: string;
  ItemReserva: string;
  Check: boolean;
  SAP: boolean;

}
