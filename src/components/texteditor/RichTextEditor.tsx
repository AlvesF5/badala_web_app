import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Importa os estilos do Quill

const RichTextEditor = () => {
  const [value, setValue] = useState('');

  // Configuração personalizada da barra de ferramentas
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike'],        // Botões de formatação de texto
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['link', 'image'],                               // Botões para adicionar links e imagens
      ['clean']                                        // Botão para limpar a formatação
    ],
  };

  return (
    <div>
      <ReactQuill theme="snow" value={value} onChange={setValue} modules={modules} />
    </div>
  );
};

export default RichTextEditor;