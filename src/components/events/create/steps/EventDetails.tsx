import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Controller } from 'react-hook-form';
import { useState } from "react";
import { EditorState, convertToRaw } from 'draft-js';

export default function EventDetails({ data, updateFielHandler, register, errors, control }: { data: any, updateFielHandler: any, register: any; errors: any, control: any }) {

    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    const handleDateChange = (key: string, value: string) => {
        // Adiciona segundos ao valor do input e converte para um objeto Date
        const dateWithSeconds = new Date(`${value}:00`);
        updateFielHandler(key, dateWithSeconds.toISOString()); // Converte para ISO 8601
    };
  
    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Detalhes do Evento</h2>

            <div className="relative z-0 w-full mb-5 group">
                <input
                    {...register('eventName')}
                    type="text"
                    value={data.eventName || ""}
                    onChange={(e) => updateFielHandler("eventName", e.target.value)}
                    name="eventName"
                    id="eventName"
                    className="input_default_one_line peer"
                />
                <label htmlFor="eventName" className="label_input_default_one_line">Nome do Evento</label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative z-0 w-full mb-5 group">
                    <input
                        {...register('startDate')}
                        type="datetime-local"
                        value={data.startDate ? new Date(data.startDate).toISOString().slice(0, 16) : ""}
                        onChange={(e) => handleDateChange("startDate", e.target.value)}
                        name="startDate"
                        id="startDate"
                        className="input_default_one_line peer"
                    />
                    <label htmlFor="startDate" className="label_input_default_one_line">Data de Início</label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <input
                        {...register('endDate')}
                        type="datetime-local"
                        value={data.endDate ? new Date(data.endDate).toISOString().slice(0, 16) : ""}
                        onChange={(e) => handleDateChange("endDate", e.target.value)}
                        name="endDate"
                        id="endDate"
                        className="input_default_one_line peer"
                    />
                    <label htmlFor="endDate" className="label_input_default_one_line">Data de Término</label>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative z-0 w-full mb-5 group">
                    <input
                        {...register('spaceName')}
                        type="text"
                        value={data.spaceName || ""}
                        onChange={(e) => updateFielHandler("spaceName", e.target.value)}
                        name="spaceName"
                        id="spaceName"
                        className="input_default_one_line peer"
                    />
                    <label htmlFor="spaceName" className="label_input_default_one_line">Local do evento</label>
                </div>

                <div className="relative z-0 w-full mb-5 group">
                    <select
                        {...register('category')}
                        value={data.category || ""}
                        onChange={(e) => updateFielHandler("category", e.target.value)}
                        name="category"
                        id="category"
                        className="select_input_default_one_line peer"
                    >
                        <option value="" selected>Definir</option>
                        <option value="SHOWS">Shows</option>
                        <option value="THEATER">Teatro</option>
                        <option value="TALK">Palestra</option>
                        <option value="STAND_UP">Stand-up</option>
                        <option value="KIDS">Infantil</option>
                    </select>
                    <label htmlFor="category" className="label_input_default_one_line">Categoria</label>
                </div>

                <div className="relative z-0 w-full mb-5 group">
                    <select
                        {...register('classification')}
                        value={data.classification || ""}
                        onChange={(e) => updateFielHandler("classification", e.target.value)}
                        name="classification"
                        id="classification"
                        className="select_input_default_one_line peer"
                    >
                        <option value="" selected>Definir</option>
                        <option value="CL">Livre</option>
                        <option value="C10">10 Anos</option>
                        <option value="C12">12 Anos</option>
                        <option value="C14">14 Anos</option>
                        <option value="C16">16 Anos</option>
                        <option value="C18">18 Anos</option>
                    </select>
                    <label htmlFor="classification" className="label_input_default_one_line">Classificação</label>
                </div>
            </div>

            <div className="relative z-0 w-full mb-5 mt-4 group">
                <Controller
                    name="eventDescription"
                    control={control}
                    defaultValue="" // Inicializa como string vazia
                    render={({ field }) => (
                        <Editor
                            editorState={editorState}
                            onEditorStateChange={(state) => {
                                setEditorState(state); // Atualiza o estado local
                                const rawContent = convertToRaw(state.getCurrentContent()); // Converte o conteúdo para raw
                                const contentAsString = JSON.stringify(rawContent); // Converte para string JSON
                                field.onChange(contentAsString); // Atualiza o estado do formulário com a string
                            }}
                            wrapperClassName="border border-gray-300 rounded-md"
                            editorClassName="p-4 min-h-[200px] text-gray-800"
                            toolbarClassName="border-b border-gray-300 bg-gray-100"
                        />
                    )}
                />
                <label htmlFor="eventDescription" className="label_textarea">Descrição do Evento</label>
            </div>

            <div className="div_container_form_errors">
                {errors?.eventName && <span className='label_error_input_forms'>{errors.eventName.message}</span>}
                {errors?.startDate && <span className='label_error_input_forms'>{errors.startDate.message}</span>}
                {errors?.endDate && <span className='label_error_input_forms'>{errors.endDate.message}</span>}
                {errors?.spaceName && <span className='label_error_input_forms'>{errors.spaceName.message}</span>}
                {errors?.category && <span className='label_error_input_forms'>{errors.category.message}</span>}
                {errors?.classification && <span className='label_error_input_forms'>{errors.classification.message}</span>}
                {errors?.eventDescription && <span className='label_error_input_forms'>{errors.eventDescription.message}</span>}
            </div>
        </div>
    );
}