import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Cita } from 'src/app/models/cita';
import { Paciente } from 'src/app/models/paciente';
import { CitaService } from 'src/app/services/cita.service';
import { UpdateAfterLoginService } from 'src/app/services/update-after-login.service';
import { ModalService } from 'src/app/shared/_modal';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css']
})
export class PacienteComponent implements OnInit {

  paciente: Paciente;
  private subscription: Subscription;

  constructor(private updateAfterLoginService: UpdateAfterLoginService,
    private modalService: ModalService, private citaService: CitaService) {
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
    // Convert date as string to Date type
    for (var i = 0; i < this.paciente.citas.length; i++) {
      this.paciente.citas[i].fechaHora = new Date(this.paciente.citas[i].fechaHora);
    }
    this.paciente.citas.sort((a, b) => a.fechaHora.getDate() - b.fechaHora.getDate())
  }

  addCita(cita: Cita) {
    this.paciente.citas.push(cita);
  }

  deleteCita(index: number) {
    this.citaService.deleteCita(this.paciente.citas[index]).subscribe(
      error => { console.log(error); },
      ()=> { this.paciente.citas.splice(index, 1)}
    );
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
      this.modalService.close(id);
  }

  logout() {
    this.subscription.unsubscribe();
    this.updateAfterLoginService.setPaciente(null);
    this.paciente = null;
  }
}
