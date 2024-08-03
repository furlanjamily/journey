import { X, Tag, Calendar } from "lucide-react"
import { Button } from "../../components/button"
import { FormEvent } from "react"
import { api } from "../../lib/axios"
import { useParams } from "react-router-dom"

interface createActivityModalProps {
  closeCreateActivityModal: () => void
}

export function CreateActivityModal({
  closeCreateActivityModal
}: createActivityModalProps) {
  const {tripId} = useParams()

  async function createActivity(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const data = new FormData(event.currentTarget)

    const title = data.get('title')?.toString()
    const occurs_at = data.get('occurs_at')?.toString()

    await api.post(`/trips/${tripId}/activities`, {
      title,
      occurs_at,
    })

    console.log(occurs_at)

    window.document.location.reload()
  }

  return (
    <div className="flex justify-center items-center fixed inset-0 bg-black/60 ">
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex = items-center justify-between">
            <h2 className="text-lg font-semibold">Cadastrar atividade</h2>
            <button onClick={closeCreateActivityModal}>
              <X className="size-5 text-zinc-400" />
            </button>
          </div>
          <p className="text-zinc-400 text-sm">Todos convidados podem visualizar as atividades.</p>
        </div>

        <form onSubmit={createActivity} className="space-y-3">
          <div className="flex items-center h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg gap-2">
            <Tag className="size-5 text-zinc-400" />
            <input
              name="title"
              placeholder="Qual a atividade"
              className="flex-1 bg-transparent text-lg placeholder-zinc-400 outline-none"
            />
          </div>

          <div className="flex flex-1 items-center h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg gap-2">
            <Calendar className="size-5 text-zinc-400" />
            <input
              type="datetime-local"
              name="occurs_at"
              placeholder="Data e horário da atividade"
              className="flex-1 bg-transparent text-lg placeholder-zinc-400 outline-none"
            />
          </div>

          <Button size="full" type="submit" className="flex w-full h-11 font-medium justify-center items-center bg-lime-300 text-lime-950 rounded-lg px-5 py-2 hover:bg-lime-400">
            Salvar atividade
          </Button>
        </form>
      </div>
    </div>
  )
}
