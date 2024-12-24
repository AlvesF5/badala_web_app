import numeral from "numeral";
import "numeral/locales/pt-br";
import InputMoney from "@/components/input/InputMoney";
import { Controller } from "react-hook-form";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { useState, useEffect } from "react";

numeral.locale("pt-br");

export default function SectorDetails({
    register,
    errors,
    data,
    updateFieldHandler,
    control,
    updateFielHandler
}: {
    register: any;
    errors: any;
    data: any;
    updateFieldHandler: any;
    control: any;
    updateFielHandler: any
}) {
    // Função para adicionar um novo setor
    const addSector = () => {
        const newSector = {
            sectorName: "",
            capacity: 0,
            sectorDescription: "",
            salePrice: 0,
            sectorType: "",
        };
        updateFieldHandler("sectors", [...data.sectors, newSector]);
    };

    // Função para remover um setor
    const removeSector = (index: number) => {
        const updatedSectors = data.sectors.filter((_: any, i: number) => i !== index);
        updateFieldHandler("sectors", updatedSectors);
    };

    // Função para atualizar um campo específico de um setor
    const handleSectorChange = (index: number, field: string, value: any) => {
        const updatedSectors = [...data.sectors]; // Create a copy of the sectors array
        updatedSectors[index] = { ...updatedSectors[index], [field]: value }; // Update the specific field
        updateFieldHandler("sectors", updatedSectors); // Update the state with the new sectors array
    };

    const [editorState, setEditorState] = useState(() => {
        try {
            return data.sectorDescription && typeof data.sectorDescription === "string"
                ? EditorState.createWithContent(convertFromRaw(JSON.parse(data.sectorDescription)))
                : EditorState.createEmpty();
        } catch (error) {
            console.error("Erro ao processar sectorDescription:", error);
            return EditorState.createEmpty();
        }
    });

    useEffect(() => {
        try {
            if (data.sectorDescription && typeof data.sectorDescription === "string") {
                setEditorState(EditorState.createWithContent(convertFromRaw(JSON.parse(data.sectorDescription))));
            }
        } catch (error) {
            console.error("Erro ao processar sectorDescription no useEffect:", error);
        }
    }, [data.sectorDescription]);

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Setores</h2>
            {data.sectors.map((sector: any, index: number) => (
                <div key={index} className="mb-6">
                    <div className="relative z-0 w-full mb-8 group">
                        <input
                            {...register(`sectors.${index}.sectorName`)}
                            value={sector.sectorName || ""}
                            onChange={(e) => handleSectorChange(index, "sectorName", e.target.value)}
                            className="input_default_one_line peer"
                            name={`sectors.${index}.sectorName`}
                            id={`sectors.${index}.sectorName`}
                        />
                        <label htmlFor={`sectors.${index}.sectorName`} className="label_input_default_one_line">
                            Nome do Setor
                        </label>
                    </div>

                    <div className="relative z-0 w-full mb-5 group">
                        <Controller
                            name={`sectors.${index}.sectorDescription`}
                            control={control}
                            defaultValue={data.sectorDescription || ""}
                            render={({ field }) => (
                                <Editor
                                    editorState={editorState}
                                    onEditorStateChange={(state) => {
                                        setEditorState(state);
                                        const rawContent = convertToRaw(state.getCurrentContent());
                                        const hasText = state.getCurrentContent().hasText();
                                        const contentAsString = hasText ? JSON.stringify(rawContent) : "";
                                        field.onChange(contentAsString);
                                        updateFielHandler("sectorDescription", contentAsString);
                                    }}
                                    wrapperClassName="border border-gray-300 rounded-md bg-balada_gray_900"
                                    editorClassName="p-4 min-h-[200px] text-gray-800 bg-balada_gray_600"
                                    toolbarClassName="border-b border-gray-300"
                                />
                            )}
                        />
                        <label htmlFor={`sectors.${index}.sectorDescription`} className="label_textarea">
                            Descrição do setor
                        </label>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="relative z-0 w-full mb-5 group">
                            <input
                                {...register(`sectors.${index}.capacity`, { valueAsNumber: true })}
                                value={sector.capacity || 0}
                                onChange={(e) => handleSectorChange(index, "capacity", Math.max(0, Number(e.target.value)))}
                                type="number"
                                name={`sectors.${index}.capacity`}
                                id={`sectors.${index}.capacity`}
                                className="input_default_one_line peer"
                            />
                            <label htmlFor={`sectors.${index}.capacity`} className="label_input_default_one_line">
                                Qtd. Ingressos
                            </label>
                        </div>

                        <div className="relative z-0 w-full mb-5 group">

                            <Controller
                                name={`sectors.${index}.salePrice`}
                                control={control}
                                defaultValue={sector.salePrice || 0} // Valor inicial como número
                                render={({ field }) => (
                                    <InputMoney
                                        className="input_default_one_line peer"
                                        value={field.value} // Vincula o valor ao estado do formulário
                                        onChange={(value) => {
                                            field.onChange(value); // Atualiza o estado do formulário
                                            handleSectorChange(index, "salePrice", value); // Atualiza o estado local
                                        }}
                                    />
                                )}
                            />

                            <label htmlFor={`sectors.${index}.salePrice`} className="label_input_default_one_line">
                                Preço de Venda
                            </label>
                        </div>

                        <div className="relative z-0 w-full mb-5 group">
                            <select
                                {...register(`sectors.${index}.sectorType`)}
                                value={sector.sectorType || ""}
                                onChange={(e) => handleSectorChange(index, "sectorType", e.target.value)}
                                className="select_input_default_one_line peer"
                                name={`sectors.${index}.sectorType`}
                                id={`sectors.${index}.sectorType`}
                            >
                                <option value="" selected>
                                    Definir
                                </option>
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
                    <button type="button" onClick={() => removeSector(index)} className="text-red-500">
                        Remover Setor
                    </button>
                </div>
            ))}

            {/* Botão para adicionar novo setor */}
            <button type="button" onClick={addSector} className="bg-blue-500 text-white px-4 py-2 rounded">
                Adicionar Setor
            </button>
            <div>
                {errors?.sectors &&
                    errors.sectors.map((sectorError: any, index: number) => (
                        <div key={index} className="div_container_form_errors">
                            {sectorError?.sectorName && <span className="label_error_input_forms">{sectorError.sectorName.message}</span>}
                            {sectorError?.description && <span className="label_error_input_forms">{sectorError.description.message}</span>}
                            {sectorError?.capacity && <span className="label_error_input_forms">{sectorError.capacity.message}</span>}
                            {sectorError?.salePrice && <span className="label_error_input_forms">{sectorError.salePrice.message}</span>}
                            {sectorError?.sectorType && <span className="label_error_input_forms">{sectorError.sectorType.message}</span>}
                        </div>
                    ))}
            </div>
        </div>
    );
}