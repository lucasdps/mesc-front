export interface SolicitacaoRvt {
  id: number;
  check: boolean;
  sap: boolean;
  np: string;
  nm: string;
  descricao: string;
  unidade: string;
  centro: string;
  deposito: string;
  saldoSAP: number;
  local: string;
  qtdSolicitada: number;
  npNm: string;
  assunto: string;
  numeroAS: string;
  numeroOrdem: number;
  tipoCriticidade: string;
  justificativaEmergencia: string;
  solicitacao: string;
  statusSolicitacao: string;
  dataSolicitacao: Date;
  usuarioSolicitante: number;
  gerenciaSolicitante: number;
  justificativaASOrdem: string;
  observacao: string;
  tipoMaterial: string;
  tipoNpNm: string;

  dataPrazoAtendimento: Date;
  reserva: string;
  itemReserva: string;
  ns: string;
  bp: string;

}
