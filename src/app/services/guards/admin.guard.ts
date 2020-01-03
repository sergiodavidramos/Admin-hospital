import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    public _usuarioService: UsuarioService,
  ){
  }

  canActivate(){

    if(this._usuarioService.usuario.role ==='ADMIN_ROlE'){
      return true;
    }else{
      console.log('Bloqueado poe el ADMIN GUARD');
      // this.router.navigate(['/login']);
      this._usuarioService.logout();
      return false;
    }
  }
  
}
