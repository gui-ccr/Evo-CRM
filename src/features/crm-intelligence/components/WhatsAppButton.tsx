import { MessageCircle } from 'lucide-react';

interface WhatsAppButtonProps {
  telefone: string;
  nome: string;
}

export function WhatsAppButton({ telefone, nome }: WhatsAppButtonProps) {
  const handleWhatsAppClick = () => {
    const numeroLimpo = telefone.replace(/\D/g, '');
    const mensagem = encodeURIComponent(
      `Olá ${nome}! Tudo bem? Sou do time EVO Coaching e gostaria de conversar sobre sua jornada de transformação. 🚀`
    );
    const url = `https://wa.me/55${numeroLimpo}?text=${mensagem}`;
    window.open(url, '_blank');
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      className="flex items-center gap-2 px-4 py-2 bg-green-500 text-zinc-100 rounded-lg hover:bg-green-600 transition-colors"
      title={`Abrir WhatsApp com ${nome}`}
    >
      <MessageCircle size={18} />
      WhatsApp
    </button>
  );
}
