import { Component, OnInit } from '@angular/core';
import { HospitalService } from 'src/app/services/service.index';
import { Hospital } from 'src/app/models/hospital.model';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';
import { parse } from 'querystring';
// import * as swal from 'sweetalert';
// import  swal from 'sweetalert';
declare var swal:any;

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {

  hospitales: Hospital[]=[];
  totalRegistros: number =0;
  // input: string = "input";

  constructor(
    public _hospitalService: HospitalService,
    public _modalUploadService: ModalUploadService
  ) { 
   
  }

  ngOnInit() {
    this.cargarHospitales();

    this._modalUploadService.notificacion.subscribe(resp=> this.cargarHospitales())
 
  }


  cargarHospitales(){
    this._hospitalService.cargatHospitales()
    .subscribe( 
      hospitales => {
        console.log('Subs', hospitales)
        this.totalRegistros= hospitales.total;
        this.hospitales = hospitales.hospitales
      },
      error => console.error('Error en el obs', error),
    () => console.log('El observador termino!'))
  }

  mostrarModal(id: string){
    this._modalUploadService.mostrarModel('hospitales', id);
  }

  buscarHospital(termino: string){

    if(termino.length<=0){
      this.cargarHospitales();
      return
    }

    this._hospitalService.buscarHospital(termino)
                        .subscribe((hospitales: Hospital[])=>{

                          this.hospitales= hospitales;
                        })
  }


  crearHospital(){
    // swal("Introduzca el nombre del hospital:", {
    //   content: "input",
    // })
    swal({
      title: 'Crear hospital',
      text: 'Ingrese el nombre del hospital',
      content: 'input',
      icon: 'info',
      buttons: true,
      // dangerMode: true
    })
    .then((value:string) => {

      if(!value || value.length===0)
        return;
        
      this._hospitalService.crearHospital(value)
                          .subscribe(resp=>{
                            console.log(resp)
                            swal("Hospital creado exitosamente!", value, "success");
                            this.cargarHospitales()
                          })
    });

  }

  borrarHospital(id: string){
    swal({
      title: "¿Estas Seguro?",
      text: "Esta a punto de borrar?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((borrar) => {
      
      if (borrar) {
        this._hospitalService.borrarHospital(id)
            .subscribe(resp=>{
              console.log(resp);
              this.cargarHospitales();
            })
      } 
    });
  }


  guardarHospital(hospital: Hospital){
    swal({
      title: "¿Estas Seguro?",
      text: "Esta a punto de Actualizar a "+ hospital.nombre,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((act) => {
      // console.log(borrar);
      
      if (act) {
        this._hospitalService.actualizarHospital(hospital)
            .subscribe(resp=>{
              console.log(resp);
              // this.cargarHospitales();
            })
      } 
    });
  }


}
