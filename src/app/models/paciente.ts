import { Cita } from "./cita";
import { Medico } from "./medico";

export class Paciente {
    id: number;
    nombre: string;
    apellidos: string;
    nss: string;
    numTarjeta: string;
    telefono: string;
    direccion: string;
    medicos: Medico[];
    citas: Cita[];
}