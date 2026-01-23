import type { Template, Disparo } from '../types';

export function useMensagensData() {
  const templates: Template[] = [
    {
      id: '1',
      nome: 'Boas-vindas WhatsApp',
      tipo: 'whatsapp',
      mensagem: 'Olá {{nome}}! Bem-vindo ao EVO Coaching. Sua jornada de transformação começa agora!',
      variaveis: ['nome'],
    },
    {
      id: '2',
      nome: 'Lembrete de Aula ao Vivo',
      tipo: 'whatsapp',
      mensagem: 'Oi {{nome}}! Lembrete: Aula ao vivo hoje às {{horario}}. Link: {{link}}',
      variaveis: ['nome', 'horario', 'link'],
    },
    {
      id: '3',
      nome: 'Confirmação de Mentoria',
      tipo: 'email',
      assunto: 'Confirmação - Sua Mentoria EVO Coaching',
      mensagem: 'Olá {{nome}}, confirmamos sua inscrição na mentoria {{programa}}.',
      variaveis: ['nome', 'programa'],
    },
  ];

  const disparos: Disparo[] = [
    {
      id: '1',
      nome: 'Boas-vindas - Novos Leads Novembro',
      tipo: 'whatsapp',
      dataAgendamento: new Date(2025, 10, 25, 18, 0).toISOString(),
      qtdDestinatarios: 284,
      qtdEnviados: 284,
      qtdErros: 0,
      status: 'concluido',
    },
    {
      id: '2',
      nome: 'Lembrete Aula - Turma Premium',
      tipo: 'whatsapp',
      dataAgendamento: new Date(2025, 10, 26, 17, 0).toISOString(),
      qtdDestinatarios: 156,
      qtdEnviados: 150,
      qtdErros: 6,
      status: 'concluido',
    },
    {
      id: '3',
      nome: 'Confirmação - Novos Alunos',
      tipo: 'email',
      dataAgendamento: new Date(2025, 10, 27, 10, 0).toISOString(),
      qtdDestinatarios: 45,
      qtdEnviados: 12,
      qtdErros: 0,
      status: 'enviando',
    },
  ];

  return { templates, disparos };
}
