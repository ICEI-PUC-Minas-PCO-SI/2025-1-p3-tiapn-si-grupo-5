import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import {
    Clock,
    Users,
    Shield,
    Zap,
    ArrowRight,
    FileText,
    AlertTriangle,
    Globe,
    User,
    Settings,
    PlayCircle,
    ExternalLink,
    Home,
    TrendingDown,
    TrendingUp,
    Sparkles,
    Target,
    Lightbulb,
    Rocket,
    BarChart3,
    MessageSquare,
    Monitor
} from "lucide-react";
import type { CarouselApi } from "@/components/ui/carousel";
import Logo from "../../assets/TrackIt_Logo.svg";
import { useNavigate } from "react-router-dom";

const slides = [
    {
        id: 1,
        title: "TrackIT",
        subtitle: "Transformando suporte em solução",
        description: "A plataforma inteligente que revoluciona a gestão de demandas de TI na Prefeitura de Belo Horizonte",
        type: "hero"
    },
    {
        id: 2,
        title: "Problemas Enfrentados",
        subtitle: "Cenário atual da ASTIN",
        description: "Desafios operacionais que impactam a eficiência no atendimento",
        type: "problem",
        problems: [
            { title: "RETRABALHO", description: "Chamados duplicados, falta de histórico centralizado e informações desencontradas forçam analistas a repetir tarefas.", icon: AlertTriangle, color: "bg-red-500" },
            { title: "ATRASOS", description: "Sem sistema de priorização, as demandas se acumulam, gerando lentidão e impacto direto no trabalho dos servidores.", icon: Clock, color: "bg-orange-500" },
            { title: "DESORGANIZAÇÃO", description: "Interações por e-mail dificultam o rastreio, gerando perda de informações e falta de clareza para todos.", icon: FileText, color: "bg-yellow-500" }
        ]
    },
    {
        id: 3,
        title: "Cenário Real da ASTIN",
        subtitle: "Dados que demonstram a necessidade",
        description: "Análise quantitativa dos problemas enfrentados em 2024",
        type: "astin",
        stats: [
            { label: "4.621 chamados cadastrados pela ASTIN em 2024", value: "4.621", icon: FileText, color: "from-blue-500 to-blue-600" },
            { label: "106 foram cancelados por falta de informação", value: "106", icon: AlertTriangle, color: "from-red-500 to-red-600" },
            { label: "Processos 100% manuais em planilhas", value: "100%", icon: BarChart3, color: "from-yellow-500 to-yellow-600" }
        ]
    },
    {
        id: 4,
        title: "Nossa Solução: TrackIT",
        subtitle: "Tecnologia que conecta pessoas e processos",
        description: "Plataforma completa que centraliza e otimiza todo o atendimento",
        type: "solution",
        benefits: [
            { title: "PADRONIZAÇÃO", description: "Todas as solicitações seguem um fluxo único e estruturado, evitando erros e garantindo consistência no atendimento.", icon: Target, color: "from-green-500 to-green-600" },
            { title: "RASTREABILIDADE", description: "Cada interação fica registrada: do chamado inicial até a solução, com histórico completo e transparente.", icon: Monitor, color: "from-blue-500 to-blue-600" },
            { title: "AGILIDADE", description: "Os chamados são classificados, atribuídos e resolvidos com mais rapidez graças à automação inteligente.", icon: Rocket, color: "from-purple-500 to-purple-600" },
            { title: "CONECTIVIDADE", description: "Clientes, analistas e gestores interagem em tempo real por meio de chat, notificações e dashboards.", icon: MessageSquare, color: "from-cyan-500 to-cyan-600" }
        ]
    },
    {
        id: 5,
        title: "Benefícios na Prática",
        subtitle: "Transformações reais no dia a dia operacional",
        description: "Funcionalidades que revolucionam o atendimento de TI",
        type: "improvements",
        features: [
            { title: "Abertura de chamado pelo cliente", description: "com anexação de arquivos e formulário padronizado", icon: PlayCircle },
            { title: "Acompanhamento via chat em tempo real", description: "com notificações automáticas por e-mail", icon: MessageSquare },
            { title: "Atribuição transparente de chamados", description: "para analistas com base em critérios definidos", icon: Users },
            { title: "Mudança de status dinâmica", description: "refletida instantaneamente para o cliente", icon: Zap },
            { title: "Dashboard gerencial completo", description: "para auxílio na tomada de decisões estratégicas", icon: BarChart3 },
            { title: "Capacidade de intervenção em chamados", description: "pelos gestores quando necessário", icon: Shield }
        ]
    },
    {
        id: 6,
        title: "Impactos Projetados",
        subtitle: "Resultados esperados com a implementação",
        description: "Métricas baseadas em boas práticas do mercado de TI",
        type: "results",
        metrics: [
            {
                title: "REDUÇÃO DE ERROS",
                description: "Dos 4.621 chamados de 2024, 106 foram cancelados. Com o TrackIT, esperamos reduzir esse número para próximo de zero.",
                before: "106 cancelados",
                after: "~0 cancelados",
                improvement: "100%"
            },
            {
                title: "TEMPO DE RESPOSTA",
                description: "Demandas que ficavam dias na caixa de entrada agora terão atendimento inicial garantido em poucas horas.",
                before: "Dias paradas",
                after: "Poucas horas",
                improvement: "80%"
            }
        ]
    },
    {
        id: 7,
        title: "Stack Tecnológica",
        subtitle: "Tecnologias modernas e confiáveis",
        description: "Desenvolvido com as melhores práticas e ferramentas do mercado",
        type: "tech",
        technologies: [
            { name: "React", category: "Frontend", url: "https://react.dev/", icon: "⚛️", description: "Interface moderna e reativa" },
            { name: "TypeScript", category: "Frontend", url: "https://www.typescriptlang.org/", icon: "🔷", description: "Código tipado e seguro" },
            { name: "Tailwind CSS", category: "Frontend", url: "https://tailwindcss.com/", icon: "🎨", description: "Design system consistente" },
            { name: "Node.js", category: "Backend", url: "https://nodejs.org/", icon: "🟢", description: "Runtime JavaScript escalável" },
            { name: "Express", category: "Backend", url: "https://expressjs.com/", icon: "🚀", description: "Framework backend para APIs modernas" },
            { name: "Prisma", category: "Database", url: "https://www.prisma.io/", icon: "🔺", description: "ORM type-safe moderno" },
            { name: "MySQL", category: "Database", url: "https://www.mysql.com/", icon: "🐬", description: "Banco de dados robusto" },
            { name: "Docker", category: "DevOps", url: "https://www.docker.com/", icon: "🐳", description: "Containerização e deploy" },
            { name: "Socket.IO", category: "Real-time", url: "https://socket.io/", icon: "🔌", description: "Comunicação em tempo real" }
        ]
    },
    {
        id: 8,
        title: "Como Testar",
        subtitle: "Acesso para demonstração acadêmica",
        description: "Credenciais e instruções para explorar o TrackIT",
        type: "testing"
    }
];

