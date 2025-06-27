import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
    CheckCircle2,
    ArrowRight,
    FileText,
    AlertTriangle,
    Globe,
    User,
    Settings,
    PlayCircle,
    ExternalLink,
    Home
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
            { title: "RETRABALHO", description: "Chamados duplicados, falta de histórico centralizado e informações desencontradas forçam analistas a repetir tarefas.", icon: AlertTriangle },
            { title: "ATRASOS", description: "Sem sistema de priorização, as demandas se acumulam, gerando lentidão e impacto direto no trabalho dos servidores.", icon: Clock },
            { title: "DESORGANIZAÇÃO", description: "Interações por e-mail dificultam o rastreio, gerando perda de informações e falta de clareza para todos.", icon: FileText }
        ]
    },
    {
        id: 3,
        title: "Cenário Real da ASTIN",
        subtitle: "Dados que demonstram a necessidade",
        description: "Análise quantitativa dos problemas enfrentados em 2024",
        type: "astin",
        stats: [
            { label: "4.621 chamados cadastrados pela ASTIN em 2024", value: "4.621", color: "hsl(var(--primary))" },
            { label: "106 foram cancelados por falta de informação", value: "106", color: "hsl(var(--destructive))" },
            { label: "Processos 100% manuais em planilhas", value: "100%", color: "hsl(var(--warning))" }
        ]
    },
    {
        id: 4,
        title: "Nossa Solução: TrackIT",
        subtitle: "Tecnologia que conecta pessoas e processos",
        description: "Plataforma completa que centraliza e otimiza todo o atendimento",
        type: "solution",
        benefits: [
            { title: "PADRONIZAÇÃO", description: "Todas as solicitações seguem um fluxo único e estruturado, evitando erros e garantindo consistência no atendimento." },
            { title: "RASTREABILIDADE", description: "Cada interação fica registrada: do chamado inicial até a solução, com histórico completo e transparente." },
            { title: "AGILIDADE", description: "Os chamados são classificados, atribuídos e resolvidos com mais rapidez graças à automação inteligente." },
            { title: "CONECTIVIDADE", description: "Clientes, analistas e gestores interagem em tempo real por meio de chat, notificações e dashboards." }
        ]
    },
    {
        id: 5,
        title: "Benefícios na Prática",
        subtitle: "Transformações reais no dia a dia operacional",
        description: "Funcionalidades que revolucionam o atendimento de TI",
        type: "improvements",
        features: [
            { title: "Abertura de chamado pelo cliente", description: "com anexação de arquivos e formulário padronizado" },
            { title: "Acompanhamento via chat em tempo real", description: "com notificações automáticas por e-mail" },
            { title: "Atribuição transparente de chamados", description: "para analistas com base em critérios definidos" },
            { title: "Mudança de status dinâmica", description: "refletida instantaneamente para o cliente" },
            { title: "Dashboard gerencial completo", description: "para auxílio na tomada de decisões estratégicas" },
            { title: "Capacidade de intervenção em chamados", description: "pelos gestores quando necessário" }
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
                after: "~0 cancelados"
            },
            {
                title: "TEMPO DE RESPOSTA",
                description: "Demandas que ficavam dias na caixa de entrada agora terão atendimento inicial garantido em poucas horas.",
                before: "Dias paradas",
                after: "Poucas horas"
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
            {
                name: "React",
                category: "Frontend",
                url: "https://react.dev/",
                icon: "⚛️"
            },
            {
                name: "TypeScript",
                category: "Frontend",
                url: "https://www.typescriptlang.org/",
                icon: "🔷"
            },
            {
                name: "Tailwind CSS",
                category: "Frontend",
                url: "https://tailwindcss.com/",
                icon: "🎨"
            },
            {
                name: "Vite",
                category: "Frontend",
                url: "https://vitejs.dev/",
                icon: "⚡"
            },
            {
                name: "Node.js",
                category: "Backend",
                url: "https://nodejs.org/",
                icon: "🟢"
            },
            {
                name: "Express",
                category: "Backend",
                url: "https://expressjs.com/",
                icon: "🚀"
            },
            {
                name: "Prisma",
                category: "Database",
                url: "https://www.prisma.io/",
                icon: "🔺"
            },
            {
                name: "MySQL",
                category: "Database",
                url: "https://www.mysql.com/",
                icon: "🐬"
            },
            {
                name: "Docker",
                category: "DevOps",
                url: "https://www.docker.com/",
                icon: "🐳"
            },
            {
                name: "Socket.IO",
                category: "Real-time",
                url: "https://socket.io/",
                icon: "🔌"
            }
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
    const navigate = useNavigate();

    // Effect para rastrear slide atual
    useEffect(() => {
        if (!api) {
            return;
        }

        setCurrent(api.selectedScrollSnap());

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap());
        });
    }, [api]);

    const renderSlideContent = (slide: typeof slides[0]) => {
        switch (slide.type) {
            case "hero":
                return (
                    <div className="text-center space-y-6 py-4 md:py-8">
                        <div className="flex justify-center mb-4">
                            <img src={Logo} alt="TrackIT Logo" className="w-24 md:w-32 h-auto" />
                        </div>
                        <div className="space-y-3 md:space-y-4">
                            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                                {slide.title}
                            </h1>
                            <p className="text-lg md:text-xl lg:text-2xl text-foreground/80 font-medium">
                                {slide.subtitle}
                            </p>
                            <p className="text-sm md:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
                                {slide.description}
                            </p>
                        </div>
                        <div className="flex flex-wrap justify-center gap-2 md:gap-3 px-4">
                            <Badge className="px-3 py-1 bg-primary hover:bg-primary/90">
                                <Shield className="w-3 h-3 mr-1" />
                                Seguro
                            </Badge>
                            <Badge className="px-3 py-1 bg-secondary hover:bg-secondary/80 text-secondary-foreground">
                                <Zap className="w-3 h-3 mr-1" />
                                Rápido
                            </Badge>
                            <Badge className="px-3 py-1 bg-accent hover:bg-accent/80 text-accent-foreground">
                                <Users className="w-3 h-3 mr-1" />
                                Colaborativo
                            </Badge>
                        </div>
                    </div>
                );

            case "problem":
                return (
                    <div className="space-y-4 md:space-y-6 py-2 md:py-4">
                        <div className="text-center space-y-2 md:space-y-3 px-4">
                            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary">
                                {slide.title}
                            </h2>
                            <p className="text-base md:text-lg text-foreground/80 font-medium">
                                {slide.subtitle}
                            </p>
                            <p className="text-sm md:text-base text-muted-foreground">
                                {slide.description}
                            </p>
                        </div>
                        <div className="space-y-3 md:space-y-4 px-2 md:px-4">
                            {slide.problems?.map((problem, index) => (
                                <Card key={index} className="border-l-4 border-l-primary hover:shadow-md transition-shadow">
                                    <CardContent className="p-4 md:p-6">
                                        <div className="flex items-start space-x-3 md:space-x-4">
                                            <div className="p-2 bg-primary/10 rounded-full flex-shrink-0">
                                                <problem.icon className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-bold text-sm md:text-base text-primary mb-1 md:mb-2">
                                                    {problem.title}
                                                </h3>
                                                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                                                    {problem.description}
                                                </p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                );

            case "astin":
                return (
                    <div className="space-y-4 md:space-y-6 py-2 md:py-4">
                        <div className="text-center space-y-2 md:space-y-3 px-4">
                            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary">
                                {slide.title}
                            </h2>
                            <p className="text-base md:text-lg text-foreground/80 font-medium">
                                {slide.subtitle}
                            </p>
                            <p className="text-sm md:text-base text-muted-foreground">
                                {slide.description}
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 px-2 md:px-4">
                            {slide.stats?.map((stat, index) => (
                                <Card key={index} className="text-center hover:shadow-md transition-shadow">
                                    <CardHeader className="pb-2 md:pb-3">
                                        <div
                                            className="w-10 h-10 md:w-12 md:h-12 mx-auto rounded-full flex items-center justify-center border-2 border-white"
                                            style={{ backgroundColor: stat.color }}
                                        >
                                            <span className="text-white font-bold text-sm md:text-base drop-shadow-sm">{index + 1}</span>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="px-2 md:px-4">
                                        <div className="text-xl md:text-2xl font-bold text-foreground mb-1 md:mb-2">
                                            {stat.value}
                                        </div>
                                        <p className="text-xs md:text-sm text-muted-foreground leading-tight">
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
                    <div className="space-y-4 md:space-y-6 py-2 md:py-4">
                        <div className="text-center space-y-2 md:space-y-3 px-4">
                            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary">
                                {slide.title}
                            </h2>
                            <p className="text-base md:text-lg text-foreground/80 font-medium">
                                {slide.subtitle}
                            </p>
                            <p className="text-sm md:text-base text-muted-foreground">
                                {slide.description}
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 px-2 md:px-4">
                            {slide.benefits?.map((benefit, index) => (
                                <Card key={index} className="hover:shadow-md transition-shadow">
                                    <CardContent className="p-4 md:p-6">
                                        <div className="flex items-start space-x-3">
                                            <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                                                <CheckCircle2 className="w-3 h-3 md:w-4 md:h-4 text-primary-foreground" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-bold text-sm md:text-base text-primary mb-1 md:mb-2">
                                                    {benefit.title}
                                                </h3>
                                                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
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
                    <div className="space-y-4 md:space-y-6 py-2 md:py-4">
                        <div className="text-center space-y-2 md:space-y-3 px-4">
                            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary">
                                {slide.title}
                            </h2>
                            <p className="text-base md:text-lg text-foreground/80 font-medium">
                                {slide.subtitle}
                            </p>
                            <p className="text-sm md:text-base text-muted-foreground">
                                {slide.description}
                            </p>
                        </div>
                        <div className="space-y-2 md:space-y-3 px-2 md:px-4">
                            {slide.features?.map((feature, index) => (
                                <div key={index} className="flex items-start space-x-3 p-3 md:p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                                    <div className="w-2 h-2 rounded-full bg-primary mt-1.5 md:mt-2 flex-shrink-0"></div>
                                    <div className="text-xs md:text-sm flex-1 min-w-0">
                                        <span className="font-semibold text-primary">{feature.title}</span>
                                        <span className="text-foreground">, {feature.description}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );

            case "results":
                return (
                    <div className="space-y-4 md:space-y-6 py-2 md:py-4">
                        <div className="text-center space-y-2 md:space-y-3 px-4">
                            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary">
                                {slide.title}
                            </h2>
                            <p className="text-base md:text-lg text-foreground/80 font-medium">
                                {slide.subtitle}
                            </p>
                            <p className="text-sm md:text-base text-muted-foreground">
                                {slide.description}
                            </p>
                        </div>
                        <div className="space-y-4 md:space-y-6 px-2 md:px-4">
                            {slide.metrics?.map((metric, index) => (
                                <Card key={index} className="hover:shadow-md transition-shadow">
                                    <CardContent className="p-4 md:p-6">
                                        <h3 className="font-bold text-primary text-sm md:text-lg mb-2 md:mb-3">
                                            {metric.title}
                                        </h3>
                                        <p className="text-xs md:text-sm text-muted-foreground mb-3 md:mb-4 leading-relaxed">
                                            {metric.description}
                                        </p>
                                        <div className="flex items-center justify-center space-x-4 md:space-x-8">
                                            <div className="text-center">
                                                <div className="text-sm md:text-xl font-bold text-destructive mb-1">
                                                    {metric.before}
                                                </div>
                                                <div className="text-xs text-muted-foreground">ANTES</div>
                                            </div>
                                            <ArrowRight className="w-4 h-4 md:w-6 md:h-6 text-primary flex-shrink-0" />
                                            <div className="text-center">
                                                <div className="text-sm md:text-xl font-bold text-green-600 dark:text-green-400 mb-1">
                                                    {metric.after}
                                                </div>
                                                <div className="text-xs text-muted-foreground">DEPOIS</div>
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
                    <div className="space-y-4 md:space-y-6 py-2 md:py-4">
                        <div className="text-center space-y-2 md:space-y-3 px-4">
                            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary">
                                {slide.title}
                            </h2>
                            <p className="text-base md:text-lg text-foreground/80 font-medium">
                                {slide.subtitle}
                            </p>
                            <p className="text-sm md:text-base text-muted-foreground">
                                {slide.description}
                            </p>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4 px-2 md:px-4">
                            {slide.technologies?.map((tech, index) => (
                                <Card
                                    key={index}
                                    className="text-center p-3 md:p-4 hover:shadow-md transition-all duration-200 cursor-pointer hover:scale-105 group"
                                    onClick={() => window.open(tech.url, '_blank')}
                                >
                                    <div className="flex flex-col items-center space-y-2">
                                        <div className="text-2xl md:text-3xl mb-1">
                                            {tech.icon}
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <p className="text-xs md:text-sm font-medium text-foreground">
                                                {tech.name}
                                            </p>
                                            <ExternalLink className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </div>
                                        <Badge variant="outline" className="text-xs">
                                            {tech.category}
                                        </Badge>
                                    </div>
                                </Card>
                            ))}
                        </div>
                        <div className="text-center px-4">
                            <p className="text-xs text-muted-foreground">
                                Clique em qualquer tecnologia para acessar sua documentação oficial
                            </p>
                        </div>
                    </div>
                );

            case "testing":
                return (
                    <div className="space-y-4 md:space-y-6 py-2 md:py-4">
                        <div className="text-center space-y-2 md:space-y-3 px-4">
                            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary">
                                {slide.title}
                            </h2>
                            <p className="text-base md:text-lg text-foreground/80 font-medium">
                                {slide.subtitle}
                            </p>
                            <p className="text-sm md:text-base text-muted-foreground">
                                {slide.description}
                            </p>
                        </div>

                        <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground p-4 md:p-6 rounded-lg mx-2 md:mx-4 mb-4 md:mb-6">
                            <div className="flex items-center space-x-2 md:space-x-3 mb-3 md:mb-4">
                                <Globe className="w-5 h-5 md:w-6 md:h-6" />
                                <h3 className="text-lg md:text-xl font-bold">Acesso à Aplicação</h3>
                            </div>
                            <div className="bg-white p-2 md:p-3 rounded text-center">
                                <p className="text-slate-700 text-sm md:text-lg font-mono">
                                    🌐 trackit-front.onrender.com
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 px-2 md:px-4">
                            <Card className="border-2 border-secondary">
                                <CardHeader className="bg-secondary text-secondary-foreground p-3 md:p-4">
                                    <div className="flex items-center space-x-2">
                                        <User className="w-4 h-4 md:w-5 md:h-5" />
                                        <CardTitle className="text-sm md:text-lg">Perfil USUÁRIO</CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent className="p-3 md:p-4">
                                    <div className="space-y-2 md:space-y-3">
                                        <div>
                                            <p className="text-xs md:text-sm font-semibold text-primary">📧 Email:</p>
                                            <p className="font-mono text-xs md:text-sm bg-muted p-2 rounded">usuario@teste.com</p>
                                        </div>
                                        <div>
                                            <p className="text-xs md:text-sm font-semibold text-primary">🔑 Senha:</p>
                                            <p className="font-mono text-xs md:text-sm bg-muted p-2 rounded">Trackit123</p>
                                        </div>
                                        <div className="pt-1 md:pt-2">
                                            <p className="text-xs text-muted-foreground">
                                                <PlayCircle className="w-3 h-3 md:w-4 md:h-4 inline mr-1" />
                                                Pode abrir chamados e conversar via chat
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="border-2 border-accent">
                                <CardHeader className="bg-accent text-accent-foreground p-3 md:p-4">
                                    <div className="flex items-center space-x-2">
                                        <Settings className="w-4 h-4 md:w-5 md:h-5" />
                                        <CardTitle className="text-sm md:text-lg">Perfil ANALISTA</CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent className="p-3 md:p-4">
                                    <div className="space-y-2 md:space-y-3">
                                        <div>
                                            <p className="text-xs md:text-sm font-semibold text-primary">📧 Email:</p>
                                            <p className="font-mono text-xs md:text-sm bg-muted p-2 rounded">analista@teste.com</p>
                                        </div>
                                        <div>
                                            <p className="text-xs md:text-sm font-semibold text-primary">🔑 Senha:</p>
                                            <p className="font-mono text-xs md:text-sm bg-muted p-2 rounded">Trackit123</p>
                                        </div>
                                        <div className="pt-1 md:pt-2">
                                            <p className="text-xs text-muted-foreground">
                                                <PlayCircle className="w-3 h-3 md:w-4 md:h-4 inline mr-1" />
                                                Pode atribuir, responder e resolver chamados
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        <div className="bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800 p-3 md:p-4 rounded-lg mx-2 md:mx-4">
                            <div className="flex items-start space-x-2 md:space-x-3">
                                <div className="text-orange-600 dark:text-orange-400 text-lg">⚠️</div>
                                <div>
                                    <p className="text-xs md:text-sm font-semibold text-orange-800 dark:text-orange-200">Roteiro para demonstração:</p>
                                    <ul className="text-xs md:text-sm text-orange-700 dark:text-orange-300 mt-1 md:mt-2 space-y-1 list-disc list-inside">
                                        <li>Teste primeiro com o perfil USUÁRIO para abrir um chamado</li>
                                        <li>Depois acesse com o perfil ANALISTA para atender o chamado</li>
                                        <li>Explore o chat em tempo real entre os perfis</li>
                                        <li>Verifique as notificações e mudanças de status</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-6 md:py-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 md:mb-8 space-y-2 md:space-y-0">
                    <div className="flex items-center space-x-3 md:space-x-4">
                        <img src={Logo} alt="TrackIT" className="w-6 h-6 md:w-8 md:h-8" />
                        <h1 className="text-lg md:text-2xl font-bold text-primary">
                            TrackIT Presentation
                        </h1>
                        <Badge variant="outline" className="border-primary text-primary">
                            {current + 1} / {slides.length}
                        </Badge>
                    </div>
                    <div className="flex items-center space-x-2 md:space-x-4">
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => navigate("/")}
                            title="Voltar ao início"
                        >
                            <Home className="w-4 h-4" />
                        </Button>
                        <span className="text-xs md:text-sm text-muted-foreground">
                            {slides[current]?.subtitle}
                        </span>
                    </div>
                </div>

                {/* Carousel */}
                <div className="relative">
                    <Carousel
                        setApi={setApi}
                        className="w-full"
                        opts={{
                            align: "start",
                            loop: false,
                        }}
                    >
                        <CarouselContent className="-ml-1 md:-ml-2 lg:-ml-4">
                            {slides.map((slide) => (
                                <CarouselItem key={slide.id} className="pl-1 md:pl-2 lg:pl-4">
                                    <div className="bg-card rounded-xl shadow-xl p-4 md:p-6 lg:p-8 min-h-[450px] md:min-h-[500px] flex items-center border">
                                        <div className="w-full">
                                            {renderSlideContent(slide)}
                                        </div>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>

                        {/* Botões de navegação - desktop */}
                        <CarouselPrevious className="hidden md:flex absolute left-2 lg:left-4 top-1/2 -translate-y-1/2 h-10 w-10 lg:h-12 lg:w-12 border-primary text-primary hover:bg-primary hover:text-primary-foreground" />
                        <CarouselNext className="hidden md:flex absolute right-2 lg:right-4 top-1/2 -translate-y-1/2 h-10 w-10 lg:h-12 lg:w-12 border-primary text-primary hover:bg-primary hover:text-primary-foreground" />

                        {/* Botões de navegação - mobile fixos */}
                        <CarouselPrevious className="md:hidden fixed left-4 top-1/2 -translate-y-1/2 z-50 h-12 w-12 border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-background/90 shadow-lg backdrop-blur-sm" />
                        <CarouselNext className="md:hidden fixed right-4 top-1/2 -translate-y-1/2 z-50 h-12 w-12 border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-background/90 shadow-lg backdrop-blur-sm" />

                        {/* Progress indicators - posicionados próximos aos botões */}
                        <div className="hidden md:flex absolute bottom-4 left-1/2 -translate-x-1/2 items-center space-x-2 bg-background/90 rounded-full px-4 py-2 shadow-lg border backdrop-blur-sm">
                            {slides.map((_, slideIndex) => (
                                <button
                                    key={slideIndex}
                                    onClick={() => api?.scrollTo(slideIndex)}
                                    className={`w-3 h-3 rounded-full transition-all duration-200 ${slideIndex === current
                                        ? "bg-primary scale-110"
                                        : "bg-muted-foreground/30 hover:bg-muted-foreground/60"
                                        }`}
                                    aria-label={`Ir para slide ${slideIndex + 1}`}
                                />
                            ))}
                        </div>
                    </Carousel>
                </div>

                {/* Progress indicators mobile - fixos na parte inferior */}
                <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
                    <div className="flex items-center space-x-2 bg-background/90 rounded-full px-4 py-2 shadow-lg border backdrop-blur-sm">
                        {slides.map((_, slideIndex) => (
                            <button
                                key={slideIndex}
                                onClick={() => api?.scrollTo(slideIndex)}
                                className={`w-3 h-3 rounded-full transition-all duration-200 ${slideIndex === current
                                    ? "bg-primary scale-110"
                                    : "bg-muted-foreground/30 hover:bg-muted-foreground/60"
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