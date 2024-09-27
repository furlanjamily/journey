import { X, AtSign, Plus } from 'lucide-react';
import { FormEvent, useState } from 'react';
import { Button } from '../../components/button';

interface InviteGuestsModalProps {
  closeGuestsModal: () => void;
  emailsToInvite: string[];
  addNewEmailToInvite: (email: string) => void;
  removeEmailFromInvites: (email: string) => void;
}

export function InviteGuestsModal({
  closeGuestsModal,
  emailsToInvite,
  addNewEmailToInvite,
  removeEmailFromInvites,
}: InviteGuestsModalProps) {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email) {
      addNewEmailToInvite(email);
      setEmail('');
    }
  };

  return (
    <div className="flex justify-center items-center fixed inset-0 bg-black/60">
      <div className="w-full max-w-[640px] rounded-xl py-6 px-4 mobile:px-6 shadow-shape bg-zinc-900 space-y-5 border border-zinc-800">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Selecionar convidados</h2>
            <button onClick={closeGuestsModal}>
              <X className="w-5 h-5 text-zinc-400" />
            </button>
          </div>
          <p className="text-zinc-400 text-sm">
            Os convidados irão receber e-mails para confirmar a participação na viagem.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {emailsToInvite.length > 0 &&
            emailsToInvite.map((email) => (
              <div
                key={email}
                className="flex items-center py-1.5 px-2.5 rounded-md bg-zinc-800 gap-2"
              >
                <span className="text-zinc-300">{email}</span>
                <button onClick={() => removeEmailFromInvites(email)} type="button">
                  <X className="w-4 h-4 text-zinc-400" />
                </button>
              </div>
            ))}
        </div>

        <div className="w-full h-px bg-zinc-800" />

        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-stretch gap-2"
        >
          <div className="flex items-center p-2.5 bg-zinc-950 border border-zinc-800 rounded-lg">
            <AtSign className="w-5 h-5 text-zinc-400" />
            <input
              type="email"
              name="email"
              placeholder="Digite o e-mail do convidado"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-transparent text-lg placeholder-zinc-400 outline-none px-2"
              required
            />
          </div>
          <Button
            variant="primary"
            size="default"
            type="submit"
            className="flex font-medium items-center bg-lime-300 text-lime-950 rounded-lg px-5 py-2 hover:bg-lime-400"
          >
            Convidar
            <Plus className="w-5 h-5" />
          </Button>
        </form>
      </div>
    </div>
  );
}
