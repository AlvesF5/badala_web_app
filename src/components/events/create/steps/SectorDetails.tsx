import { useFieldArray } from 'react-hook-form';

export default function SectorDetails({ data, updateFielHandler, register, errors, control }: { data: any; updateFielHandler: any, register: any, errors: any, control: any }) {
    // useFieldArray para gerenciar a lista de setores
    const { fields, append, remove } = useFieldArray({
        control,
        name: "sectors", // Nome do campo que será um array
    });

    // Função para adicionar um novo setor
    const addSector = () => {
        append({
            sectorName: "",
            capacity: 0,
            sectorDescription: "",
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
                            {...register(`sectors.${index}.sectorName`)}
                            onChange={(e) => updateFielHandler(`sectors.${index}.sectorName`, e.target.value)}
                            value={data.sectors[index]?.sectorName || ""}
                            className="input_default_one_line peer"
                            name={`sectors.${index}.sectorName`}
                            id={`sectors.${index}.sectorName`}
                        />
                        <label htmlFor={`sectors.${index}.sectorName`} className="label_input_default_one_line">
                            Nome do Setor
                        </label>
                    </div>

                    <div className="relative z-0 w-full mb-5 group">
                        <textarea
                            {...register(`sectors.${index}.description`)}
                            onChange={(e) => updateFielHandler(`sectors.${index}.description`, e.target.value)}
                            value={data.sectors[index]?.description || ""}
                            className="textarea_default peer min-h-32"
                            name={`sectors.${index}.description`}
                            id={`sectors.${index}.description`}
                        />
                        <label htmlFor={`sectors.${index}.description`} className="label_textarea">
                            Descrição
                        </label>
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                        <div className="relative z-0 w-full mb-5 group">
                            <input
                                {...register(`sectors.${index}.capacity`, { valueAsNumber: true })}
                                type="number"
                                name={`sectors.${index}.capacity`}
                                id={`sectors.${index}.capacity`}
                                value={data.sectors[index]?.capacity || 0}
                                className="input_default_one_line peer"
                            />
                            <label htmlFor={`sectors.${index}.capacity`} className="label_input_default_one_line">
                                Capacidade
                            </label>
                        </div>

                        <div className="relative z-0 w-full mb-5 group">
                            <input
                                {...register(`sectors.${index}.salePrice`, { valueAsNumber: true })}
                                type="number"
                                name={`sectors.${index}.salePrice`}
                                id={`sectors.${index}.salePrice`}
                                value={data.sectors[index]?.salePrice || 0}
                                placeholder="Preço de Venda"
                                className="input_default_one_line peer"
                            />
                            <label htmlFor={`sectors.${index}.salePrice`} className="label_input_default_one_line">
                                Preço de Venda
                            </label>
                        </div>

                        <div className="relative z-0 w-full mb-5 group">
                            <select
                                {...register(`sectors.${index}.sectorType`)}
                                className="select_input_default_one_line peer"
                                name={`sectors.${index}.sectorType`}
                                id={`sectors.${index}.sectorType`}
                                value={data.sectors[index]?.sectorType || "TRACK"}
                            >
                                <option value="TRACK">Pista</option>
                                <option value="CABIN">Camarote</option>
                                <option value="TABLE">Mesa</option>
                                <option value="LOUNGE">Lounge</option>
                                <option value="OTHER">Outro</option>
                            </select>
                            <label htmlFor={`sectors.${index}.sectorType`} className="label_input_default_one_line">
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

            <div>
                {errors?.sectors && errors.sectors.map((sectorError: any, index: number) => (
                    <div key={index} className="div_container_form_errors">
                        {sectorError?.sectorName && <span className='label_error_input_forms'>{sectorError.sectorName.message}</span>}
                        {sectorError?.description && <span className='label_error_input_forms'>{sectorError.description.message}</span>}
                        {sectorError?.capacity && <span className='label_error_input_forms'>{sectorError.capacity.message}</span>}
                        {sectorError?.salePrice && <span className='label_error_input_forms'>{sectorError.salePrice.message}</span>}
                        {sectorError?.sectorType && <span className='label_error_input_forms'>{sectorError.sectorType.message}</span>}
                    </div>
                ))}
            </div>
        </div>
    );
}