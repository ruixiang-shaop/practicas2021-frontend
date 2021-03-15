import { Component, OnInit } from '@angular/core';
import { of, Subscription } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Cita, compareCita } from 'src/app/models/cita';
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
  private subscriptionCita: Subscription;

  constructor(private updateAfterLoginService: UpdateAfterLoginService,
    private modalService: ModalService, private citaService: CitaService) {
    this.subscription = this.updateAfterLoginService.getPaciente().subscribe(
      value => {
        if (value) this.setPaciente(value);
      }
    );
    this.subscriptionCita = this.citaService.getCita().subscribe(
      value => {
        if (value) this.addCita(value);
      }
    );
  }

  ngOnInit(): void {
  }

  setPaciente(paciente: Paciente) {
    this.paciente = paciente;
    // Convert date as string to Date type
    for (var i = 0; i < this.paciente.citas.length; i++) {
      this.paciente.citas[i].fechaHora = new Date(this.paciente.citas[i].fechaHora);
    }
    this.paciente.citas.sort(compareCita);
  }

  addCita(cita: Cita) {
    this.citaService.addCita(cita).subscribe(
      (data) => {
        this.paciente.citas.push(data);
        this.paciente.citas.sort(compareCita);
      },
      (error) => alert("No se ha podido añadir la cita"),
      () => {}
    );
  }

  deleteCita(index: number) {
    this.citaService.deleteCita(this.paciente.citas[index]).subscribe(
      (data) => this.paciente.citas.splice(index, 1),
      (error) => alert("No se ha podido eliminar la cita"),
      () => {}
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
    this.subscriptionCita.unsubscribe();
    this.updateAfterLoginService.setPaciente(null);
    this.paciente = null;
  }
}
