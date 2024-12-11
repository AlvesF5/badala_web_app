import { useState } from "react";

export default function EventBanner({ onBannerSelect }: { onBannerSelect: (file: File | null) => void }) {
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (!file) {
            setError("Nenhum arquivo selecionado.");
            onBannerSelect(null);
            return;
        }

        // Verifica o tamanho do arquivo (máximo 10MB)
        if (file.size > 10 * 1024 * 1024) {
            setError("O arquivo deve ter no máximo 10MB.");
            setImagePreview(null);
            onBannerSelect(null);
            return;
        }

        // Verifica o formato do arquivo
        const validFormats = ["image/png", "image/jpg", "image/jpeg", "image/webp"];
        if (!validFormats.includes(file.type)) {
            setError("Formato inválido. Apenas PNG, JPG, JPEG e WEBP são permitidos.");
            setImagePreview(null);
            onBannerSelect(null);
            return;
        }

        // Cria o preview da imagem
        const reader = new FileReader();
        reader.onload = () => {
            setImagePreview(reader.result as string);
            setError(null);
        };
        reader.readAsDataURL(file);

        // Passa o arquivo selecionado para o componente pai
        onBannerSelect(file);
    };

    return (
        <div className="w-full flex flex-col items-center">
            <h2 className="text-xl font-semibold mb-4">Banner do Evento</h2>

            <div className="relative z-0 w-full mb-5 group">
                <input
                    type="file"
                    accept="image/png, image/jpg, image/jpeg, image/webp"
                    onChange={handleFileChange}
                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                />
                <label className="text-sm text-gray-500 mt-2">
                    Selecione uma imagem (PNG, JPG, JPEG, WEBP) de até 10MB.
                </label>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            {imagePreview && (
                <div className="mt-2 flex flex-col justify-center items-center">
                    <div>
                        <p className="text-sm text-gray-500 mb-2">Preview da Imagem:</p>
                    </div>
                    <div
                        className="w-128 h-64 overflow-hidden flex justify-center items-center border border-gray-300 rounded-lg"
                    >
                        <img
                            src={imagePreview}
                            alt="Preview do Banner"
                            className="w-auto h-full object-contain"
                        />
                    </div>
                </div>
            )}
        </div>
    );
}