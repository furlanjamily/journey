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
    else if (value.length > 0) {
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
    <>
    {/* Para telas maiores ou iguais a tablet */}
    <div className="hidden tablet:flex h-16 items-center bg-zinc-900 px-4 rounded-xl shadow-shape gap-3">
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
    </div>

    {/* Para telas móveis */}
    <div className="flex flex-col gap-4 p-4 bg-zinc-900 rounded-xl shadow-shape mobile:flex-col tablet:hidden">
      <div className="flex flex-col w-full">
        <div className="flex items-center gap-2">
          <MapPin className="size-5 text-zinc-400" />
          <input
            type="text"
            placeholder="Para onde você vai?"
            disabled={isGuestsInputOpen}
            className="w-full bg-transparent text-lg placeholder-zinc-400 outline-none"
            onChange={handleDestinationChange}
          />
        </div>
        {destinationWarning && (
          <span className="text-red-500 text-sm mt-1">
            O destino precisa ter pelo menos 4 caracteres!
          </span>
        )}
      </div>

      <div className="flex flex-col w-full mt-4">
        <button
          onClick={openDatePicker}
          disabled={isGuestsInputOpen}
          className="w-full flex items-center gap-2 text-left bg-transparent text-lg placeholder-zinc-400 outline-none"
        >
          <Calendar className="size-5 text-zinc-400" />
          <span>
            {displayedDate || 'Quando?'}
          </span>
        </button>
        {isDatePickerOpen && (
          <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/60">
            <div className="rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
              <div className="flex justify-between">
                <h2 className="text-lg font-semibold">Selecione a data</h2>
                <button onClick={closeDatePicker}>
                  <X className="size-5 text-zinc-400" />
                </button>
              </div>
              <DayPicker
                mode="range"
                selected={eventStartAndEndDates}
                onSelect={setEventStartAndEndDates}
              />
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-center w-full mt-4">
        {isGuestsInputOpen ? (
          <button
            onClick={closeGuestsInput}
            className="flex items-center justify-center font-medium bg-zinc-800 text-zinc-200 rounded-lg px-5 py-2 hover:bg-zinc-700 gap-2"
          >
            <Settings2 className="size-5" />
            Alterar local/data
          </button>
        ) : (
          <Button
            variant="primary"
            size="default"
            onClick={openGuestsInput}
            disabled={destinationWarning && !initialInput}
            className="flex items-center justify-center font-medium bg-lime-300 text-lime-950 rounded-lg px-5 py-2 hover:bg-lime-400 gap-2"
          >
            <ArrowRight className="size-5" />
            Continuar
          </Button>
        )}
      </div>
    </div>
  </>


  )
}
