import { Log, magenta } from '@kitql/helpers';
let transporter;
let options;
export const mailInit = (nodemailer, o) => {
    options = o;
    if (o?.transport) {
        transporter = nodemailer.createTransport(o?.transport);
    }
    else {
        nodemailerHolder = nodemailer;
        try {
            nodemailer.createTestAccount(options?.apiUrl ?? '', (err, account) => {
                options = { ...options, from: account.user };
                transporter = nodemailer.createTransport({
                    host: account.smtp.host,
                    port: account.smtp.port,
                    secure: account.smtp.secure,
                    auth: {
                        user: account.user,
                        pass: account.pass,
                    },
                });
            });
        }
        catch (error) {
            log.error("Error nodemailer.createTestAccount() can't be done.");
        }
    }
};
const log = new Log('firstly | mail');
let nodemailerHolder;
export const sendMail = async (topic, mailOptions) => {
    try {
        const info = await transporter.sendMail({
            ...mailOptions,
            ...{ from: mailOptions.from ?? options?.from },
        });
        if (!options?.transport) {
            log.info(
            // @ts-ignore
            `${magenta(`[${topic}]`)} - Preview URL: ${nodemailerHolder.getTestMessageUrl(info)}`);
        }
        else {
            log.success(`${magenta(`[${topic}]`)} - Sent to ${mailOptions.to}`);
        }
        return info;
    }
    catch (error) {
        log.error(`${magenta(`[${topic}]`)} - Error`, error);
    }
};
