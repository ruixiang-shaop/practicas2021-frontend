import { Component, Input, OnInit, ViewChild, OnChanges } from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { Cita } from 'src/app/models/cita';
import { Medico } from 'src/app/models/medico';
import { CitaService } from 'src/app/services/cita.service';
import { ModalService } from 'src/app/shared/_modal';
import * as moment from 'moment';
import { Paciente } from 'src/app/models/paciente';
import { Diagnostico } from 'src/app/models/diagnostico';
import { DiagnosticoService } from 'src/app/services/diagnostico.service';

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

  constructor(private modalService: ModalService, private citaService: CitaService,
    private diagnosticoService: DiagnosticoService) {
  }

  validDate(): ValidatorFn {  
    return (control: AbstractControl): { [key: string]: any } | null =>
      moment(control.value, 'DD-MM-YYYY HH:mm').isValid()
            ? null : {invalidDate: true}}

  ngOnInit(): void {
    // Only read or Update
    if (this.readOnly || !this.create) {
      this.updateForm();
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

  ngOnChanges() {
    // Read or Edit view
    if (!this.create || this.readOnly) {
      console.log("changed");
      this.resetForm();
      this.updateForm();
    }
  }

  resetForm() {
    setTimeout(() => {
      this.myNgForm.resetForm();
      this.form.reset();
      this.myNgForm2?.resetForm();
      this.form2?.reset();
    }, 0);
  }

  updateForm() {
    setTimeout(() => {
      let pacienteStr = this.cita.paciente.nombre + " " + this.cita.paciente.apellidos; 
      this.form.patchValue({
        fechaHora: moment(this.cita.fechaHora).format('DD-MM-YYYY HH:mm'),
        motivoCita: this.cita.motivoCita,
        paciente: pacienteStr
      })
      this.form2.patchValue({
        valoracionEspecialista: this.cita.diagnostico?.valoracionEspecialista,
        enfermedad: this.cita.diagnostico?.enfermedad
      })
      console.log("valoracion: ",this.cita.diagnostico?.valoracionEspecialista," enfermedad: ",this.cita.diagnostico?.enfermedad)
    }, 0);
  }

  cancel():void {
    this.resetForm();
    if (!this.create || this.readOnly)
      this.updateForm();
    this.modalService.close(this.modalId);
  }

  isDiagDisabled(): boolean {
    if (this.create) return true;
    if (this.cita.diagnostico == null && this.readOnly) return true;
    return false;
  }

  onSubmitCita(): void {
    // Create
    if (this.form.valid && this.form.dirty && !this.readOnly && this.create) {
      let cita = new Cita();
      cita.fechaHora = moment(this.form.controls.fechaHora.value, 'DD-MM-YYYY HH:mm').toDate();
      cita.motivoCita = this.form.controls.motivoCita.value;
      cita.paciente = this.form.controls.paciente.value;
      cita.medico = this.medico;
      this.cancel();
      this.citaService.sendNewCita(cita);
    // Update
    } else if (this.form.valid && this.form.dirty && !this.readOnly && !this.create) {
      let cita = new Cita();
      cita.id = this.cita.id;
      cita.fechaHora = moment(this.form.controls.fechaHora.value, 'DD-MM-YYYY HH:mm').toDate();
      cita.motivoCita = this.form.controls.motivoCita.value;
      //cita.paciente = this.form.controls.paciente.value; you can't change paciente
      cita.medico = this.medico;
      this.cancel();
      this.citaService.sendUpdatedCita(cita);
    }
  }

  onSubmitDiag(): void {
    // Create Diagnostico
    if (this.cita.diagnostico == null && this.form2.valid && this.form2.dirty && !this.readOnly && !this.create) {
      let diag: Diagnostico = new Diagnostico();
      diag.valoracionEspecialista = this.form2.controls.valoracionEspecialista.value;
      diag.enfermedad = this.form2.controls.enfermedad.value;
      diag.cita = this.cita;
      this.cancel();
      this.diagnosticoService.sendNewDiagnostico(diag);
    // Update Diagnostico
    } else if (this.cita.diagnostico != null && this.form2.valid && this.form2.dirty && !this.readOnly && !this.create) {
      let diag: Diagnostico = new Diagnostico();
      diag.valoracionEspecialista = this.form2.controls.valoracionEspecialista.value;
      diag.enfermedad = this.form2.controls.enfermedad.value;
      diag.id = this.cita.diagnostico.id;
      diag.cita = this.cita.diagnostico.cita;
      this.cancel();
      this.diagnosticoService.sendUpdatedDiagnostico(diag);
    }
  }

}