export function Presentation() {
    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);
    const [progress, setProgress] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        if (!api) return;

        setCurrent(api.selectedScrollSnap());
        setProgress(((api.selectedScrollSnap() + 1) / slides.length) * 100);

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap());
            setProgress(((api.selectedScrollSnap() + 1) / slides.length) * 100);
        });
    }, [api]);

    const renderSlideContent = (slide: typeof slides[0]) => {
        switch (slide.type) {
            case "hero":
                return (
                    <div className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-700" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

                        <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse" />
                        <div className="absolute bottom-20 right-20 w-24 h-24 bg-cyan-300/20 rounded-full blur-lg animate-bounce" />
                        <div className="absolute top-1/2 right-32 w-16 h-16 bg-purple-300/30 rounded-full blur-md animate-ping" />

                        <div className="relative z-10 text-center space-y-8 px-8">
                            <div className="flex justify-center mb-8">
                                <div className="relative">
                                    <img src={Logo} alt="TrackIT Logo" className="w-32 h-24 filter drop-shadow-2xl" />
                                    <div className="absolute -inset-4 bg-white/20 rounded-full blur-xl" />
                                </div>
                            </div>

                            <div className="space-y-6">
                                <h1 className="text-5xl md:text-7xl font-black text-white drop-shadow-2xl">
                                    Track<span className="text-yellow-300">IT</span>
                                </h1>
                                <p className="text-xl md:text-3xl font-bold text-white/90 drop-shadow-lg">
                                    {slide.subtitle}
                                </p>
                                <p className="text-lg md:text-xl text-white/80 max-w-4xl mx-auto leading-relaxed">
                                    {slide.description}
                                </p>
                            </div>

                            <div className="flex flex-wrap justify-center gap-4 pt-8">
                                <Badge className="px-6 py-3 bg-white/20 backdrop-blur text-white border-white/30 text-lg">
                                    <Shield className="w-5 h-5 mr-2" />
                                    Seguro
                                </Badge>
                                <Badge className="px-6 py-3 bg-white/20 backdrop-blur text-white border-white/30 text-lg">
                                    <Zap className="w-5 h-5 mr-2" />
                                    Rápido
                                </Badge>
                                <Badge className="px-6 py-3 bg-white/20 backdrop-blur text-white border-white/30 text-lg">
                                    <Users className="w-5 h-5 mr-2" />
                                    Colaborativo
                                </Badge>
                            </div>
                        </div>
                    </div>
                );

            case "problem":
                return (
                    <div className="min-h-[600px] p-8 bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20">
                        <div className="text-center space-y-6 mb-12">
                            <div className="inline-flex items-center gap-3 px-6 py-3 bg-red-100 dark:bg-red-900/30 rounded-full">
                                <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
                                <span className="font-semibold text-red-800 dark:text-red-300">Problemas Identificados</span>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white">
                                {slide.title}
                            </h2>
                            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
                                {slide.description}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {slide.problems?.map((problem, index) => (
                                <Card key={index} className="group hover:scale-105 transition-all duration-300 border-0 shadow-xl bg-white/80 backdrop-blur">
                                    <CardContent className="p-8 text-center space-y-6">
                                        <div className={`w-20 h-20 mx-auto rounded-full ${problem.color} flex items-center justify-center shadow-lg`}>
                                            <problem.icon className="w-10 h-10 text-white" />
                                        </div>
                                        <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                                            {problem.title}
                                        </h3>
                                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                                            {problem.description}
                                        </p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                );

            case "astin":
                return (
                    <div className="min-h-[600px] p-8 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950/20 dark:to-indigo-950/20">
                        <div className="text-center space-y-6 mb-12">
                            <div className="inline-flex items-center gap-3 px-6 py-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                                <BarChart3 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                                <span className="font-semibold text-blue-800 dark:text-blue-300">Dados Reais</span>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white">
                                {slide.title}
                            </h2>
                            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
                                {slide.description}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {slide.stats?.map((stat, index) => (
                                <Card key={index} className="group hover:scale-105 transition-all duration-300 border-0 shadow-xl overflow-hidden">
                                    <div className={`h-2 bg-gradient-to-r ${stat.color}`} />
                                    <CardContent className="p-8 text-center space-y-6 bg-white/90 backdrop-blur">
                                        <div className={`w-20 h-20 mx-auto rounded-full bg-gradient-to-r ${stat.color} flex items-center justify-center shadow-lg`}>
                                            <stat.icon className="w-10 h-10 text-white" />
                                        </div>
                                        <div className="text-4xl font-black text-slate-900 dark:text-white">
                                            {stat.value}
                                        </div>
                                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                                            {stat.label}
                                        </p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                );

            case "solution":
                return (
                    <div className="min-h-[600px] p-8 bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-950/20 dark:to-emerald-950/20">
                        <div className="text-center space-y-6 mb-12">
                            <div className="inline-flex items-center gap-3 px-6 py-3 bg-green-100 dark:bg-green-900/30 rounded-full">
                                <Lightbulb className="w-6 h-6 text-green-600 dark:text-green-400" />
                                <span className="font-semibold text-green-800 dark:text-green-300">Nossa Solução</span>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white">
                                {slide.title}
                            </h2>
                            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
                                {slide.description}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {slide.benefits?.map((benefit, index) => (
                                <Card key={index} className="group hover:scale-105 transition-all duration-300 border-0 shadow-xl overflow-hidden">
                                    <div className={`h-2 bg-gradient-to-r ${benefit.color}`} />
                                    <CardContent className="p-8 space-y-6 bg-white/90 backdrop-blur">
                                        <div className="flex items-start gap-4">
                                            <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${benefit.color} flex items-center justify-center shadow-lg flex-shrink-0`}>
                                                <benefit.icon className="w-8 h-8 text-white" />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                                                    {benefit.title}
                                                </h3>
                                                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                                                    {benefit.description}
                                                </p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                );

            case "improvements":
                return (
                    <div className="min-h-[600px] p-8 bg-gradient-to-br from-purple-50 to-pink-100 dark:from-purple-950/20 dark:to-pink-950/20">
                        <div className="text-center space-y-6 mb-12">
                            <div className="inline-flex items-center gap-3 px-6 py-3 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                                <Sparkles className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                                <span className="font-semibold text-purple-800 dark:text-purple-300">Funcionalidades</span>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white">
                                {slide.title}
                            </h2>
                            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
                                {slide.description}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {slide.features?.map((feature, index) => (
                                <Card key={index} className="group hover:scale-105 transition-all duration-300 border-0 shadow-lg bg-white/80 backdrop-blur">
                                    <CardContent className="p-6 space-y-4">
                                        <div className="flex items-start gap-3">
                                            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center shadow-lg flex-shrink-0">
                                                <feature.icon className="w-6 h-6 text-white" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-bold text-slate-900 dark:text-white mb-2">
                                                    {feature.title}
                                                </h3>
                                                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                                                    {feature.description}
                                                </p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                );

            case "results":
                return (
                    <div className="min-h-[600px] p-8 bg-gradient-to-br from-amber-50 to-orange-100 dark:from-amber-950/20 dark:to-orange-950/20">
                        <div className="text-center space-y-6 mb-12">
                            <div className="inline-flex items-center gap-3 px-6 py-3 bg-amber-100 dark:bg-amber-900/30 rounded-full">
                                <TrendingUp className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                                <span className="font-semibold text-amber-800 dark:text-amber-300">Resultados Esperados</span>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white">
                                {slide.title}
                            </h2>
                            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
                                {slide.description}
                            </p>
                        </div>

                        <div className="space-y-8">
                            {slide.metrics?.map((metric, index) => (
                                <Card key={index} className="group hover:scale-102 transition-all duration-300 border-0 shadow-xl overflow-hidden">
                                    <CardContent className="p-8 bg-white/90 backdrop-blur">
                                        <div className="text-center mb-8">
                                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                                                {metric.title}
                                            </h3>
                                            <p className="text-slate-600 dark:text-slate-300 leading-relaxed max-w-4xl mx-auto">
                                                {metric.description}
                                            </p>
                                        </div>

                                        <div className="flex items-center justify-center gap-8">
                                            <div className="text-center group-hover:scale-110 transition-transform">
                                                <div className="flex items-center justify-center mb-3">
                                                    <TrendingDown className="w-8 h-8 text-red-500 mr-3" />
                                                    <span className="text-3xl font-bold text-red-600 dark:text-red-400">
                                                        {metric.before}
                                                    </span>
                                                </div>
                                                <div className="text-sm font-medium text-slate-500 bg-red-100 dark:bg-red-900/30 px-4 py-2 rounded-full">
                                                    ANTES
                                                </div>
                                            </div>

                                            <div className="flex flex-col items-center">
                                                <ArrowRight className="w-12 h-12 text-amber-500 animate-pulse" />
                                                <div className="mt-2 px-4 py-2 bg-amber-100 dark:bg-amber-900/30 rounded-full">
                                                    <span className="text-sm font-bold text-amber-700 dark:text-amber-300">
                                                        +{metric.improvement} melhor
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="text-center group-hover:scale-110 transition-transform">
                                                <div className="flex items-center justify-center mb-3">
                                                    <TrendingUp className="w-8 h-8 text-green-500 mr-3" />
                                                    <span className="text-3xl font-bold text-green-600 dark:text-green-400">
                                                        {metric.after}
                                                    </span>
                                                </div>
                                                <div className="text-sm font-medium text-slate-500 bg-green-100 dark:bg-green-900/30 px-4 py-2 rounded-full">
                                                    DEPOIS
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                );

            case "tech":
                return (
                    <div className="min-h-[600px] p-8 bg-gradient-to-br from-slate-50 to-gray-100 dark:from-slate-950/20 dark:to-gray-950/20">
                        <div className="text-center space-y-6 mb-12">
                            <div className="inline-flex items-center gap-3 px-6 py-3 bg-slate-100 dark:bg-slate-900/30 rounded-full">
                                <Monitor className="w-6 h-6 text-slate-600 dark:text-slate-400" />
                                <span className="font-semibold text-slate-800 dark:text-slate-300">Stack Tecnológica</span>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white">
                                {slide.title}
                            </h2>
                            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
                                {slide.description}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {slide.technologies?.map((tech, index) => (
                                <Card
                                    key={index}
                                    className="group hover:scale-105 transition-all duration-300 cursor-pointer border-0 shadow-lg bg-white/80 backdrop-blur hover:shadow-2xl"
                                    onClick={() => window.open(tech.url, '_blank')}
                                >
                                    <CardContent className="p-6 space-y-4">
                                        <div className="flex items-start justify-between">
                                            <div className="text-4xl">{tech.icon}</div>
                                            <ExternalLink className="w-4 h-4 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                                                {tech.name}
                                            </h3>
                                            <Badge variant="outline" className="mt-1 text-xs">
                                                {tech.category}
                                            </Badge>
                                        </div>
                                        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                                            {tech.description}
                                        </p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        <div className="text-center mt-8">
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                Clique em qualquer tecnologia para acessar sua documentação oficial
                            </p>
                        </div>
                    </div>
                );

            case "testing":
                return (
                    <div className="min-h-[600px] p-8 bg-gradient-to-br from-indigo-50 to-blue-100 dark:from-indigo-950/20 dark:to-blue-950/20">
                        <div className="text-center space-y-6 mb-12">
                            <div className="inline-flex items-center gap-3 px-6 py-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-full">
                                <PlayCircle className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                                <span className="font-semibold text-indigo-800 dark:text-indigo-300">Demonstração</span>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white">
                                {slide.title}
                            </h2>
                            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
                                {slide.description}
                            </p>
                        </div>

                        <Card className="mb-8 border-0 shadow-2xl overflow-hidden">
                            <div className="h-2 bg-gradient-to-r from-indigo-500 to-purple-600" />
                            <CardContent className="p-8 bg-gradient-to-r from-indigo-600 to-purple-700 text-white text-center">
                                <div className="flex items-center justify-center gap-3 mb-4">
                                    <Globe className="w-8 h-8" />
                                    <h3 className="text-2xl font-bold">Acesso à Aplicação</h3>
                                </div>
                                <div className="bg-white/20 backdrop-blur p-4 rounded-lg">
                                    <p className="text-xl font-mono font-bold">
                                        🌐 trackit-front.onrender.com
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                            <Card className="group hover:scale-105 transition-all duration-300 border-0 shadow-xl overflow-hidden">
                                <div className="h-2 bg-gradient-to-r from-blue-500 to-cyan-500" />
                                <CardContent className="p-8 bg-white/90 backdrop-blur">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center shadow-lg">
                                            <User className="w-8 h-8 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                                                Perfil USUÁRIO
                                            </h3>
                                            <p className="text-sm text-slate-600 dark:text-slate-300">
                                                Pode abrir chamados e conversar via chat
                                            </p>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
                                            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">📧 Email:</p>
                                            <p className="font-mono text-sm bg-white dark:bg-slate-700 p-2 rounded border">
                                                usuario@teste.com
                                            </p>
                                        </div>
                                        <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
                                            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">🔑 Senha:</p>
                                            <p className="font-mono text-sm bg-white dark:bg-slate-700 p-2 rounded border">
                                                Trackit123
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="group hover:scale-105 transition-all duration-300 border-0 shadow-xl overflow-hidden">
                                <div className="h-2 bg-gradient-to-r from-green-500 to-emerald-500" />
                                <CardContent className="p-8 bg-white/90 backdrop-blur">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                                            <Settings className="w-8 h-8 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                                                Perfil ANALISTA
                                            </h3>
                                            <p className="text-sm text-slate-600 dark:text-slate-300">
                                                Pode atribuir, responder e resolver chamados
                                            </p>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
                                            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">📧 Email:</p>
                                            <p className="font-mono text-sm bg-white dark:bg-slate-700 p-2 rounded border">
                                                analista@teste.com
                                            </p>
                                        </div>
                                        <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
                                            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">🔑 Senha:</p>
                                            <p className="font-mono text-sm bg-white dark:bg-slate-700 p-2 rounded border">
                                                Trackit123
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        <Card className="border-0 shadow-xl overflow-hidden">
                            <div className="h-2 bg-gradient-to-r from-amber-500 to-orange-500" />
                            <CardContent className="p-8 bg-amber-50 dark:bg-amber-950/20">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
                                        <span className="text-white text-xl">⚠️</span>
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold text-amber-800 dark:text-amber-200 mb-4">
                                            Roteiro para demonstração:
                                        </h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="flex items-start gap-3 p-4 bg-white/50 dark:bg-amber-900/20 rounded-lg">
                                                <span className="w-8 h-8 bg-amber-500 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">1</span>
                                                <span className="text-amber-700 dark:text-amber-300">
                                                    Teste primeiro com o perfil USUÁRIO para abrir um chamado
                                                </span>
                                            </div>
                                            <div className="flex items-start gap-3 p-4 bg-white/50 dark:bg-amber-900/20 rounded-lg">
                                                <span className="w-8 h-8 bg-amber-500 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">2</span>
                                                <span className="text-amber-700 dark:text-amber-300">
                                                    Depois acesse com o perfil ANALISTA para atender o chamado
                                                </span>
                                            </div>
                                            <div className="flex items-start gap-3 p-4 bg-white/50 dark:bg-amber-900/20 rounded-lg">
                                                <span className="w-8 h-8 bg-amber-500 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">3</span>
                                                <span className="text-amber-700 dark:text-amber-300">
                                                    Explore o chat em tempo real entre os perfis
                                                </span>
                                            </div>
                                            <div className="flex items-start gap-3 p-4 bg-white/50 dark:bg-amber-900/20 rounded-lg">
                                                <span className="w-8 h-8 bg-amber-500 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">4</span>
                                                <span className="text-amber-700 dark:text-amber-300">
                                                    Verifique as notificações e mudanças de status
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
            <div className="sticky top-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur border-b border-slate-200 dark:border-slate-800">
                <div className="container mx-auto px-4 py-3 md:py-4">
                    <div className="flex flex-col gap-3 md:gap-0 md:flex-row md:items-center justify-between">
                        <div className="flex items-center gap-3 md:gap-4 min-w-0">
                            <img src={Logo} alt="TrackIT" className="w-6 h-6 md:w-8 md:h-8 flex-shrink-0" />
                            <div className="min-w-0 flex-1">
                                <h1 className="text-base md:text-xl font-bold text-slate-900 dark:text-white truncate">
                                    TrackIT Presentation
                                </h1>
                                <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 truncate">
                                    {slides[current]?.subtitle}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center justify-between gap-3 md:gap-4">
                            <Badge variant="outline" className="border-cyan-600 text-cyan-700 dark:text-cyan-400 text-xs md:text-sm">
                                {current + 1} / {slides.length}
                            </Badge>
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() => navigate("/")}
                                className="border-cyan-600 text-cyan-700 hover:bg-cyan-600 hover:text-white h-8 w-8 md:h-10 md:w-10"
                            >
                                <Home className="w-3 h-3 md:w-4 md:h-4" />
                            </Button>
                        </div>
                    </div>

                    <div className="mt-3 md:mt-4">
                        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-1.5 md:h-2">
                            <div
                                className="bg-gradient-to-r from-cyan-500 to-blue-600 h-1.5 md:h-2 rounded-full transition-all duration-500 ease-out"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-4 md:py-8">
                <Carousel
                    setApi={setApi}
                    className="w-full relative"
                    opts={{
                        align: "start",
                        loop: false,
                    }}
                >
                    <CarouselContent>
                        {slides.map((slide) => (
                            <CarouselItem key={slide.id}>
                                <div className="bg-white dark:bg-slate-900 rounded-xl md:rounded-2xl shadow-lg md:shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                                    {renderSlideContent(slide)}
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>

                    <CarouselPrevious className="fixed left-4 md:left-8 top-1/2 -translate-y-1/2 z-50 h-12 w-12 md:h-16 md:w-16 border-2 border-cyan-600 text-cyan-700 hover:bg-cyan-600 hover:text-white shadow-xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm" />
                    <CarouselNext className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-50 h-12 w-12 md:h-16 md:w-16 border-2 border-cyan-600 text-cyan-700 hover:bg-cyan-600 hover:text-white shadow-xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm" />
                </Carousel>

                <div className="flex justify-center mt-4 md:mt-8">
                    <div className="flex items-center space-x-2 md:space-x-3 bg-white dark:bg-slate-900 rounded-full px-4 md:px-6 py-2 md:py-3 shadow-lg border border-slate-200 dark:border-slate-800">
                        {slides.map((_, slideIndex) => (
                            <button
                                key={slideIndex}
                                onClick={() => api?.scrollTo(slideIndex)}
                                className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${slideIndex === current
                                        ? "bg-cyan-600 scale-125 shadow-lg"
                                        : "bg-slate-300 dark:bg-slate-600 hover:bg-slate-400 dark:hover:bg-slate-500"
                                    }`}
                                aria-label={`Ir para slide ${slideIndex + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}