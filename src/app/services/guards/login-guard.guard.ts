import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';


@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {


constructor(
  public _usuarioServices: UsuarioService,
  public router: Router
){}

  canActivate(){
    //  console.log('Paso por el login Guard');
    if(this._usuarioServices.estaLogueado()){
      console.log('Paso el guard')
      return true;
    }else{
      console.log('Bloqueado por el GUARD');
      this.router.navigate(['/login'])
      return false;
    }
  }
  
}
