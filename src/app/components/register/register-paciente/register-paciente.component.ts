import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AsyncValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PacienteRegistro } from 'src/app/models/pacienteRegistro';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-register-paciente',
  templateUrl: './register-paciente.component.html',
  styleUrls: ['./register-paciente.component.css']
})
export class RegisterPacienteComponent implements OnInit {

  @Input()
  paciente: PacienteRegistro;
  
  form = new FormGroup({
    usuario: new FormControl('', {validators: [Validators.required], asyncValidators: [this.usuarioValidator()], updateOn: 'blur'}),
    clave: new FormControl('', {validators: [Validators.required, Validators.minLength(6)], updateOn: 'blur'}),
    nombre: new FormControl('', {validators: [Validators.required], updateOn: 'blur'}),
    apellidos: new FormControl('', {validators: [Validators.required], updateOn: 'blur'}),
    nss: new FormControl('', {validators: [Validators.required], updateOn: 'blur'}),
    numTarjeta: new FormControl('', {validators: [Validators.required], updateOn: 'blur'}),
    telefono: new FormControl('', {validators: [Validators.required], updateOn: 'blur'}),
    direccion: new FormControl('', {validators: [Validators.required], updateOn: 'blur'}),
  });

  constructor(private registerService: RegisterService) { }

  ngOnInit(): void {
  }

  usuarioValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.registerService.checkIfUsuarioExists(control.value).pipe(
        map(res => res ? {usuarioExists: true } : null))
    };
  }
  
  register(): void {
    if (this.form.valid){
      this.paciente = this.form.value;

      this.registerService.addPaciente(this.paciente)
      .subscribe(
        data => { alert("Paciente registrado correctamente"); },
        error => { alert("Error. No se ha podido registrar"); },
        ()=>{}
      )
    }
  }
}
