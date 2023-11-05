import { Service } from "@features/app/http-service";
import { authStore } from "@features/auth/auth.store";
import { DataForm } from "./guest.form";
import { serialize } from "serializr";
import { Guest } from "./guest.model";


export class GuestService {
    private httpService = new Service('Convidado')

    constructor() { }

    async sendGuest(dataForm: DataForm) {
        const data = {
            nome: dataForm.name,
            cpf: dataForm.cpf,
            sicap: dataForm.sicap,
            carros: [
                {
                    placa: dataForm.cars.plate,
                }
            ]
        }
        return await this.httpService.post('', authStore.authToken, data)
    }
}