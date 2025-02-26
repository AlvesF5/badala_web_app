"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Import correto para o sistema de rotas da pasta `app`
import { toast } from "sonner";

interface Sector {
    sectorName: string;
    capacity: number;
    sectorDescription: string;
    salePrice: number;
    sectorType: string;
}

interface Event {
    id: string;
    eventName: string;
    startDate: { seconds: number; nanos: number };
    endDate: { seconds: number; nanos: number };
    spaceName: string;
    category: string;
    classification: string;
    eventDescription: string;
    address: {
        cep: string;
        street: string;
        number: string;
        state: string;
        city: string;
        neighborhood: string;
        complement: string;
    };
    sector: {
        sectors: Sector[];
    };
}

const EditEventPage = ({ params }: { params: { id: string } }) => {
    const [event, setEvent] = useState<Event | null>(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter(); // Usando o hook correto do Next.js 13

    const fetchEvent = async () => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:8080/v1/events/${params.id}`);
            if (!response.ok) {
                throw new Error("Erro ao buscar evento");
            }
            const data = await response.json();
            setEvent(data);
        } catch (error) {
            toast.error("Erro ao carregar evento");
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async () => {
        if (!event) return;
        try {
            const response = await fetch(`http://localhost:8080/v1/events/update/${params.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    eventDTO: {
                        eventName: event.eventName,
                        startDate: event.startDate,
                        endDate: event.endDate,
                        spaceName: event.spaceName,
                        category: event.category,
                        classification: event.classification,
                        eventDescription: event.eventDescription,
                    },
                    sectorDTO: {
                        sectors: event.sector.sectors,
                    },
                    addressDTO: event.address,
                }),
            });
            if (!response.ok) {
                throw new Error("Erro ao atualizar evento");
            }
            toast.success("Evento atualizado com sucesso!");
        } catch (error) {
            toast.error("Erro ao atualizar evento");
        }
    };

    const handleAddSector = () => {
        if (!event) return;
        setEvent({
            ...event,
            sector: {
                sectors: [
                    ...event.sector.sectors,
                    {
                        sectorName: "",
                        capacity: 0,
                        sectorDescription: "",
                        salePrice: 0,
                        sectorType: "",
                    },
                ],
            },
        });
    };

    const handleRemoveSector = (index: number) => {
        if (!event) return;
        setEvent({
            ...event,
            sector: {
                sectors: event.sector.sectors.filter((_, i) => i !== index),
            },
        });
    };

    const handleSectorChange = (index: number, field: keyof Sector, value: any) => {
        if (!event) return;
        const updatedSectors = [...event.sector.sectors];
        updatedSectors[index] = { ...updatedSectors[index], [field]: value };
        setEvent({
            ...event,
            sector: {
                sectors: updatedSectors,
            },
        });
    };

    const handleAddressChange = (field: keyof Event["address"], value: string) => {
        if (!event) return;
        setEvent({
            ...event,
            address: {
                ...event.address,
                [field]: value,
            },
        });
    };

    useEffect(() => {
        fetchEvent();
    }, [params.id]);

    if (loading) {
        return <p>Carregando evento...</p>;
    }

    if (!event) {
        return <p>Evento não encontrado</p>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Editar Evento</h1>
            <form>
                <div className="mb-4">
                    <label className="block text-gray-700">Nome do Evento</label>
                    <input
                        type="text"
                        value={event.eventName}
                        onChange={(e) => setEvent({ ...event, eventName: e.target.value })}
                        className="w-full border border-gray-300 p-2 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Descrição</label>
                    <textarea
                        value={event.eventDescription}
                        onChange={(e) => setEvent({ ...event, eventDescription: e.target.value })}
                        className="w-full border border-gray-300 p-2 rounded"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Data de Início</label>
                    <input
                        type="datetime-local"
                        value={new Date(event.startDate.seconds * 1000).toISOString().slice(0, 16)}
                        onChange={(e) =>
                            setEvent({
                                ...event,
                                startDate: {
                                    seconds: Math.floor(new Date(e.target.value).getTime() / 1000),
                                    nanos: 0,
                                },
                            })
                        }
                        className="w-full border border-gray-300 p-2 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Data de Término</label>
                    <input
                        type="datetime-local"
                        value={new Date(event.endDate.seconds * 1000).toISOString().slice(0, 16)}
                        onChange={(e) =>
                            setEvent({
                                ...event,
                                endDate: {
                                    seconds: Math.floor(new Date(e.target.value).getTime() / 1000),
                                    nanos: 0,
                                },
                            })
                        }
                        className="w-full border border-gray-300 p-2 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Nome do Espaço</label>
                    <input
                        type="text"
                        value={event.spaceName}
                        onChange={(e) => setEvent({ ...event, spaceName: e.target.value })}
                        className="w-full border border-gray-300 p-2 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Categoria</label>
                    <input
                        type="text"
                        value={event.category}
                        onChange={(e) => setEvent({ ...event, category: e.target.value })}
                        className="w-full border border-gray-300 p-2 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Classificação</label>
                    <input
                        type="text"
                        value={event.classification}
                        onChange={(e) => setEvent({ ...event, classification: e.target.value })}
                        className="w-full border border-gray-300 p-2 rounded"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Endereço</label>
                    <label>CEP</label>
                    <input
                        type="text"
                        placeholder="CEP"
                        value={event.address.cep}
                        onChange={(e) => handleAddressChange("cep", e.target.value)}
                        className="w-full border border-gray-300 p-2 rounded mb-2"
                    />
                    <label>Rua</label>
                    <input
                        type="text"
                        placeholder="Rua"
                        value={event.address.street}
                        onChange={(e) => handleAddressChange("street", e.target.value)}
                        className="w-full border border-gray-300 p-2 rounded mb-2"
                    />
                    <label>Número</label>
                    <input
                        type="text"
                        placeholder="Número"
                        value={event.address.number}
                        onChange={(e) => handleAddressChange("number", e.target.value)}
                        className="w-full border border-gray-300 p-2 rounded mb-2"
                    />
                    <label>Estado</label>
                    <input
                        type="text"
                        placeholder="Estado"
                        value={event.address.state}
                        onChange={(e) => handleAddressChange("state", e.target.value)}
                        className="w-full border border-gray-300 p-2 rounded mb-2"
                    />
                    <label>Cidade</label>
                    <input
                        type="text"
                        placeholder="Cidade"
                        value={event.address.city}
                        onChange={(e) => handleAddressChange("city", e.target.value)}
                        className="w-full border border-gray-300 p-2 rounded mb-2"
                    />
                    <label>Bairro</label>
                    <input
                        type="text"
                        placeholder="Bairro"
                        value={event.address.neighborhood}
                        onChange={(e) => handleAddressChange("neighborhood", e.target.value)}
                        className="w-full border border-gray-300 p-2 rounded mb-2"
                    />
                    <label>Complemento</label>
                    <input
                        type="text"
                        placeholder="Complemento"
                        value={event.address.complement}
                        onChange={(e) => handleAddressChange("complement", e.target.value)}
                        className="w-full border border-gray-300 p-2 rounded mb-2"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Setores</label>
                    {event.sector.sectors.map((sector, index) => (
                        <div key={index} className="border p-2 rounded mb-2">
                            <label>Nome do Setor</label>
                            <input
                                type="text"
                                placeholder="Nome do Setor"
                                value={sector.sectorName}
                                onChange={(e) => handleSectorChange(index, "sectorName", e.target.value)}
                                className="w-full border border-gray-300 p-2 rounded mb-2"
                            />
                            <label>Capacidade</label>
                            <input
                                type="number"
                                placeholder="Capacidade"
                                value={sector.capacity}
                                onChange={(e) => handleSectorChange(index, "capacity", parseInt(e.target.value))}
                                className="w-full border border-gray-300 p-2 rounded mb-2"
                            />
                            <label>Descrição</label>
                            <textarea
                                placeholder="Descrição"
                                value={sector.sectorDescription}
                                onChange={(e) => handleSectorChange(index, "sectorDescription", e.target.value)}
                                className="w-full border border-gray-300 p-2 rounded mb-2"
                            />
                            <label>Preço</label>
                            <input
                                type="number"
                                placeholder="Preço"
                                value={sector.salePrice}
                                onChange={(e) => handleSectorChange(index, "salePrice", parseFloat(e.target.value))}
                                className="w-full border border-gray-300 p-2 rounded mb-2"
                            />
                            <button
                                type="button"
                                onClick={() => handleRemoveSector(index)}
                                className="bg-red-500 text-white px-4 py-2 rounded"
                            >
                                Remover Setor
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={handleAddSector}
                        className="bg-green-500 text-white px-4 py-2 rounded"
                    >
                        Adicionar Setor
                    </button>
                </div>
                <button
                    type="button"
                    onClick={handleUpdate}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Atualizar Informações
                </button>
            </form>
        </div>
    );
};

export default EditEventPage;