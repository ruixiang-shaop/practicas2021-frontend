import { Component, Input, OnInit } from '@angular/core';
import { Cita } from 'src/app/models/cita';

@Component({
  selector: 'app-cita-paciente',
  templateUrl: './cita-paciente.component.html',
  styleUrls: ['./cita-paciente.component.css']
})
export class CitaPacienteComponent implements OnInit {

  @Input()
  cita: Cita;
  @Input()
  edit: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
