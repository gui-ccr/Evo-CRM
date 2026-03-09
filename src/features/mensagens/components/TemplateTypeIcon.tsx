import { MessageCircle, Mail } from 'lucide-react';
import type { TemplateType } from '../types';

interface TemplateTypeIconProps {
  tipo: TemplateType;
}

export function TemplateTypeIcon({ tipo }: TemplateTypeIconProps) {
  if (tipo === 'whatsapp') {
    return (
      <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
        <MessageCircle size={20} className="text-emerald-600" />
      </div>
    );
  }

  return (
    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
      <Mail size={20} className="text-blue-600" />
    </div>
  );
}
