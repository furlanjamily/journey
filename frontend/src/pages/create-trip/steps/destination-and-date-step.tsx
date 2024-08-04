import { MapPin, Calendar, Settings2, ArrowRight, X } from 'lucide-react'
import { Button } from '../../../components/button'
import { useState } from 'react'
import { DateRange, DayPicker } from 'react-day-picker'
import "react-day-picker/dist/style.css";
import { format } from 'date-fns';

interface DestinationAndDateStepProps {
  isGuestsInputOpen: boolean
  closeGuestsInput: () => void
  openGuestsInput: () => void
  setDestination: (destination: string) => void
  eventStartAndEndDates: DateRange | undefined
  setEventStartAndEndDates: (dates: DateRange | undefined) => void
}

export function DestinationAndDateStep({
  closeGuestsInput,
  isGuestsInputOpen,
  openGuestsInput,
  setDestination,
  eventStartAndEndDates,
  setEventStartAndEndDates,
}: DestinationAndDateStepProps) {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)
  const [destinationWarning, setDestinationWarning] = useState(false)
  const [initialInput, setInitialInput] = useState(true)

  function openDatePicker() {
    setIsDatePickerOpen(true)
  }
  function closeDatePicker() {
    setIsDatePickerOpen(false)
  }


  function handleDestinationChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value
    setDestination(value)
    if (value.length === 0) {
      setInitialInput(true)
    }
    else if(value.length > 0){
      setInitialInput(false)

    }
    if (value.length < 4) {
      setDestinationWarning(true)
    } else {
      setDestinationWarning(false)
    }
  }

  const displayedDate = eventStartAndEndDates && eventStartAndEndDates.from && eventStartAndEndDates.to
    ? format(eventStartAndEndDates.from, " d' de' LLL").concat(' até').concat(format(eventStartAndEndDates.to, " d' de' LLL"))
    : null

  return (
    <div className="flex h-16 items-center bg-zinc-900 px-4 rounded-xl shadow-shape gap-3">
      <div className="flex flex-1 items-center gap-2">
        <MapPin className="size-5 text-zinc-400" />
        <div className="flex flex-col flex-1">
          <input
            type="text"
            placeholder="Para onde você vai?"
            disabled={isGuestsInputOpen}
            className="bg-transparent text-lg placeholder-zinc-400 outline-none"
            onChange={handleDestinationChange}
          />
          {destinationWarning && (
            <span className="text-red-500 text-sm mt-1">{destinationWarning}</span>
          )}
        </div>
      </div>

      <button onClick={openDatePicker} disabled={isGuestsInputOpen} className="flex w-[240px] items-center gap-2 text-left">
        <Calendar className="size-5 text-zinc-400" />
        <span className="flex-1 w-40 text-lg text-zinc-400">
          {displayedDate || 'Quando?'}
        </span>
      </button>

      {isDatePickerOpen && (
        <div className="flex justify-center items-center fixed inset-0 bg-black/60 z-40">
          <div className="rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Selecione a data</h2>
                <button onClick={closeDatePicker}>
                  <X className="size-5 text-zinc-400" />
                </button>
              </div>
            </div>

            <DayPicker mode="range" selected={eventStartAndEndDates} onSelect={setEventStartAndEndDates} />
          </div>
        </div>
      )}

      <div className="w-px h-6 bg-zinc-800" />

      {isGuestsInputOpen ? (
        <button onClick={closeGuestsInput} className="flex font-medium items-center bg-zinc-800 text-zinc-200 rounded-lg px-5 py-2 hover:bg-zinc-700 gap-2">
          Alterar local/data
          <Settings2 className="size-5" />
        </button>
      ) : (
        <Button variant='primary' size='default' onClick={openGuestsInput} disabled={destinationWarning && !initialInput} className="flex font-medium items-center bg-lime-300 text-lime-950 rounded-lg px-5 py-2 hover:bg-lime-400 gap-2">
          Continuar
          <ArrowRight className="size-5" />
        </Button>
      )}
      {destinationWarning && !initialInput &&( 
        <div className='absolute mt-24 items-center ml-44 z-auto'>
          <span className='text-xs text-red-600'>
            O destino precisa ter pelo menos 4 caracteres!
          </span>
        </div>

      )}
    </div>
  )
}
