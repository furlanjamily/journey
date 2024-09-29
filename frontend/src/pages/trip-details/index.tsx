import { Plus } from "lucide-react";
import { useState } from "react";
import { CreateActivityModal } from "./create-activity-modal";
import { ImportantLinks } from "./important-links";
import { Guests } from "./guests";
import { Activities } from "./activities";
import { DestinationAndDateHeader } from "./destination-and-date-header";

export function TripDetailsPage() {
  const [isCreateActivityModalOpen, setIsCreateActivityModalOpen] = useState(false);

  function openCreateActivityModal() {
    setIsCreateActivityModalOpen(true);
  }

  function closeCreateActivityModal() {
    setIsCreateActivityModalOpen(false);
  }

  return (
    <div className="max-w-6xl px-6 py-10 mx-auto space-y-8">
      <DestinationAndDateHeader />

      <main className="flex flex-col laptop:flex-row gap-16">
        <div className="flex-1 space-y-6 px-4">
          <div className="flex flex-col mobile:flex-col laptop:flex-row items-start justify-between gap-4">
            <h2 className="text-3xl font-semibold laptop:text-2xl mobile:text-xl laptop:mb-4">Atividades</h2>
            <button
              onClick={openCreateActivityModal}
              className="flex font-medium items-center bg-red-600 text-zinc-200 rounded-lg px-5 py-2 hover:bg-red-800 gap-2 mobile:px-4 mobile:py-2 w-auto laptop:w-auto"
            >
              Cadastrar atividade
              <Plus className="size-5 mobile:size-4 laptop:size-5" />
            </button>
          </div>

          <Activities />
        </div>

        {/* Coluna lateral que se empilha em telas menores */}
        <div className="w-full laptop:w-80 space-y-6">
          <ImportantLinks />
          <div className="w-full h-px bg-zinc-800" />
          <Guests />
        </div>
      </main>

      {isCreateActivityModalOpen && (
        <CreateActivityModal closeCreateActivityModal={closeCreateActivityModal} />
      )}
    </div>
  );
}
