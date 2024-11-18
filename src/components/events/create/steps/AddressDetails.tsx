import { checkCEP } from '@/components/utils/checkCep';
import { mask } from "remask";

export default function AddressDetails({ data, updateFielHandler, register, errors, setValue, getValues }: { data: any; updateFielHandler: any, register: any, errors: any, setValue: any, getValues: any }) {
    return (
        <div className="grid grid-cols-6 md:gap-6 gap-2">
            <div className="relative z-0 w-full mb-5 group md:col-span-1 col-span-2">
                <input
                    type="text"
                    {...register("addressDTO.cep")}
                    value={mask(data?.cep, ['99999-999']) || ""}
                    onChange={(e) => { checkCEP(e, setValue, getValues, updateFielHandler); updateFielHandler("cep", e.target.value) }}
                    name="addressDTO.cep"
                    id="addressDTO.cep"
                    className="input_default_one_line peer"
                />
                <label
                    htmlFor="addressDTO.cep"
                    className="label_input_default_one_line">CEP</label>
            </div>
            <div className="relative z-0 w-full mb-5 group col-span-4">
                <input
                    type="text"
                    {...register("addressDTO.street")}
                    value={data.street || ""}
                    name="addressDTO.street"
                    id="addressDTO.street"
                    className="input_default_one_line peer"
                />
                <label
                    htmlFor="addressDTO.street"
                    className="label_input_default_one_line">Rua/Logradouro</label>
            </div>
            <div className="relative z-0 w-full mb-5 group col-span-1">
                <input
                    type="text"
                    {...register("addressDTO.number")}
                    value={data.number || ""}
                    name="addressDTO.number"
                    id="addressDTO.number"
                    className="input_default_one_line peer"
                />
                <label
                    htmlFor="addressDTO.number"
                    className="label_input_default_one_line">Número</label>
            </div>
            <div className="relative z-0 w-full mb-5 group col-span-1">
                <select
                    value={data.state || ""}
                    {...register("addressDTO.state")}
                    name="addressDTO.state"
                    id="addressDTO.state"
                    className="select_input_default_one_line peer"
                >
                    <option selected value="AC">Acre</option>
                    <option value="AL">Alagoas</option>
                    <option value="AP">Amapá</option>
                    <option value="AM">Amazonas</option>
                    <option value="BA">Bahia</option>
                    <option value="CE">Ceará</option>
                    <option value="DF">Distrito Federal</option>
                    <option value="ES">Espírito Santo</option>
                    <option value="GO">Goiás</option>
                    <option value="MA">Maranhão</option>
                    <option value="MT">Mato Grosso</option>
                    <option value="MS">Mato Grosso do Sul</option>
                    <option value="MG">Minas Gerais</option>
                    <option value="PA">Pará</option>
                    <option value="PB">Paraíba</option>
                    <option value="PR">Paraná</option>
                    <option value="PE">Pernambuco</option>
                    <option value="PI">Piauí</option>
                    <option value="RJ">Rio de Janeiro</option>
                    <option value="RN">Rio Grande do Norte</option>
                    <option value="RS">Rio Grande do Sul</option>
                    <option value="RO">Rondônia</option>
                    <option value="RR">Roraima</option>
                    <option value="SC">Santa Catarina</option>
                    <option value="SP">São Paulo</option>
                    <option value="SE">Sergipe</option>
                    <option value="TO">Tocantins</option>
                    <option value="EX">Estrangeiro</option>
                </select>
                <label
                    htmlFor="addressDTO.state"
                    className="label_input_default_one_line">Estado</label>
            </div>
            <div className="relative z-0 w-full mb-5 group md:col-span-3 col-span-4">
                <input
                    type="text"
                    {...register("addressDTO.city")}
                    value={data.city || ""}
                    name="addressDTO.city"
                    id="addressDTO.city"
                    className="input_default_one_line peer"
                />
                <label
                    htmlFor="addressDTO.city"
                    className="label_input_default_one_line">Cidade</label>
            </div>
            <div className="relative z-0 w-full mb-5 group md:col-span-2 col-span-6">
                <input
                    type="text"
                    {...register("addressDTO.neighborhood")}
                    value={data.neighborhood || ""}
                    name="addressDTO.neighborhood"
                    id="addressDTO.neighborhood"
                    className="input_default_one_line peer"
                />
                <label
                    htmlFor="addressDTO.neighborhood"
                    className="label_input_default_one_line">Bairro</label>
            </div>
            <div className="relative z-0 w-full mb-5 group col-span-6">
                <input
                    type="text"
                    {...register("addressDTO.complement")}
                    value={data.complement || ""}
                    name="addressDTO.complement"
                    id="addressDTO.complement"
                    className="input_default_one_line peer"
                />
                <label
                    htmlFor="addressDTO.complement"
                    className="label_input_default_one_line">Complemento</label>
            </div>


        </div>

    );
}