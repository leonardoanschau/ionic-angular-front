import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SignUpPage } from './sign-up';
import { CidadeService } from '../../services/domain/cidade.service';
import { EstadoService } from '../../services/domain/estado.service';

@NgModule({
  declarations: [
    SignUpPage,
  ],
  imports: [
    IonicPageModule.forChild(SignUpPage),
  ],
  providers: [
    CidadeService,
    EstadoService,
  ]
})
export class SignUpPageModule {}
