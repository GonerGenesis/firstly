import type * as typeNodemailer from 'nodemailer';
import type Mail from 'nodemailer/lib/mailer';
export type MailOptions = {
    from?: Mail.Options['from'];
    transport?: Parameters<typeof typeNodemailer.createTransport>[0];
    apiUrl?: Parameters<typeof typeNodemailer.createTestAccount>[0];
};
declare let transporter: ReturnType<typeof typeNodemailer.createTransport>;
export declare const mailInit: (nodemailer: typeof typeNodemailer, o?: MailOptions) => void;
export declare const sendMail: (topic: string, mailOptions: Parameters<typeof transporter.sendMail>[0]) => ReturnType<typeof transporter.sendMail>;
export {};
