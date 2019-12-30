import { Component, OnInit } from '@angular/core';
import { MedicoService, HospitalService } from 'src/app/services/service.index';
import { NgForm } from '@angular/forms';
import { Hospital } from 'src/app/models/hospital.model';
import { Medico } from 'src/app/models/medico.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {

  hospitales: Hospital[] = [];
  medico: Medico = new Medico('', '', '', '', '');
  hospital: Hospital = new Hospital('');

  constructor(
    public _medicoService: MedicoService,
    public _hospitalService: HospitalService,
    public router: Router,
    public activateRoute: ActivatedRoute,
    public _modalUploadService: ModalUploadService
  ) {

    activateRoute.params.subscribe(params => {
      let id = params['id'];

      if (id !== 'nuevo') {
        this.cargarMedico(id);
      }
    })
  }

  ngOnInit() {
    this._hospitalService.cargatHospitales().subscribe(hospitales => this.hospitales = hospitales.hospitales);
    this._modalUploadService.notificacion
                .subscribe(resp => {
                  // console.log(resp);
                  this.medico.img = resp.medico.img;
                })
  }

  cargarMedico(id: string) {
    this._medicoService.cargarMedicoID(id)
      .subscribe(medico => {
        // console.log(medico.hospital);
        this.medico = medico;
        this.medico.hospital = medico.hospital._id
        this.cambioHospital(this.medico.hospital)
      });
  }

  guardarMedico(f: NgForm) {
    console.log(f.valid);
    console.log(f.value);

    if (f.invalid) {
      return;
    }

    this._medicoService.guardarMedico(this.medico)
      .subscribe(medico => {
        this.medico._id = medico._id
        this.router.navigate(['/medico', medico._id])
      });
  }

  cambioHospital(id: string) {

    this._hospitalService.obtenerHospital(id).subscribe((resp: any) => this.hospital = resp.hospital)

  }


  cambiarFoto() {
    this._modalUploadService.mostrarModel('medicos', this.medico._id);
  }

}
