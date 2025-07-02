import nodemailer from 'nodemailer';
import { logger } from '../logger/Logger';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// template base para emails
const getEmailTemplate = (content: string, title: string) => `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f8fafc;
        }
        
        .email-container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border-radius: 12px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }
        
        .header {
            background: linear-gradient(135deg, #187094 0%, #0f4c6b 50%, #031a22 100%);
            padding: 40px 30px;
            text-align: center;
            color: white;
            position: relative;
        }
        
        .header::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="white" opacity="0.1"/><circle cx="75" cy="75" r="1" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
        }
        
        .logo {
            position: relative;
            z-index: 1;
            font-size: 32px;
            font-weight: bold;
            margin-bottom: 8px;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
            letter-spacing: 1px;
        }
        
        .tagline {
            position: relative;
            z-index: 1;
            font-size: 16px;
            opacity: 0.9;
            font-weight: 300;
        }
        
        .content {
            padding: 40px 30px;
        }
        
        .greeting {
            font-size: 24px;
            color: #031a22;
            margin-bottom: 20px;
            font-weight: 600;
        }
        
        .message {
            font-size: 16px;
            color: #0f4c6b;
            margin-bottom: 20px;
        }
        
        .highlight-box {
            background: linear-gradient(135deg, #f1f8fb 0%, #e6f4f8 100%);
            border-left: 4px solid #187094;
            padding: 20px;
            margin: 25px 0;
            border-radius: 8px;
        }
        
        .ticket-info {
            background: #f8fcfd;
            border: 1px solid #b8d9e4;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
        }
        
        .ticket-number {
            font-size: 20px;
            font-weight: bold;
            color: #187094;
            margin-bottom: 10px;
        }
        
        .info-row {
            display: flex;
            margin-bottom: 8px;
            align-items: center;
        }
        
        .info-label {
            font-weight: 600;
            color: #031a22;
            min-width: 100px;
        }
        
        .info-value {
            color: #0f4c6b;
        }
        
        .status-badge {
            display: inline-block;
            padding: 6px 12px;
            background: linear-gradient(135deg, #187094 0%, #0f4c6b 100%);
            color: white;
            border-radius: 20px;
            font-size: 14px;
            font-weight: 500;
        }
        
        .button {
            display: inline-block;
            padding: 12px 24px;
            background: linear-gradient(135deg, #187094 0%, #0f4c6b 50%, #031a22 100%);
            color: white !important;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 600;
            margin: 20px 0;
            transition: transform 0.2s;
            box-shadow: 0 4px 12px rgba(24, 112, 148, 0.3);
        }
        
        .button:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 16px rgba(24, 112, 148, 0.4);
        }
        
        .footer {
            background: #f8fcfd;
            padding: 30px;
            text-align: center;
            border-top: 1px solid #b8d9e4;
        }
        
        .footer-text {
            font-size: 14px;
            color: #0f4c6b;
            margin-bottom: 10px;
        }
        
        .footer-links {
            font-size: 12px;
            color: #187094;
        }
        
        @media (max-width: 600px) {
            .email-container {
                margin: 10px;
                border-radius: 8px;
            }
            
            .header {
                padding: 30px 20px;
            }
            
            .content {
                padding: 30px 20px;
            }
            
            .logo {
                font-size: 28px;
            }
            
            .greeting {
                font-size: 20px;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <div class="logo">TrackIT</div>
            <div class="tagline">Sistema de Gestão de Chamados</div>
        </div>
        ${content}
        <div class="footer">
            <div class="footer-text">
                <strong>TrackIT</strong> - Sua plataforma de suporte técnico
            </div>
            <div class="footer-links">
                Este é um e-mail automático, não responda esta mensagem.
            </div>
        </div>
    </div>
</body>
</html>
`;

export async function sendEmail({
    to,
    subject,
    text,
    html,
    from,
}: {
    to: string;
    subject: string;
    text?: string;
    html?: string;
    from?: string;
}) {
    if (!to || typeof to !== "string" || !to.includes("@")) {
        logger.warn('EmailService', 'INVALID_EMAIL_ADDRESS', undefined, { to, subject });
        return;
    }
    try {
        const info = await transporter.sendMail({
            from: from || process.env.EMAIL_USER,
            to,
            subject,
            text,
            html,
        });

        logger.info('EmailService', 'EMAIL_SENT_SUCCESS', undefined, {
            to,
            subject,
            messageId: info.messageId
        });

        return info;
    } catch (error) {
        logger.error('EmailService', 'EMAIL_SEND_FAILED', undefined, error as Error);
        return;
    }
}

