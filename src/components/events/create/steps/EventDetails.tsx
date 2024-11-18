export default function EventDetails({ data, updateFielHandler, register, errors }: { data: any; updateFielHandler: any, register: any, errors: any }) {
    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Detalhes do Evento</h2>
            <div className="relative z-0 w-full mb-5 group">
                <input
                    {...register('eventDTO.name')}
                    value={data.eventDTO.name || ""}
                    onChange={(e) => updateFielHandler("eventDTO.name", e.target.value)}
                    name="eventDTO.name"
                    id="eventDTO.name"
                    className="input_default_one_line peer"
                />
                <label htmlFor="eventDTO.name" className="label_input_default_one_line">Nome do Evento</label>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative z-0 w-full mb-5 group">
                    <input
                        {...register('eventDTO.startDate')}
                        type="datetime-local"
                        value={data.eventDTO.startDate || ""}
                        onChange={(e) => updateFielHandler("eventDTO.startDate", e.target.value)}
                        name="eventDTO.startDate"
                        id="eventDTO.startDate"
                        className="input_default_one_line peer"
                    />
                    <label htmlFor="eventDTO.startDate" className="label_input_default_one_line">Data de Início</label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <input
                        {...register('eventDTO.endDate')}
                        type="datetime-local"
                        value={data.eventDTO.endDate || ""}
                        onChange={(e) => updateFielHandler("eventDTO.endDate", e.target.value)}
                        name="eventDTO.endDate"
                        id="eventDTO.endDate"
                        className="input_default_one_line peer"
                    />
                    <label htmlFor="eventDTO.endDate" className="label_input_default_one_line">Data de Término</label>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative z-0 w-full mb-5 group">
                    <input
                        {...register('eventDTO.spaceName')}
                        value={data.eventDTO.spaceName || ""}
                        onChange={(e) => updateFielHandler("eventDTO.spaceName", e.target.value)}
                        name="eventDTO.spaceName"
                        id="eventDTO.spaceName"
                        className="input_default_one_line peer"
                    />
                    <label htmlFor="eventDTO.spaceName" className="label_input_default_one_line">Local do evento</label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <select
                        {...register('eventDTO.category')}
                        value={data.eventDTO.category || ""}
                        onChange={(e) => updateFielHandler("eventDTO.category", e.target.value)}
                        name="eventDTO.category"
                        id="eventDTO.category"
                        className="select_input_default_one_line peer"
                    >
                        <option value="SHOWS" selected>Shows</option>
                        <option value="THEATER">Teatro</option>
                        <option value="TALK">Palestra</option>
                        <option value="STAND_UP">Stand-up</option>
                        <option value="KIDS">Infantil</option>
                    </select>
                    <label htmlFor="eventDTO.category" className="label_input_default_one_line">Categoria</label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <select
                        {...register('eventDTO.classification')}
                        value={data.eventDTO.classification || ""}
                        onChange={(e) => updateFielHandler("eventDTO.classification", e.target.value)}
                        name="eventDTO.classification"
                        id="eventDTO.classification"
                        className="select_input_default_one_line peer">
                        <option value="CL" selected>Livre</option>
                        <option value="C10">10 Anos</option>
                        <option value="C12">12 Anos</option>
                        <option value="C14">14 Anos</option>
                        <option value="C16">16 Anos</option>
                        <option value="C18">18 Anos</option>
                    </select>
                    <label htmlFor="eventDTO.classification" className="label_input_default_one_line">Classificação</label>
                </div>
            </div>
            <div className="relative z-0 w-full mb-5 mt-4 group">
                <textarea
                    {...register('eventDTO.description')}
                    value={data.eventDTO.description || ""}
                    onChange={(e) => updateFielHandler("eventDTO.description", e.target.value)}
                    name="eventDTO.description"
                    id="eventDTO.description"
                    className="textarea_default peer min-h-32"
                />
                <label htmlFor="eventDTO.description" className="label_textarea">
                    Descrição do Evento
                </label>
            </div>
            <div className="div_container_form_errors">
                {errors?.eventDTO.name && <span className='label_error_input_forms'>{errors.eventDTO.name.message}</span>}
                {errors?.eventDTO.startDate && <span className='label_error_input_forms'>{errors.eventDTO.startDate.message}</span>}
                {errors?.eventDTO.endDate && <span className='label_error_input_forms'>{errors.eventDTO.endDate.message}</span>}
                {errors?.eventDTO.spaceName && <span className='label_error_input_forms'>{errors.eventDTO.spaceName.message}</span>}
                {errors?.eventDTO.category && <span className='label_error_input_forms'>{errors.eventDTO.category.message}</span>}
                {errors?.eventDTO.classification && <span className='label_error_input_forms'>{errors.eventDTO.classification.message}</span>}
                {errors?.eventDTO.description && <span className='label_error_input_forms'>{errors.eventDTO.description.message}</span>}
            </div>
        </div>
    );
}