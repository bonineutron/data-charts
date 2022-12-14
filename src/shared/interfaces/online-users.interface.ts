export interface IUserData {
  Fecha: string | null;
  Anio: number | null;
  Mes: number | null;
  Semana: number | null;
  Dia: number | null;
  Dia_semana: string | null;
  Tiempo: string | null;
  Hora: number | null;
  Minuto: number | null;
  Fecha2: string | null;
  Anio2: number | null;
  Mes2: number | null;
  Semana2: number | null;
  Dia2: number | null;
  Dia_semana2: string | null;
  Tiempo2: string | null;
  Hora2: number | null;
  Minuto2: number | null;
  usuarios_online: number | null;
}

export interface IDataChart {
  day: number | null;
  cellId: number | null;
  users: number;
}
