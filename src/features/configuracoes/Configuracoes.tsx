import { Card } from '../shared/components/Card';
import { ConfiguracoesHeader } from './components/ConfiguracoesHeader';
import { PerfilSection } from './components/PerfilSection';
import { AparenciaSection } from './components/AparenciaSection';

export function Configuracoes() {
  return (
    <div className="p-8 space-y-8 bg-evo-cyan-100 min-h-screen">
      <ConfiguracoesHeader />

      <Card title="">
        <PerfilSection />
      </Card>

      <Card title="">
        <AparenciaSection />
      </Card>
    </div>
  );
}
