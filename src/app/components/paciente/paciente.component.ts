import { HostListener } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Paciente } from 'src/app/models/paciente';
import { UpdateAfterLoginService } from 'src/app/services/update-after-login.service';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css']
})
export class PacienteComponent implements OnInit {

  paciente: Paciente;
  private subscription: Subscription;

  constructor(private updateAfterLoginService: UpdateAfterLoginService) {
    this.subscription = this.updateAfterLoginService.getPaciente().subscribe(
      value => {
        if (value) this.setPaciente(value)
      }
    )
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }
  setPaciente(paciente: Paciente) {
    this.paciente = paciente;
  }

  logout() {
    this.subscription.unsubscribe();
    this.updateAfterLoginService.setPaciente(null);
    this.paciente = null;
  }
}
