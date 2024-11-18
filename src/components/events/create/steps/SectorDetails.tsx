import {useFieldArray } from 'react-hook-form';

export default function SectorDetails({ data, updateFielHandler, register, errors, control }: { data: any; updateFielHandler: any, register: any, errors: any, control: any }) {
        // useFieldArray para gerenciar a lista de setores
        const { fields, append, remove } = useFieldArray({
            control,
            name: "sectorDTO.sectors", // Nome do campo que será um array
        });
    
        // Função para adicionar um novo setor
        const addSector = () => {
            append({
                name: "",
                capacity: 0,
                description: "",
                salePrice: 0,
                sectorType: "",
            });
        };
    
        return (
            <div>
                <h2 className="text-xl font-semibold mb-4">Setores</h2>
    
                {fields.map((field, index) => (
                    <div key={field.id} className="mb-6">
                        <div className="relative z-0 w-full mb-8 group">
                            <input
                                {...register(`sectorDTO.sectors.${index}.name`)}
                                className="input_default_one_line peer"
                            />
                            <label htmlFor={`sectorDTO.sectors.${index}.name`} className="label_input_default_one_line">
                                Nome do Setor
                            </label>
                        </div>
    
                        <div className="relative z-0 w-full mb-5 group">
                            <textarea
                                {...register(`sectorDTO.sectors.${index}.description`)}
                                className="textarea_default peer min-h-32"
                                name="eventDTO.description"
                                id="eventDTO.description"
                            />
                            <label htmlFor={`sectorDTO.sectors.${index}.description`} className="label_textarea">
                                Descrição
                            </label>
                        </div>
    
                        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
    
                            <div className="relative z-0 w-full mb-5 group">
                                <input
                                    {...register(`sectorDTO.sectors.${index}.capacity`)}
                                    type="number"
                                    placeholder="Capacidade"
                                    className="input_default_one_line peer"
                                />
                                <label htmlFor={`sectorDTO.sectors.${index}.capacity`} className="label_input_default_one_line">
                                    Capacidade
                                </label>
                            </div>
    
    
                            <div className="relative z-0 w-full mb-5 group">
                                <input
                                    {...register(`sectorDTO.sectors.${index}.salePrice`)}
                                    type="number"
                                    placeholder="Preço de Venda"
                                    className="input_default_one_line peer"
                                />
                                <label htmlFor={`sectorDTO.sectors.${index}.salePrice`} className="label_input_default_one_line">
                                    Preço de Venda
                                </label>
                            </div>
    
                            <div className="relative z-0 w-full mb-5 group">
                                <select {...register(`sectorDTO.sectors.${index}.sectorType`)} className="select_input_default_one_line peer">
                                    <option value="TRACK" selected>Pista</option>
                                    <option value="CABIN">Camarote</option>
                                    <option value="TABLE">Mesa</option>
                                    <option value="LOUNGE">Lounge</option>
                                    <option value="OTHER">Outro</option>
                                </select>
                                <label htmlFor={`sectorDTO.sectors.${index}.sectorType`} className="label_input_default_one_line">
                                    Tipo de Setor
                                </label>
                            </div>
    
                        </div>
    
                        {/* Botão para remover setor */}
                        <button
                            type="button"
                            onClick={() => remove(index)}
                            className="text-red-500"
                        >
                            Remover Setor
                        </button>
                    </div>
                ))}
    
                {/* Botão para adicionar novo setor */}
                <button
                    type="button"
                    onClick={addSector}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Adicionar Setor
                </button>
            </div>
        );
}