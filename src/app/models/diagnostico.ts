import { Cita } from "./cita";

export class Diagnostico {
    id: number;
    valoracionEspecialista: string;
    enfermedad: string;
    cita: Cita;
}