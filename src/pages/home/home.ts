import { Component } from '@angular/core';
import { NavController, IonicPage, MenuController } from 'ionic-angular';
import { CredenciaisDTO } from '../../models/credenciais.dto';
import { AuthService } from '../../services/auth.service';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  creds: CredenciaisDTO = {
    email: "",
    senha: ""
  }

  constructor(public navCtrl: NavController, 
    public menu: MenuController,
    public auth: AuthService) {   } 
 
  ionViewWillEnter() {     
    this.menu.swipeEnable(false);   
  } 
 
  ionViewDidLeave() {     
    this.menu.swipeEnable(true);   
  }

  ionViewDidEnter(){
    //por enquanto essa solução, mas eu teria que utilizar refreshToken
  }

  login(){
    this.auth.authenticate(this.creds).subscribe(response => {
      this.auth.successfulLogin(response.headers.get('Authorization'));
      this.auth.storage.getLocalUser();
      this.navCtrl.setRoot('CategoriasPage');
    },
  error => {});
  }

}
