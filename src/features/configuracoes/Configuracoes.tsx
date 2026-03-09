import { Card } from '../shared/components/Card';
import { ConfiguracoesHeader } from './components/ConfiguracoesHeader';
import { PerfilSection } from './components/PerfilSection';

export function Configuracoes() {
  return (
    <div className="p-8 space-y-8">
      <ConfiguracoesHeader />

      <Card title="">
        <PerfilSection />
      </Card>

     
    </div>
  );
}
