import { Component, Input, OnInit, OnDestroy, ViewChildren } from '@angular/core';
import { Subscription } from 'rxjs';
import { Cita, compareCita } from 'src/app/models/cita';
import { Diagnostico } from 'src/app/models/diagnostico';
import { Medico } from 'src/app/models/medico';
import { CitaService } from 'src/app/services/cita.service';
import { DiagnosticoService } from 'src/app/services/diagnostico.service';
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
  private subscriptionNewCita: Subscription;
  private subscriptionUpdateCita: Subscription;
  private subscriptionNewDiag: Subscription;
  private subscriptionUpdateDiag: Subscription;

  constructor(private updateAfterLoginService: UpdateAfterLoginService,
    private modalService: ModalService, private citaService: CitaService,
    private diagnosticoService: DiagnosticoService) {
    this.subscription = this.updateAfterLoginService.getMedico().subscribe(
      value => {
        if (value) this.setMedico(value);
      }
    );
    this.subscriptionNewCita = this.citaService.retrieveNewCita().subscribe(
      value => {
        if (value) this.addCita(value);
      }
    );
    this.subscriptionUpdateCita = this.citaService.retrieveUpdatedCita().subscribe(
      value => {
        if (value) this.updateCita(value);
      }
    );
    this.subscriptionNewDiag = this.diagnosticoService.retrieveNewDiagnostico().subscribe(
      value => {
        if (value) this.addDiagnostico(value);
      }
    );
    this.subscriptionUpdateDiag = this.diagnosticoService.retrieveUpdatedDiagnostico().subscribe(
      value => {
        if (value) this.updateDiagnostico(value);
      }
    );
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.subscriptionNewCita.unsubscribe();
    this.subscriptionUpdateCita.unsubscribe();
    this.subscriptionNewDiag.unsubscribe();
    this.subscriptionUpdateDiag.unsubscribe();
    this.updateAfterLoginService.setMedico(null);
    this.citaService.sendNewCita(null);
    this.citaService.sendUpdatedCita(null);
    this.diagnosticoService.sendNewDiagnostico(null);
    this.diagnosticoService.sendUpdatedDiagnostico(null);
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

  updateCita(cita: Cita) {
    this.citaService.updateCita(cita).subscribe(
      (data) => {
        let index;
        for (let i = 0; i < this.medico.citas.length; i++) {
          if (this.medico.citas[i].id == cita.id) {
            index = i;
            break;
          }
        }
        this.medico.citas[index] = data;
        this.medico.citas.sort(compareCita);
      },
      (error) => alert("No se ha podido actualizar la cita"),
      () => {}
    );
  }

  addDiagnostico(diag: Diagnostico) {
    this.diagnosticoService.addDiagnostico(diag).subscribe(
      (data) => {
        let index;
        for (let i = 0; i < this.medico.citas.length; i++) {
          if (this.medico.citas[i].id == data.cita.id) {
            index = i;
            break;
          }
        }
        // Needs to create new object to change Object reference
        // so ngOnChanges can detect the change
        let citaAux = new Cita();
        // Shallow copy, works because we only have to change a 1-deep level reference
        Object.assign(citaAux, this.medico.citas[index]);
        citaAux.diagnostico = data;
        this.medico.citas[index] = citaAux;
      },
      (error) => alert("No se ha podido añadir el diagnostico"),
      () => {}
    );
  }

  updateDiagnostico(diag: Diagnostico) {
    this.diagnosticoService.updateDiagnostico(diag).subscribe(
      (data) => {
        let index;
        for (let i = 0; i < this.medico.citas.length; i++) {
          if (this.medico.citas[i].id == data.cita.id) {
            index = i;
            break;
          }
        }
        // Needs to create new object to change Object reference
        // so ngOnChanges can detect the change
        let citaAux = new Cita();
        // Shallow copy, works because we only have to change a 1-deep level reference
        Object.assign(citaAux, this.medico.citas[index]);
        citaAux.diagnostico = data;
        this.medico.citas[index] = citaAux;
      },
      (error) => alert("No se ha podido actualizar el diagnostico"),
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
    this.subscriptionNewCita.unsubscribe();
    this.subscriptionUpdateCita.unsubscribe();
    this.subscriptionNewDiag.unsubscribe();
    this.subscriptionUpdateDiag.unsubscribe();
    this.updateAfterLoginService.setMedico(null);
    this.citaService.sendNewCita(null);
    this.citaService.sendUpdatedCita(null);
    this.diagnosticoService.sendNewDiagnostico(null);
    this.diagnosticoService.sendUpdatedDiagnostico(null);
    this.medico = null;
  }
}
