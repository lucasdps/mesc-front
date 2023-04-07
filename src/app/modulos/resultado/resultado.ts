export interface Resultado {
  id: number
  descricao: string
  status: number
  valorFuncaoObjetivo: number
  qtdVariaveis: number
  qtdRestricoes: number
  iteracoes: number
  nodes: number
  tempoMilisegundos: number
  u_o: UO[]
  x: X[]
  u_fp_o: UFpO[]
  u_fs_o: UFsO[]
  idConjuntoEntrada: number
}

export interface UO {
  id: number
  operacaoId: number
  realizada: number
  conjuntoResultadoId: number
}

export interface X {
  id: number
  operacaoId: number
  equipamentoId: number
  realizada: number
  conjuntoResultadoId: number
}

export interface UFpO {
  id: number
  operacaoId: number
  fpId: number
  realizada: number
  conjuntoResultadoId: number
}

export interface UFsO {
  id: number
  operacaoId: number
  fsId: number
  realizada: number
  conjuntoResultadoId: number
}

export interface VisaoDia {
  id: number,
  dataInicio: number,
  dataFim: number,
  realizado: number
}