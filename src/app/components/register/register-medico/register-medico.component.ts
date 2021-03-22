import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MedicoRegistro } from 'src/app/models/medicoRegistro';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-register-medico',
  templateUrl: './register-medico.component.html',
  styleUrls: ['./register-medico.component.css']
})
export class RegisterMedicoComponent implements OnInit {
  
  @Input()
  medico: MedicoRegistro;

  form = new FormGroup({
    usuario: new FormControl(null, {validators: [Validators.required], asyncValidators: [this.usuarioValidator()], updateOn: 'blur'}),
    clave: new FormControl('', {validators: [Validators.required, Validators.minLength(6)], updateOn: 'blur'}),
    nombre: new FormControl('', {validators: [Validators.required], updateOn: 'blur'}),
    apellidos: new FormControl('', {validators: [Validators.required], updateOn: 'blur'}),
    numColegiado: new FormControl('', {validators: [Validators.required], updateOn: 'blur'}),
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
      this.medico = this.form.value;
      this.registerService.addMedico(this.medico)
      .subscribe(
        data => { alert("Medico registrado correctamente"); },
        error => { alert("Error. No se ha podido registrar"); },
        ()=>{}
      )
    }
  }
}
