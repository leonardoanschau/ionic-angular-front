import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ClienteDTO } from "../../models/cliente.dto";
import { Observable } from "rxjs/Rx"
import { API_CONFIG } from "../../config/api.config";
import { StorageService } from "../storage.service";

@Injectable()
export class ClienteService{

    constructor(public http: HttpClient, public storage: StorageService){
    }

    findById(id: string) {
        return this.http.get(`${API_CONFIG.baseUrl}/clientes/${id}`);
    }

    findByEmail(email: string){
        return this.http.get(`${API_CONFIG.baseUrl}/clientes/email?value=${email}`);
    }

    insert(obj : ClienteDTO) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/clientes`, 
            obj,
            { 
                observe: 'response', 
                responseType: 'text'
            }
        ); 
    }


}