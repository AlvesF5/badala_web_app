import { checkCEP } from '@/components/utils/checkCep';
import { mask } from "remask";

export default function AddressDetails({ register, errors, setValue, getValues }: { register: any, errors: any, setValue: any, getValues: any }) {
    return (
        <div className="grid grid-cols-6 md:gap-6 gap-2">
            <div className="relative z-0 w-full mb-5 group md:col-span-1 col-span-2">
                <input
                    type="text"
                    {...register("cep")}
                    onChange={(e) => { 
                        checkCEP(e, setValue, getValues); 
                        setValue("cep", mask(e.target.value, ['99999-999'])); 
                    }}
                    name="cep"
                    id="cep"
                    className="input_default_one_line peer"
                />
                <label htmlFor="cep" className="label_input_default_one_line">CEP</label>
            </div>
            <div className="relative z-0 w-full mb-5 group col-span-4">
                <input
                    type="text"
                    {...register("street")}
                    name="street"
                    id="street"
                    className="input_default_one_line peer"
                />
                <label htmlFor="street" className="label_input_default_one_line">Rua/Logradouro</label>
            </div>
            <div className="relative z-0 w-full mb-5 group col-span-1">
                <input
                    type="text"
                    {...register("number")}
                    name="number"
                    id="number"
                    className="input_default_one_line peer"
                />
                <label htmlFor="number" className="label_input_default_one_line">Número</label>
            </div>
            <div className="relative z-0 w-full mb-5 group col-span-1">
                <select
                    {...register("state")}
                    name="state"
                    id="state"
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
                <label htmlFor="state" className="label_input_default_one_line">Estado</label>
            </div>
            <div className="relative z-0 w-full mb-5 group md:col-span-3 col-span-4">
                <input
                    type="text"
                    {...register("city")}
                    name="city"
                    id="city"
                    className="input_default_one_line peer"
                />
                <label htmlFor="city" className="label_input_default_one_line">Cidade</label>
            </div>
            <div className="relative z-0 w-full mb-5 group md:col-span-2 col-span-6">
                <input
                    type="text"
                    {...register("neighborhood")}
                    name="neighborhood"
                    id="neighborhood"
                    className="input_default_one_line peer"
                />
                <label htmlFor="neighborhood" className="label_input_default_one_line">Bairro</label>
            </div>
            <div className="relative z-0 w-full mb-5 group col-span-6">
                <input
                    type="text"
                    {...register("complement")}
                    name="complement"
                    id="complement"
                    className="input_default_one_line peer"
                />
                <label htmlFor="complement" className="label_input_default_one_line">Complemento</label>
            </div>

            <div className="div_container_form_errors">
                {errors?.cep && <span className='label_error_input_forms'>{errors.cep.message}</span>}
                {errors?.street && <span className='label_error_input_forms'>{errors.street.message}</span>}
                {errors?.number && <span className='label_error_input_forms'>{errors.number.message}</span>}
                {errors?.state && <span className='label_error_input_forms'>{errors.state.message}</span>}
                {errors?.city && <span className='label_error_input_forms'>{errors.city.message}</span>}
                {errors?.neighborhood && <span className='label_error_input_forms'>{errors.neighborhood.message}</span>}
                {errors?.complement && <span className='label_error_input_forms'>{errors.complement.message}</span>}
            </div>
        </div>
    );
}