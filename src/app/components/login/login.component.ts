import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { UpdateAfterLoginService } from 'src/app/services/update-after-login.service';
import { Usuario } from '../../models/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  @Input()
  usuario: Usuario;
  error: boolean;
  errorMessage: string;

  form = new FormGroup({
    usuario: new FormControl('', [Validators.required]),
    clave: new FormControl('', [Validators.required])
  })

  constructor(private loginService: LoginService, private router: Router,
    private updateAfterLoginService: UpdateAfterLoginService) { }

  ngOnInit(): void {
  }

  login(): void {
    if (this.form.valid){
      this.usuario = this.form.value;
      this.loginService.login(this.usuario).subscribe(
        (res) => {
          if (typeof res === 'string') {
            this.errorMessage = res;
            this.error = true;
          } else if ('numColegiado' in  res) {
            this.error = false;
            this.updateAfterLoginService.setMedico(res);
            this.router.navigateByUrl("medico");
          } else if ('nss' in res) {
            this.error = false;
            this.updateAfterLoginService.setPaciente(res);
            this.router.navigateByUrl("paciente")
          }
        },
      )
    }
  }

}
