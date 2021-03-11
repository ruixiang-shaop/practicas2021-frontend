import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Cita } from 'src/app/models/cita';
import { Medico } from 'src/app/models/medico';
import { ModalService } from 'src/app/shared/_modal';

@Component({
  selector: 'app-cita-paciente',
  templateUrl: './cita-paciente.component.html',
  styleUrls: ['./cita-paciente.component.css']
})
export class CitaPacienteComponent implements OnInit {

  @Input()
  cita: Cita;
  @Input()
  readOnly: boolean;
  @Input()
  medicos: Medico[];
  @Input()
  modalId: string;

  form: FormGroup = new FormGroup({
    fechaHora: new FormControl('', [Validators.required]),
    motivoCita: new FormControl('', [Validators.required]),
    medico: new FormControl('', [Validators.required]),
    valoracionEspecialista: new FormControl(''),
    enfermedad: new FormControl('')
  })

  constructor(private modalService: ModalService) {
  }

  ngOnInit(): void {
    if (this.readOnly) {
      let medicoStr = this.cita.medico.nombre + " " + this.cita.medico.apellidos; 
      this.form.patchValue({
        fechaHora: this.cita.fechaHora.toLocaleString(),
        motivoCita: this.cita.motivoCita,
        medico: medicoStr,
        valoracionEspecialista: this.cita.diagnostico.valoracionEspecialista,
        enfermedad: this.cita.diagnostico.enfermedad
      })
      this.form.controls.fechaHora.disable();
      this.form.controls.motivoCita.disable();
      this.form.controls.medico.disable();
    } else {
      this.cita = null;
    }
  }

  cancel():void {
    this.modalService.close(this.modalId);
  }
  onSubmit(): void {
    if (this.form.valid){
      console.log(true);
    }
  }

  isReadOnly(): boolean {
    return this.readOnly;
  }
}
