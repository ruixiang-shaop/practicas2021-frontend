import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Medico } from 'src/app/models/medico';
import { UpdateAfterLoginService } from 'src/app/services/update-after-login.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styleUrls: ['./medico.component.css']
})
export class MedicoComponent implements OnInit {

  medico: Medico;
  private subscription: Subscription;

  constructor(private updateAfterLoginService: UpdateAfterLoginService) {
    this.subscription = this.updateAfterLoginService.getMedico().subscribe(
      value => this.setMedico(value)
    )
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }

  setMedico(medico: Medico) {
    this.medico = medico;
    // Convert date as string to Date type
    for (var i = 0; i < this.medico.citas.length; i++) {
      this.medico.citas[i].fechaHora = new Date(this.medico.citas[i].fechaHora);
    }
    this.medico.citas.sort((a, b) => a.fechaHora.getDate() - b.fechaHora.getDate())
  }
  
  logout() {
    this.subscription.unsubscribe();
    this.updateAfterLoginService.setMedico(null);
    this.medico = null;
  }
}
