import React, { useState } from "react";
import numeral from "numeral";
import "numeral/locales/pt-br"; // Importa o suporte para o idioma português

// Configura o idioma para português do Brasil
numeral.locale("pt-br");

interface InputMoneyProps {
    className?: string; // Propriedade opcional para receber classes personalizadas
    onChange: (value: number) => void;
}

const InputMoney: React.FC<InputMoneyProps> = ({ className, onChange }) => {
    const [value, setValue] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;

        // Remove caracteres não numéricos
        const numericValue = inputValue.replace(/[^0-9]/g, "");

        onChange(Number(numericValue));

        // Converte para número e formata no padrão BRL
        const formattedValue = numeral(Number(numericValue) / 100).format("0,0.00");

        // Atualiza o estado com o valor formatado
        setValue(`R$ ${formattedValue}`);

        
    };

    return (
        <div>
            <input
                id="moneyInput"
                type="text"
                value={value}
                onChange={handleChange}
                placeholder="Digite um valor"
                className={className} // Aplica as classes personalizadas
            />
        </div>
    );
};

export default InputMoney;