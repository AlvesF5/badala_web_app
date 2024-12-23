import React, { useState, useEffect } from "react";
import numeral from "numeral";
import "numeral/locales/pt-br"; // Importa o suporte para o idioma português

// Configura o idioma para português do Brasil
numeral.locale("pt-br");

interface InputMoneyProps {
    className?: string; // Propriedade opcional para receber classes personalizadas
    value?: number; // Valor inicial opcional
    onChange: (value: number) => void; // Função para atualizar o valor no estado do formulário
}

const InputMoney: React.FC<InputMoneyProps> = ({ className, value = 0, onChange }) => {
    const [displayValue, setDisplayValue] = useState("");

    // Atualiza o valor exibido quando o valor externo muda
    useEffect(() => {
        const formattedValue = numeral(value / 100).format("0,0.00");
        setDisplayValue(`R$ ${formattedValue}`);
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;

        // Remove caracteres não numéricos
        const numericValue = inputValue.replace(/[^0-9]/g, "");

        // Converte para número e chama o onChange com o valor numérico
        onChange(Number(numericValue));

        // Converte para número e formata no padrão BRL
        const formattedValue = numeral(Number(numericValue) / 100).format("0,0.00");

        // Atualiza o estado com o valor formatado
        setDisplayValue(`R$ ${formattedValue}`);
    };

    return (
        <div>
            <input
                id="moneyInput"
                type="text"
                value={displayValue}
                onChange={handleChange}
                placeholder="Digite um valor"
                className={className} // Aplica as classes personalizadas
            />
        </div>
    );
};

export default InputMoney;