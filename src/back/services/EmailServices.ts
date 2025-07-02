import nodemailer from 'nodemailer';
import { logger } from '../logger/Logger';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

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
    logger.info('EmailService', 'SEND_NOTIFICATION_EMAIL', undefined, { 
        to, 
        nomeUsuario, 
        idChamado, 
        assunto 
    });
    
    const subject = `Nova mensagem no chamado #${idChamado}`;
    const html = `
        <div style="font-family: Arial, sans-serif; color: #222;">
            <h2>Olá, ${nomeUsuario}!</h2>
            <p>Você recebeu uma nova mensagem no chamado <b>#${idChamado}</b>:</p>
            <p><b>Assunto:</b> ${assunto}</p>
            <hr />
            <p><b>Mensagem:</b></p>
            <blockquote style="background:#f5f5f5;padding:10px;border-radius:5px;">${mensagem}</blockquote>
            <p>Acesse o sistema para responder ou visualizar o histórico completo.</p>
            <p style="font-size:12px;color:#888;">Esta é uma notificação automática do sistema TrackIt.</p>
        </div>
    `;
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
    const subject = "Redefinição de senha - TrackIt";
    const html = `
        <div>
            <h2>Olá, ${nomeUsuario}!</h2>
            <p>Você solicitou a redefinição de senha. Clique no link abaixo para criar uma nova senha:</p>
            <p><a href="${resetUrl}">${resetUrl}</a></p>
            <p>Este link expira em 30 minutos.</p>
            <p>Se não foi você, ignore este e-mail.</p>
        </div>
    `;
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
    
    const subject = `Atualização no chamado #${idChamado}`;
    const html = `
        <div style="font-family: Arial, sans-serif; color: #222;">
            <h2>Olá, ${nomeUsuario}!</h2>
            <p>O status do seu chamado <b>#${idChamado}</b> foi alterado.</p>
            <p><b>Assunto:</b> ${assunto}</p>
            <p><b>Novo status:</b> ${novoStatus}</p>
            <p>Acesse o sistema para mais detalhes.</p>
            <p style="font-size:12px;color:#888;">Esta é uma notificação automática do sistema TrackIt.</p>
        </div>
    `;
    return sendEmail({ to, subject, html });
}
