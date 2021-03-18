import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { Cita } from 'src/app/models/cita';
import { Medico } from 'src/app/models/medico';
import { CitaService } from 'src/app/services/cita.service';
import { ModalService } from 'src/app/shared/_modal';
import * as moment from 'moment';
import { Paciente } from 'src/app/models/paciente';
import { Diagnostico } from 'src/app/models/diagnostico';

@Component({
  selector: 'app-cita-medico',
  templateUrl: './cita-medico.component.html',
  styleUrls: ['./cita-medico.component.css']
})
export class CitaMedicoComponent implements OnInit {

  @Input()
  cita: Cita;
  @Input()
  medico: Medico;
  @Input()
  readOnly: boolean;
  @Input()
  create: boolean; // true: create, false: update
  @Input()
  pacientes: Paciente[];
  @Input()
  modalId: string;

  @ViewChild('myform') myNgForm : any;
  @ViewChild('myform2') myNgForm2 : any;

  form: FormGroup = new FormGroup({
    fechaHora: new FormControl('', {validators: [Validators.required, Validators.pattern('^\\d{2}-\\d{2}-\\d{4} \\d{2}:\\d{2}'), this.validDate()], updateOn: 'blur'}),
    motivoCita: new FormControl('', {validators: [Validators.required], updateOn: 'blur'}),
    paciente: new FormControl('', {validators: [Validators.required], updateOn: 'blur'})
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
    // Only read or Update
    if (this.readOnly || !this.create) {
      let pacienteStr = this.cita.paciente.nombre + " " + this.cita.paciente.apellidos; 
      this.form.patchValue({
        fechaHora: this.cita.fechaHora.toLocaleString(),
        motivoCita: this.cita.motivoCita,
        paciente: pacienteStr
      })
      if (this.cita.diagnostico) {
        this.form2.patchValue({
          valoracionEspecialista: this.cita.diagnostico.valoracionEspecialista,
          enfermedad: this.cita.diagnostico.enfermedad
        })
      }
      this.form.controls.paciente.disable();
      if (this.readOnly) {
        this.form.controls.fechaHora.disable();
        this.form.controls.motivoCita.disable();
        this.form2.controls.valoracionEspecialista.disable();
        this.form2.controls.enfermedad.disable();
      }
    // Create
    } else {
      this.cita = new Cita();
    }
  }

  cancel():void {
    // Create
    if (!this.readOnly && this.create) {
      setTimeout(() => {
        this.myNgForm.resetForm();
        this.form.reset();
      }, 0);
    // Update
    } else if (!this.readOnly && !this.create) {
      setTimeout(() => {
        this.myNgForm.resetForm();
        this.form.reset();
        let pacienteStr = this.cita.paciente.nombre + " " + this.cita.paciente.apellidos; 
        this.form.patchValue({
          fechaHora: this.cita.fechaHora.toLocaleString(),
          motivoCita: this.cita.motivoCita,
          paciente: pacienteStr
        })
        if (this.cita.diagnostico) {
          this.myNgForm2.resetForm();
          this.form2.reset();
          this.form2.patchValue({
            valoracionEspecialista: this.cita.diagnostico.valoracionEspecialista,
            enfermedad: this.cita.diagnostico.enfermedad
          })
        }
      }, 0);
    }
    this.modalService.close(this.modalId);
  }

  onSubmit(): void {
    if (this.form.valid && !this.readOnly) {
      this.cita.fechaHora = moment(this.form.controls.fechaHora.value, 'DD-MM-YYYY hh:mm').toDate();
      this.cita.motivoCita = this.form.controls.motivoCita.value;
      this.cita.paciente = this.form.controls.paciente.value;
      this.cita.medico = this.medico;
      this.citaService.sendNewCita(this.cita);
      this.cancel();
    }
  }

}
