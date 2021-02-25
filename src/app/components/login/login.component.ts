import { Component, Input, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  @Input()
  usuario: Usuario;
  constructor() { }

  ngOnInit(): void {
  }

  login(): void {

  }

}
