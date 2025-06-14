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