export async function sendNotificationEmail({
    to,
    nomeUsuario,
    idChamado,
    assunto,
    mensagem,
}: {
    to: string;
    nomeUsuario: string;
    idChamado: number;
    assunto: string;
    mensagem: string;
}) {

    const subject = `📩 Nova mensagem no chamado #${idChamado}`;

    const content = `
        <div class="content">
            <div class="greeting">Olá, ${nomeUsuario}! 👋</div>
            <div class="message">
                Você recebeu uma nova mensagem em um dos seus chamados.
            </div>
            
            <div class="ticket-info">
                <div class="ticket-number">Chamado #${idChamado}</div>
                <div class="info-row">
                    <span class="info-label">Assunto:</span>
                    <span class="info-value">${assunto}</span>
                </div>
            </div>
            
            <div class="highlight-box">
                <strong>💬 Nova Mensagem:</strong><br>
                ${mensagem}
            </div>
            
            <div class="message">
                Acesse o sistema para responder ou visualizar o histórico completo da conversa.
            </div>
            
            <a href="${process.env.FRONTEND_URL || 'https://trackit-front.onrender.com'}" class="button">
                🔗 Acessar Sistema
            </a>
        </div>
    `;

    const html = getEmailTemplate(content, `Nova mensagem - Chamado #${idChamado}`);
    return sendEmail({ to, subject, html });
}

export async function sendPasswordResetEmail({
    to,
    nomeUsuario,
    token
}: {
    to: string;
    nomeUsuario: string;
    token: string;
}) {
    logger.info('EmailService', 'SEND_PASSWORD_RESET_EMAIL', undefined, {
        to,
        nomeUsuario,
        tokenPrefix: token.substring(0, 8) + '...'
    });

    const resetUrl = `${process.env.FRONTEND_URL}reset-password?token=${token}`;
    const subject = "🔐 Redefinição de senha - TrackIT";

    const content = `
        <div class="content">
            <div class="greeting">Olá, ${nomeUsuario}! 👋</div>
            <div class="message">
                Você solicitou a redefinição de sua senha no sistema TrackIT.
            </div>
            
            <div class="highlight-box">
                <strong>🔒 Redefinir Senha</strong><br>
                Clique no botão abaixo para criar uma nova senha segura para sua conta.
            </div>
            
            <a href="${resetUrl}" class="button">
                🔑 Redefinir Minha Senha
            </a>
            
            <div class="message">
                <strong>⏰ Importante:</strong> Este link expira em <strong>30 minutos</strong> por motivos de segurança.
            </div>
            
            <div class="message">
                Se você não solicitou esta redefinição, pode ignorar este e-mail com segurança.
            </div>
        </div>
    `;

    const html = getEmailTemplate(content, "Redefinição de senha");
    return sendEmail({ to, subject, html });
}

export async function sendTicketStatusChangeEmail({
    to,
    nomeUsuario,
    idChamado,
    assunto,
    novoStatus
}: {
    to: string;
    nomeUsuario: string;
    idChamado: number;
    assunto: string;
    novoStatus: string;
}) {
    logger.info('EmailService', 'SEND_STATUS_CHANGE_EMAIL', undefined, {
        to,
        nomeUsuario,
        idChamado,
        assunto,
        novoStatus
    });

    const subject = `📊 Atualização no chamado #${idChamado}`;

    // Escolher emoji baseado no status
    let statusEmoji = "📊";
    const statusLower = novoStatus.toLowerCase();
    if (statusLower.includes("fechado") || statusLower.includes("resolvido")) {
        statusEmoji = "✅";
    } else if (statusLower.includes("progresso") || statusLower.includes("andamento")) {
        statusEmoji = "🔄";
    } else if (statusLower.includes("pendente")) {
        statusEmoji = "⏳";
    } else if (statusLower.includes("reaberto")) {
        statusEmoji = "🔄";
    }

    const content = `
        <div class="content">
            <div class="greeting">Olá, ${nomeUsuario}! 👋</div>
            <div class="message">
                Temos uma atualização importante sobre seu chamado.
            </div>
            
            <div class="ticket-info">
                <div class="ticket-number">Chamado #${idChamado}</div>
                <div class="info-row">
                    <span class="info-label">Assunto:</span>
                    <span class="info-value">${assunto}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Novo Status:</span>
                    <span class="info-value">
                        <span class="status-badge">${statusEmoji} ${novoStatus}</span>
                    </span>
                </div>
            </div>
            
            <div class="message">
                Acesse o sistema para visualizar mais detalhes sobre esta atualização e acompanhar o progresso do seu chamado.
            </div>
            
            <a href="${process.env.FRONTEND_URL || 'https://trackit-front.onrender.com'}" class="button">
                👁️ Visualizar Chamado
            </a>
        </div>
    `;

    const html = getEmailTemplate(content, `Atualização - Chamado #${idChamado}`);
    return sendEmail({ to, subject, html });
}

