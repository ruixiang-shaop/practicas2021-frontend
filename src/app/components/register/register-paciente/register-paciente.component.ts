import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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
    usuario: new FormControl('', [Validators.required]),
    clave: new FormControl('', [Validators.required, Validators.minLength(6)]),
    nombre: new FormControl('', [Validators.required]),
    apellidos: new FormControl('', [Validators.required]),
    nss: new FormControl('', [Validators.required]),
    numTarjeta: new FormControl('', [Validators.required]),
    telefono: new FormControl('', [Validators.required]),
    direccion: new FormControl('', [Validators.required]),
  })

  constructor(private registerService: RegisterService) { }

  ngOnInit(): void {
  }

  register(): void {
    if (this.form.valid){
      this.paciente = this.form.value;
      console.log(this.paciente)

      this.registerService.addPaciente(this.paciente)
      .subscribe(
        error => { console.log(error); },
        ()=>{}
      )
    }
  }
}
