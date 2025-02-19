"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Import correto para o sistema de rotas da pasta `app`
import { toast } from "sonner";

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
    sectors: {
      sectorName: string;
      capacity: number;
      sectorDescription: string;
      salePrice: string;
      sectorType: string;
    }[];
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
            className="w-full border border-gray-300 p-2 rounded"
            readOnly
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Descrição</label>
          <textarea
            value={event.eventDescription}
            className="w-full border border-gray-300 p-2 rounded"
            readOnly
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Local</label>
          <input
            type="text"
            value={event.spaceName}
            className="w-full border border-gray-300 p-2 rounded"
            readOnly
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Data de Início</label>
          <input
            type="text"
            value={new Date(event.startDate.seconds * 1000).toLocaleString()}
            className="w-full border border-gray-300 p-2 rounded"
            readOnly
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Data de Término</label>
          <input
            type="text"
            value={new Date(event.endDate.seconds * 1000).toLocaleString()}
            className="w-full border border-gray-300 p-2 rounded"
            readOnly
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Endereço</label>
          <input
            type="text"
            value={`${event.address.street}, ${event.address.number} - ${event.address.neighborhood}, ${event.address.city} - ${event.address.state}`}
            className="w-full border border-gray-300 p-2 rounded"
            readOnly
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Setores</label>
          {event.sector.sectors.map((sector, index) => (
            <div key={index} className="border p-2 rounded mb-2">
              <p>Nome: {sector.sectorName}</p>
              <p>Capacidade: {sector.capacity}</p>
              <p>Descrição: {sector.sectorDescription}</p>
              <p>Preço: R$ {parseFloat(sector.salePrice) / 100}</p>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => router.push("/myevents")}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Voltar
        </button>
      </form>
    </div>
  );
};

export default EditEventPage;