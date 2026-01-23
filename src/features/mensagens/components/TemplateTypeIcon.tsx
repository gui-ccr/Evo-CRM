import { MessageCircle, Mail } from 'lucide-react';
import type { TemplateType } from '../types';

interface TemplateTypeIconProps {
  tipo: TemplateType;
}

export function TemplateTypeIcon({ tipo }: TemplateTypeIconProps) {
  if (tipo === 'whatsapp') {
    return (
      <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
        <MessageCircle size={20} className="text-green-500" />
      </div>
    );
  }

  return (
    <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
      <Mail size={20} className="text-blue-500" />
    </div>
  );
}
