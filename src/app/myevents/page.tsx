"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
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
              <th className="border border-gray-300 px-4 py-2">Data de Término</th>
              <th className="border border-gray-300 px-4 py-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.id}>
                <td className="border border-gray-300 px-4 py-2">{event.eventName}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {new Date(event.startDate.seconds * 1000).toLocaleDateString()}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {new Date(event.endDate.seconds * 1000).toLocaleDateString()}
                </td>
                <td className="border border-gray-300 px-4 py-2">
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
              <p>ID do Evento: {selectedEvent.id}</p>
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