import React, { useRef, useState } from "react";
import { Icon } from "react-icons-kit";
import { list } from "react-icons-kit/fa/list";
import { listOl } from "react-icons-kit/fa/listOl";

type TextEditorProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

const TextEditor: React.FC<TextEditorProps> = ({ value, onChange }) => {
  const textAreaRef = useRef<HTMLDivElement>(null);
  const [isPlaceholderVisible, setIsPlaceholderVisible] = useState(true);

  const handleCommand = (command: string, value?: string) => {
    if (isPlaceholderVisible) {
      setIsPlaceholderVisible(false);
      if (textAreaRef.current) {
        textAreaRef.current.innerHTML = ""; // Limpa o texto inicial
      }
    }
    if (textAreaRef.current) {
      textAreaRef.current.focus(); // Garante que o elemento está focado
      document.execCommand(command, false, value || "");
    }
  };

  const handleFocus = () => {
    if (isPlaceholderVisible) {
      setIsPlaceholderVisible(false);
      if (textAreaRef.current) {
        textAreaRef.current.innerHTML = ""; // Limpa o texto inicial
      }
    }
  };

  const formatLists = () => {
    if (textAreaRef.current) {
      const editorContent = textAreaRef.current.innerHTML;
      const parser = new DOMParser();
      const doc = parser.parseFromString(editorContent, "text/html");

      // Formatar listas ordenadas
      const orderedLists = doc.querySelectorAll("ol");
      orderedLists.forEach((ol) => {
        let index = 1;
        ol.querySelectorAll("li").forEach((li) => {
          li.textContent = `${index}. ${li.textContent?.trim()}`;
          index++;
        });
      });

      // Formatar listas não ordenadas
      const unorderedLists = doc.querySelectorAll("ul");
      unorderedLists.forEach((ul) => {
        ul.querySelectorAll("li").forEach((li) => {
          li.textContent = `# ${li.textContent?.trim()}`;
        });
      });

      // Atualizar o conteúdo do editor
      textAreaRef.current.innerHTML = doc.body.innerHTML;
    }
  };

  const clearFormatting = () => {
    if (textAreaRef.current) {
      const content = textAreaRef.current.innerHTML;

      // Remove todas as tags HTML, incluindo listas ordenadas e não ordenadas
      const plainText = content
        .replace(/<\/?[^>]+(>|$)/g, "") // Remove todas as tags HTML
        .replace(/^\s*\d+\.\s+/gm, "") // Remove números de listas ordenadas
        .replace(/^\s*#\s+/gm, ""); // Remove marcadores de listas não ordenadas

      // Atualiza o editor com o texto sem formatação
      textAreaRef.current.innerHTML = plainText;
    }
  };

  return (
    <div>
      {/* Barra de Ferramentas */}
      <div className="flex gap-2 mb-2">
        <button
          type="button"
          onClick={() => handleCommand("bold")}
          className="p-2 border rounded hover:bg-gray-200"
        >
          <b>B</b>
        </button>
        <button
          type="button"
          onClick={() => handleCommand("italic")}
          className="p-2 border rounded hover:bg-gray-200"
        >
          <i>I</i>
        </button>
        <button
          type="button"
          onClick={() => handleCommand("underline")}
          className="p-2 border rounded hover:bg-gray-200"
        >
          <u>U</u>
        </button>
        <button
          type="button"
          onClick={() => {
            handleCommand("insertOrderedList");
            setTimeout(formatLists, 0); // Formatar após a execução do comando
          }}
          className="p-2 border rounded hover:bg-gray-200"
        >
          <Icon icon={listOl} /> {/* Ícone para lista ordenada */}
        </button>
        <button
          type="button"
          onClick={() => {
            handleCommand("insertUnorderedList");
            setTimeout(formatLists, 0); // Formatar após a execução do comando
          }}
          className="p-2 border rounded hover:bg-gray-200"
        >
          <Icon icon={list} /> {/* Ícone para lista não ordenada */}
        </button>
        <button
          type="button"
          onClick={clearFormatting}
          className="p-2 border rounded hover:bg-gray-200"
        >
          Limpar formatação {/* Botão para limpar formatação */}
        </button>
      </div>

      {/* Área de Edição */}
      <div
        ref={textAreaRef}
        contentEditable
        className="border p-4 rounded min-h-[200px] focus:outline-none peer"
        style={{
          whiteSpace: "pre-wrap",
          color: isPlaceholderVisible ? "gray" : "black",
        }}
        onFocus={handleFocus}
      >
        {isPlaceholderVisible ? "Escreva algo aqui..." : ""}
      </div>
    </div>
  );
};

export default TextEditor;