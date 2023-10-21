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
            carros: [
                {
                    placa: dataForm.cars.plate,
                    cor_Id: dataForm.cars.colorId,
                    modelo_Id: dataForm.cars.modelId
                }
            ]
        }
        return await this.httpService.post('', authStore.authToken, data)
    }
}