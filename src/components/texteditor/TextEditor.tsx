import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Icon } from "react-icons-kit";
import { bold, italic, underline, list, listNumbered, eraser } from "react-icons-kit/fa";
import { toast } from "sonner";

type TextEditorProps = {
  name: string;
  control: any;
};

const TextEditor: React.FC<TextEditorProps> = ({ name, control }) => {
  const handleCommand = (command: string) => {
    document.execCommand(command, false, "");
    toast.success(`Comando "${command}" aplicado!`);
  };

  const handleFontSize = (size: string) => {
    document.execCommand("fontSize", false, size);
    toast.success(`Tamanho da fonte ajustado para ${size}`);
  };

  const handleClearFormatting = () => {
    document.execCommand("removeFormat", false, "");
    toast.success("Formatação limpa!");
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
          <Icon icon={bold} />
        </button>
        <button
          type="button"
          onClick={() => handleCommand("italic")}
          className="p-2 border rounded hover:bg-gray-200"
        >
          <Icon icon={italic} />
        </button>
        <button
          type="button"
          onClick={() => handleCommand("underline")}
          className="p-2 border rounded hover:bg-gray-200"
        >
          <Icon icon={underline} />
        </button>
        <button
          type="button"
          onClick={() => handleCommand("insertOrderedList")}
          className="p-2 border rounded hover:bg-gray-200"
        >
          <Icon icon={listNumbered} />
        </button>
        <button
          type="button"
          onClick={() => handleCommand("insertUnorderedList")}
          className="p-2 border rounded hover:bg-gray-200"
        >
          <Icon icon={list} />
        </button>
        <button
          type="button"
          onClick={() => handleFontSize("3")}
          className="p-2 border rounded hover:bg-gray-200"
        >
          A+
        </button>
        <button
          type="button"
          onClick={() => handleFontSize("1")}
          className="p-2 border rounded hover:bg-gray-200"
        >
          A-
        </button>
        <button
          type="button"
          onClick={handleClearFormatting}
          className="p-2 border rounded hover:bg-gray-200"
        >
          <Icon icon={eraser} />
        </button>
      </div>

      {/* Área de Edição */}
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div
            contentEditable
            className="border p-4 rounded min-h-[200px] focus:outline-none"
            onInput={(e) => field.onChange((e.target as HTMLDivElement).innerHTML)}
            dangerouslySetInnerHTML={{ __html: field.value || "" }}
          />
        )}
      />
    </div>
  );
};

export default TextEditor;