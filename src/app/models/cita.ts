import { Diagnostico } from "./diagnostico";
import { Medico } from "./medico";
import { Paciente } from "./paciente";

export class Cita {
    id: number;
    fechaHora: Date;
    motivoCita: string;
    paciente: Paciente;
    medico: Medico;
    diagnostico: Diagnostico;
}