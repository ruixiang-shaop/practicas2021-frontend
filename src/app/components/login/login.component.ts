import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Medico } from 'src/app/models/medico';
import { Paciente } from 'src/app/models/paciente';
import { LoginService } from 'src/app/services/login.service';
import { Usuario } from '../../models/usuario'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  @Input()
  usuario: Usuario;

  form = new FormGroup({
    usuario: new FormControl('', [Validators.required]),
    clave: new FormControl('', [Validators.required])
  })

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
  }

  login(): void {
    if (this.form.valid){
      this.usuario = this.form.value;
      this.loginService.login(this.usuario).subscribe(
        (res) => {
          if (typeof res === 'string') {
            console.log("Error:"+res)
          } else if ('numColegiado' in  res) {
            console.log(res)
          } else if ('nss' in res) {
            console.log(res)
          }
        },
      )
    }
  }

}
