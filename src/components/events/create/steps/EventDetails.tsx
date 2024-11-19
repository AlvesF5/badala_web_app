export default function EventDetails({ data, updateFielHandler, register, errors }: { data: any; updateFielHandler: any, register: any, errors: any }) {
    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Detalhes do Evento</h2>
            <div className="relative z-0 w-full mb-5 group">
                <input
                    {...register('name')}
                    onChange={(e) => updateFielHandler("eventDTO.name", e.target.value)}
                    value={data.eventDTO.name || ""} 
                    name="name"
                    id="name"
                    className="input_default_one_line peer"
                />
                <label htmlFor="name" className="label_input_default_one_line">Nome do Evento</label>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative z-0 w-full mb-5 group">
                    <input
                        {...register('startDate')}
                        type="datetime-local"
                        onChange={(e) => updateFielHandler("eventDTO.startDate", e.target.value)}
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
                 
                        onChange={(e) => updateFielHandler("eventDTO.endDate", e.target.value)}
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
                    
                        onChange={(e) => updateFielHandler("eventDTO.spaceName", e.target.value)}
                        name="spaceName"
                        id="spaceName"
                        className="input_default_one_line peer"
                    />
                    <label htmlFor="spaceName" className="label_input_default_one_line">Local do evento</label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <select
                        {...register('category')}
                     
                        onChange={(e) => updateFielHandler("eventDTO.category", e.target.value)}
                        name="category"
                        id="category"
                        className="select_input_default_one_line peer"
                    >
                        <option value="SHOWS" selected>Shows</option>
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
                      
                        onChange={(e) => updateFielHandler("eventDTO.classification", e.target.value)}
                        name="classification"
                        id="classification"
                        className="select_input_default_one_line peer">
                        <option value="CL" selected>Livre</option>
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
                <textarea
                    {...register('eventDescription')}
               
                    onChange={(e) => updateFielHandler("eventDTO.eventDescription", e.target.value)}
                    name="eventDescription"
                    id="eventDescription"
                    className="textarea_default min-h-32 peer"
                />
                <label htmlFor="eventDescription" className="label_textarea">
                    Descrição do Evento
                </label>
            </div>

            <div className="div_container_form_errors">
                {errors?.name && <span className='label_error_input_forms'>{errors.name.message}</span>}
                {errors?.startDate && <span className='label_error_input_forms'>{errors.startDate.message}</span>}
                {errors?.endDate && <span className='label_error_input_forms'>{errors.endDate.message}</span>}
                {errors?.spaceName && <span className='label_error_input_forms'>{errors.spaceName.message}</span>}
                {errors?.category && <span className='label_error_input_forms'>{errors.category.message}</span>}
                {errors?.classification && <span className='label_error_input_forms'>{errors.classification.message}</span>}
                {errors?.description && <span className='label_error_input_forms'>{errors.description.message}</span>}
            </div>
        </div>
    );
}