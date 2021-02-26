import { Diagnostico } from "./diagnostico";
import { Medico } from "./medico";
import { Paciente } from "./paciente";

export class Cita {
    id: number;
    fechaHora: Date;
    motivoCita: string;
    paciente: string;
    medico: string;
    diagnostico: Diagnostico;
}