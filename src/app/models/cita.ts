import { Diagnostico } from "./diagnostico";
import { Medico } from "./medico";
import { Paciente } from "./paciente";
import * as moment from "moment";

export function compareCita(a: Cita, b: Cita): number {
    if (moment(a.fechaHora).isBefore(b.fechaHora))
        return -1;
    if (moment(a.fechaHora).isAfter(b.fechaHora))
        return 1;
    return 0;
}

export class Cita {
    id: number;
    fechaHora: Date;
    motivoCita: string;
    paciente: Paciente;
    medico: Medico;
    diagnostico: Diagnostico;
}