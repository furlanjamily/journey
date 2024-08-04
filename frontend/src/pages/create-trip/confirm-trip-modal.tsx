import { MailPlus, User, X } from 'lucide-react'
import { FormEvent } from 'react'
import { Button } from '../../components/button'
import { DateRange } from 'react-day-picker'
import { format } from 'date-fns'

interface ConfirmTripModalProps {
  closeConfirmTripModal: () => void
  createTrip: (e: FormEvent<HTMLFormElement>) => void
  setOwnerName: (name: string) => void
  setOwnerEmail: (email: string) => void
  destinationName: string
  startAndEndDates: DateRange | undefined
}

export function ConfirmTripModal({
  closeConfirmTripModal,
  createTrip,
  setOwnerEmail,
  setOwnerName,
  destinationName,
  startAndEndDates
}: ConfirmTripModalProps) {
  const displayedDate = startAndEndDates && startAndEndDates.from && startAndEndDates.to
   ? format(startAndEndDates.from, " d' de' LLL").concat(' até').concat(format(startAndEndDates.to, " d' de' LLL")) 
   : null


  return (
    <div className="flex justify-center items-center fixed inset-0 bg-black/60">
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Confirmar criação da viagem</h2>
            <button onClick={closeConfirmTripModal} aria-label="Fechar">
              <X className="size-5 text-zinc-400" />
            </button>
          </div>
          <p className="text-zinc-400 text-sm">
            Para concluir a criação da viagem para <span className="font-semibold text-zinc-100">{destinationName}</span> nas datas de <span className="font-semibold text-zinc-100">{displayedDate}</span>, preencha seus dados abaixo:
          </p>
        </div>

        <form onSubmit={createTrip} className="space-y-3">
          <div className="flex items-center h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg gap-2">
            <User className="size-5 text-zinc-400" />
            <input
              name="name"
              placeholder="Seu nome completo"
              className="flex-1 bg-transparent text-lg placeholder-zinc-400 outline-none"
              onChange={event => setOwnerName(event.target.value)}
            />
          </div>

          <div className="flex items-center h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg gap-2">
            <MailPlus className="size-5 text-zinc-400" />
            <input
              type="email"
              name="email"
              placeholder="Seu e-mail pessoal"
              className="flex-1 bg-transparent text-lg placeholder-zinc-400 outline-none"
              onChange={event => setOwnerEmail(event.target.value)}
            />
          </div>
          <Button variant='primary' size='full' type="submit" className="flex w-full h-11 font-medium justify-center items-center bg-lime-300 text-lime-950 rounded-lg px-5 py-2 hover:bg-lime-400">
            Confirmar criação da viagem
          </Button>
        </form>
      </div>
    </div>
  )
}
              