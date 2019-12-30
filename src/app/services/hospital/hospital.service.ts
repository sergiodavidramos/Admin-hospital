import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { URL_SERVICIOS } from 'src/app/config/config';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UsuarioService } from '../usuario/usuario.service';
import swal from 'sweetalert';
import { Hospital } from 'src/app/models/hospital.model';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  token: string

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { 
    this.token = _usuarioService.token;
  }

  obtenerHospital(id : string){
    let url = URL_SERVICIOS+'/hospital/'+id;

    return this.http.get(url);

  }


  cargatHospitales():Observable<any> {
    return new Observable((observer: Subscriber<any>)=>{
      let url = URL_SERVICIOS+'/hospital';
      
      let intervalo = setInterval(()=>{


        this.http.get(url).subscribe((resp: any)=>{
          observer.next(resp);
          if(resp.ok===true){
            clearInterval(intervalo);
            observer.complete();
          }else{
            clearInterval(intervalo);
            observer.error(resp);
            observer.complete();
          }
        })        
      },0)
    })
  }

  borrarHospital(id: string){
    let url = URL_SERVICIOS+'/hospital/'+id;
    url+='?token='+this.token;
    return this.http.delete(url)
        .pipe(map(resp=>{
          swal ('Hospital Borrado', 'EL hospital a sido eliminado correctamente', 'success');
          return true;
        }))
  }

  crearHospital(nombre: string){
    let url = URL_SERVICIOS+'/hospital';
    url+='?token='+this.token;

    
    return this.http.post(url, {nombre} ).pipe(
          map((resp:any)=>{
            swal('Hospital creado: ', nombre, 'success' )
            return resp.hospital
          })
    )
  }

  actualizarHospital(hospital: Hospital){
    let url = URL_SERVICIOS+'/hospital/'+hospital._id;
    url+= '?token='+this.token;

    return this.http.put(url, hospital)
                    .pipe(map((resp: any)=>{
                      swal('Hospital Actualizado', resp.hospital.nombre, 'success')
                      return true;
                    }))
  }

  buscarHospital(termino: string){
    let url= URL_SERVICIOS+'/busqueda/coleccion/hospital/'+termino;

    return this.http.get(url)
                  .pipe(map((resp:any)=>resp.hospital))
  }
}

