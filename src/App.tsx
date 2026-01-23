import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppLayout } from "./features/shared/layout/AppLayout";
import { Dashboard } from "./features/dashboard";
import { Clientes } from "./features/clientes/Clientes";
import { CrmIntelligence } from "./features/crm-intelligence/CrmIntelligence";
import { Upload } from "./features/upload/Upload";
import { Mensagens } from "./features/mensagens/Mensagens";
import { Configuracoes } from "./features/configuracoes/Configuracoes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="clientes" element={<Clientes />} />
          <Route path="crm" element={<CrmIntelligence />} />
          <Route path="upload" element={<Upload />} />
          <Route path="mensagens" element={<Mensagens />} />
          <Route path="configuracoes" element={<Configuracoes />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
