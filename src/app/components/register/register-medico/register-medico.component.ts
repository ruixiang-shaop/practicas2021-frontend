import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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
    usuario: new FormControl('', [Validators.required]),
    clave: new FormControl('', [Validators.required, Validators.minLength(6)]),
    nombre: new FormControl('', [Validators.required]),
    apellidos: new FormControl('', [Validators.required]),
    numColegiado: new FormControl('', [Validators.required]),
  })
  
  constructor(private registerService: RegisterService) { }

  ngOnInit(): void {
  }

  register(): void {
    if (this.form.valid){
      this.medico = this.form.value;
      console.log(this.medico)
      this.registerService.addMedico(this.medico)
      .subscribe(
        error => { console.log(error); },
        ()=>{}
      )
    }
  }
}
