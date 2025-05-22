import { Sidebar } from "@/components/Sidebar";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Option from "@/components/ui/option";
import { FileSearch } from "lucide-react";

// Definindo o tipo Chamado
interface Chamado {
  idChamado: number;
  idUsuario: string;
  assunto: string;
  idAnalista: string;
  dataAbertura: string;
  tipochamado: string;
  dataFechamento: string | null;
  // Adicione outras propriedades conforme necessário
}

export function CallDetails() {
  const { idChamado } = useParams();
  const [chamado, setChamado] = useState<Chamado | null>(null);
  const [messages, setMessages] = useState([
    {
      id: 1,
      user: "Bianca Reis",
      content: "Não consigo acessar o sistema, aparece uma mensagem de erro.",
      timestamp: "17:43 | 20/05/2025",
    },
    {
      id: 1,
      user: "Bianca Reis",
      content: "Segundo o erro, parece que o servidor está fora do ar.",
      timestamp: "17:43 | 20/05/2025",
    },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("Alto");
  const [selectedStatus, setSelectedStatus] = useState("Em aberto");

  useEffect(() => {
    async function fetchChamado() {
      try {
        const response = await fetch(`/api/chamado/${idChamado}`);
        const data = await response.json();
        setChamado(data);
      } catch (error) {
        console.error("Erro ao buscar chamado:", error);
      }
    }

    fetchChamado();
  }, [idChamado]);

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;

    const newMsg = {
      id: messages.length + 1,
      user: "Você",
      content: newMessage,
      timestamp: new Date().toLocaleString(),
    };

    setMessages([...messages, newMsg]);
    setNewMessage("");
  };

  return (
    <div className="flex flex-row">
      <Sidebar />
      <div className="flex-1 p-6">
        {/* Cabeçalho do chamado */}
        <div className="mb-6">
          <h1 className="text-4xl font-bold">
            {" "}
            {chamado?.assunto || "Não informado"}
          </h1>
          <div className="flex items-center justify-between mt-2">
            <span className="text-gray-600"> {idChamado}</span>
            <div className="flex items-center gap-4">
              <select
                className="text-black text-center px-4 py-2 rounded shadow-md focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all cursor-pointer min-w-[124px] min-h-[32px] w-[124px] h-auto justify-between p-[4px_8px] font-poppins font-semibold text-[14px] leading-[16px]"
                value={selectedPriority}
                onChange={(e) => setSelectedPriority(e.target.value)}
                style={{
                  backgroundColor:
                    selectedPriority === "Alto"
                      ? "#DC2626"
                      : selectedPriority === "Medio"
                      ? "#facc15"
                      : selectedPriority === "Baixo"
                      ? "#16A34A"
                      : "#FFFFFF",
                  color: selectedPriority === "Baixo" ? "white" : "black",
                  appearance: "none",
                }}
              >
                <Option
                  value="Alto"
                  label="Alto"
                  backgroundColor="#DC2626"
                  color="black"
                />
                <Option
                  value="Medio"
                  label="Medio"
                  backgroundColor="#facc15"
                  color="black"
                />
                <Option
                  value="Baixo"
                  label="Baixo"
                  backgroundColor="#16A34A"
                  color="black"
                />
              </select>

              <div className="relative">
                <select
                  className="text-black text-center px-4 py-2 rounded shadow-md focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all cursor-pointer min-w-[124px] min-h-[32px] w-[150px] h-auto justify-between p-[4px_8px] font-poppins font-semibold text-[14px] leading-[16px]"
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  style={{
                    backgroundColor:
                      selectedStatus === "Em Análise"
                        ? "#FEF9C3"
                        : selectedStatus === "Resolvido"
                        ? "#DCFCE7"
                        : selectedStatus === "Cancelado"
                        ? "#FEE2E2"
                        : selectedStatus === "Aguardando"
                        ? "#45A6D940"
                        : selectedStatus === "Em Aberto"
                        ? "#ACACB240"
                        : "#FFFFFF",
                    appearance: "none",
                  }}
                >
                  <Option
                    value="Em Análise"
                    label="Em análise"
                    icon={<FileSearch />}
                    backgroundColor="#FEF9C3"
                    color="black"
                  />
                  <Option
                    value="Resolvido"
                    label="Resolvido"
                    backgroundColor="#DCFCE7"
                    color="black"
                  />
                  <Option
                    value="Cancelado"
                    label="Cancelado"
                    backgroundColor="#FEE2E2"
                    color="black"
                  />
                  <Option
                    value="Aguardando"
                    label="Aguardando"
                    backgroundColor="#45A6D940"
                    color="black"
                  />
                  <Option
                    value="Em Aberto"
                    label="Em Aberto"
                    backgroundColor="#ACACB240"
                    color="black"
                  />
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Informações do chamado */}
        <div className="bg-gray-100 p-4 rounded mb-6">
          <p>
            <strong>Tipo de demanda:</strong> {""}
            {chamado?.tipochamado || "Não informado"}
          </p>
          <p>
            <strong>Analista responsável:</strong>{" "}
            {chamado?.idAnalista || "Não informado"}
          </p>
          <p>
            <strong>Criado em:</strong>{" "}
            {chamado?.dataAbertura || "Não informado"}
          </p>
          <p>
            <strong>Encerrado em:</strong>{" "}
            {chamado?.dataFechamento || "Não informado"}
          </p>
        </div>

        <div className="flex flex-col gap-4 border-1 border-gray-300 p-4 rounded">
          {/* Mensagens do chamado */}
          <div className="bg-gray-100 p-4 rounded mb-6">
            {messages.map((message) => (
              <div key={message.id} className="mb-4">
                <div className="flex items-center gap-2">
                  <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center">
                    <span>{message.user.charAt(0)}</span>
                  </div>
                  <p className="font-bold">{message.user}</p>
                  <span className="text-gray-500 text-sm">
                    {message.timestamp}
                  </span>
                </div>
                <p className="bg-white p-3 rounded shadow mt-2">
                  {message.content}
                </p>
              </div>
            ))}
          </div>

          {/* Campo para enviar mensagem */}
          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Digite sua mensagem..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1 border border-gray-300 rounded px-4 py-2"
            />
            <button
              onClick={handleSendMessage}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Enviar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
