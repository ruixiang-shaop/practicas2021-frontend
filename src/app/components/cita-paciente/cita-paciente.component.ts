import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { Cita } from 'src/app/models/cita';
import { Medico } from 'src/app/models/medico';
import { CitaService } from 'src/app/services/cita.service';
import { ModalService } from 'src/app/shared/_modal';
import * as moment from 'moment';
import { Paciente } from 'src/app/models/paciente';

@Component({
  selector: 'app-cita-paciente',
  templateUrl: './cita-paciente.component.html',
  styleUrls: ['./cita-paciente.component.css']
})          
export class CitaPacienteComponent implements OnInit {

  @Input()
  cita: Cita;
  @Input()
  paciente: Paciente;
  @Input()
  readOnly: boolean;
  @Input()
  medicos: Medico[];
  @Input()
  modalId: string;

  @ViewChild('myform') myNgForm : any;

  form: FormGroup = new FormGroup({
    fechaHora: new FormControl('', {validators: [Validators.required, Validators.pattern('^\\d{2}-\\d{2}-\\d{4} \\d{2}:\\d{2}'), this.validDate()], updateOn: 'blur'}),
    motivoCita: new FormControl('', {validators: [Validators.required], updateOn: 'blur'}),
    medico: new FormControl('', {validators: [Validators.required], updateOn: 'blur'})
  })

  form2: FormGroup = new FormGroup({
    valoracionEspecialista: new FormControl('', {validators: [Validators.required], updateOn: 'blur'}),
    enfermedad: new FormControl('', {validators: [Validators.required], updateOn: 'blur'})
  })

  constructor(private modalService: ModalService, private citaService: CitaService) {
  }

  validDate(): ValidatorFn {  
    return (control: AbstractControl): { [key: string]: any } | null =>
      moment(control.value, 'DD-MM-YYYY hh:mm').isValid()
            ? null : {invalidDate: true}}

  ngOnInit(): void {
    if (this.readOnly) {
      let medicoStr = this.cita.medico.nombre + " " + this.cita.medico.apellidos; 
      this.form.patchValue({
        fechaHora: moment(this.cita.fechaHora).format('DD-MM-YYYY HH:mm'),
        motivoCita: this.cita.motivoCita,
        medico: medicoStr
      })
      this.form.controls.fechaHora.disable();
      this.form.controls.motivoCita.disable();
      this.form.controls.medico.disable();
      if (this.cita.diagnostico) {
        this.form2.patchValue({
          valoracionEspecialista: this.cita.diagnostico.valoracionEspecialista,
          enfermedad: this.cita.diagnostico.enfermedad
        })
      }
    } else {
      this.cita = new Cita();
    }
  }

  cancel():void {
    if (!this.readOnly) {
      setTimeout(() => {
        this.myNgForm.resetForm();
        this.form.reset();
      }, 0);
    }
    this.modalService.close(this.modalId);
  }

  onSubmit(): void {
    if (this.form.valid && !this.readOnly) {
      this.cita.fechaHora = moment(this.form.controls.fechaHora.value, 'DD-MM-YYYY hh:mm').toDate();
      this.cita.motivoCita = this.form.controls.motivoCita.value;
      this.cita.medico = this.form.controls.medico.value;
      this.cita.paciente = this.paciente;
      this.citaService.sendNewCita(this.cita);
      this.cancel();
    }
  }
}
