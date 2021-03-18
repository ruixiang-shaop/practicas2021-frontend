import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Cita, compareCita } from 'src/app/models/cita';
import { Medico } from 'src/app/models/medico';
import { CitaService } from 'src/app/services/cita.service';
import { UpdateAfterLoginService } from 'src/app/services/update-after-login.service';
import { ModalService } from 'src/app/shared/_modal';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styleUrls: ['./medico.component.css']
})
export class MedicoComponent implements OnInit {

  medico: Medico;
  private subscription: Subscription;
  private subscriptionCita: Subscription;

  constructor(private updateAfterLoginService: UpdateAfterLoginService,
    private modalService: ModalService, private citaService: CitaService) {
    this.subscription = this.updateAfterLoginService.getMedico().subscribe(
      value => {
        if (value) this.setMedico(value);
      }
    );
    this.subscriptionCita = this.citaService.retrieveNewCita().subscribe(
      value => {
        if (value) this.addCita(value);
      }
    );
  }

  ngOnInit(): void {
  }

  setMedico(medico: Medico) {
    this.medico = medico;
    // Convert date as string to Date type
    for (var i = 0; i < this.medico.citas.length; i++) {
      this.medico.citas[i].fechaHora = new Date(this.medico.citas[i].fechaHora);
    }
    this.medico.citas.sort(compareCita);
  }

  addCita(cita: Cita) {
    this.citaService.addCita(cita).subscribe(
      (data) => {
        this.medico.citas.push(data);
        this.medico.citas.sort(compareCita);
      },
      (error) => alert("No se ha podido añadir la cita"),
      () => {}
    );
  }

  deleteCita(index: number) {
    this.citaService.deleteCita(this.medico.citas[index]).subscribe(
      (data) => this.medico.citas.splice(index, 1),
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
    this.updateAfterLoginService.setMedico(null);
    this.medico = null;
  }
}
