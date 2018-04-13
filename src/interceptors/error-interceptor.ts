import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs/Rx'; // IMPORTANTE: IMPORT ATUALIZADO
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { StorageService } from '../services/storage.service';
import { FieldMessage } from '../models/fieldMessage';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(public storage: StorageService, public alertCtrl: AlertController){
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req)
        .catch((error, caught) => {

            let errorObj = error;
            if (errorObj.error) {
                errorObj = errorObj.error;
            }
            if (!errorObj.status) {
                errorObj = JSON.parse(errorObj);
            }
            console.log("Erro detectado pelo interceptor:");
            console.log(errorObj);

            switch(errorObj.status){
                case 401:
                this.handler401();
                break

                case 403:
                this.handler403();
                break;

                case 422:
                this.handler422(errorObj);
                break;

                default:
                this.handlerDefaultError401(errorObj);
            }

            return Observable.throw(errorObj);
        }) as any;
    }

    handler401(){
        let alert = this.alertCtrl.create({
            title: 'Erro 401, falha de Autenticação',
            message: 'Email ou senha incorretos',
            enableBackdropDismiss: false,
            buttons: [
                {
                    text: 'Ok'
                }
            ]
        });
        alert.present();
    }

    handler403(){
        this.storage.setLocalUser(null);
        let alert = this.alertCtrl.create({
            title: 'Erro 403, falha de Autorização',
            message: 'Faça login novamente',
            enableBackdropDismiss: false,
            buttons: [
                {
                    text: 'Ok'
                }
            ]
        });
        alert.present();
    }

    handler422(errorObj){
        let alert = this.alertCtrl.create({
            title: 'Erro 422: Validação',
            message: this.listErrors(errorObj.errors),
            enableBackdropDismiss: false,
            buttons: [
                {
                    text: 'Ok'
                }
            ]
        });
        alert.present();
    }

    handlerDefaultError401(errorObj){
        let alert = this.alertCtrl.create({
            title: 'Erro '+ errorObj.status + ': ' + errorObj.error,
            message: errorObj.message,
            enableBackdropDismiss: false,
            buttons: [
                {
                    text: 'Ok'
                }
            ]
        });
        alert.present();
    }

    private listErrors(messages : FieldMessage[]) : string {
        let s : string = '';
        for (var i=0; i<messages.length; i++) {
            s = s + '<p><strong>' + messages[i].fieldName + "</strong>: " + messages[i].message + '</p>';
        }
        return s;
    }

}
export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
};