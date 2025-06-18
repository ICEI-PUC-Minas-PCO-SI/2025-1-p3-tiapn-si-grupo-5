import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

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
    try {
        const info = await transporter.sendMail({
            from: from || process.env.EMAIL_USER,
            to,
            subject,
            text,
            html,
        });
        console.log('E-mail enviado:', info.response);
        return info;
    } catch (error) {
        console.error('Erro ao enviar e-mail:', error);
        throw error;
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
    try {
        const info = await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to,
            subject,
            html,
        });
        console.log('E-mail de notificação enviado:', info.response);
        return info;
    } catch (error) {
        console.error('Erro ao enviar e-mail de notificação:', error);
        throw error;
    }
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
    const resetUrl = `${process.env.FRONTEND_URL || "http://localhost:5173"}/reset-password?token=${token}`;
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

if (require.main === module) {
    (async () => {
        await sendEmail({
            to: "",
            subject: "Test Email",
            text: "Hello World!",
            html: "<b>Hello World!</b>",
        });
    })();
}