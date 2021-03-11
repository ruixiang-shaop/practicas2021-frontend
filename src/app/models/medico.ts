import { Cita } from "./cita";
import { Paciente } from "./paciente";

export class Medico {
    id: number;
    nombre: string;
    apellidos: string;
    numColegiado: string;
    pacientes: Paciente[];
    citas: Cita[];

    public equals(med: Medico): boolean {
        return this.id == med.id;
    }
}