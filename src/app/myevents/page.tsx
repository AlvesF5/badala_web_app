"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { FaCalendarAlt, FaClock, FaMapMarkerAlt } from "react-icons/fa";

interface Event {
  id: string;
  eventName: string;
  startDate: { seconds: number; nanos: number };
  endDate: { seconds: number; nanos: number };
  spaceName: string;
  category: string;
  classification: string;
  eventDescription: string;
}

const MeusEventos = ({ ownerId }: { ownerId: string }) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Função para buscar eventos
  const fetchEvents = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8080/v1/events/owner/1a6f3536-ee91-4182-b3e8-6403d05b5840`);
      if (!response.ok) {
        throw new Error("Erro ao buscar eventos");
      }
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      toast.error("Erro ao carregar eventos");
    } finally {
      setLoading(false);
    }
  };

  // Função para abrir o pop-up de edição
  const handleEdit = (event: Event) => {
    setSelectedEvent(event);
    setIsDialogOpen(true);
  };

  // Função para fechar o pop-up
  const closeDialog = () => {
    setSelectedEvent(null);
    setIsDialogOpen(false);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Meus Eventos</h1>
      {loading ? (
        <p>Carregando eventos...</p>
      ) : (
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Nome</th>
              <th className="border border-gray-300 px-4 py-2">Data de Início</th>
              <th className="border border-gray-300 px-4 py-2">Local</th>
              <th className="border border-gray-300 px-4 py-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.id}>
                <td className="border border-gray-300 px-4 py-2">{event.eventName}</td>
                <td className="border border-gray-300 px-4 py-2 flex items-center gap-2">
                  <FaCalendarAlt className="text-blue-500" />
                  {new Date(event.startDate.seconds * 1000)
                    .toLocaleString(undefined, {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })}
                  <FaClock className="text-blue-500 ml-2" />
                  {new Date(event.startDate.seconds * 1000)
                    .toLocaleString(undefined, {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <div className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-red-500 flex-shrink-0" />
                    <span className="truncate">{event.spaceName}</span>
                  </div>
                </td>
                <td className="border border-gray-300 px-4 py-2 flex justify-center">
                  <Button onClick={() => handleEdit(event)}>Editar</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Pop-up de edição */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Evento</DialogTitle>
          </DialogHeader>
          {selectedEvent && (
            <div>
              <p>Nome do Evento: {selectedEvent.eventName}</p>
              {/* Adicione aqui os campos de edição */}
              <Button onClick={closeDialog} className="mt-4">
                Fechar
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MeusEventos;