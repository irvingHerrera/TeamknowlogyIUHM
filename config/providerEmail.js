const GMAIL = {
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: 'irving.herreramolina@gmail.com',
        pass: 'basix123',
    },
    tls: {
        rejectUnauthorized: false
    }
};
const OUTLOOK = {
    host: "smtp-mail.outlook.com",
    port: 587,
    secureConnection: false, 
    auth: {
    user: 'irving.herrera.molina@outlook.com',
    pass: '',
    },
    tls: {
    ciphers:'SSLv3'
    }
};
const YAHOO = {host: "smtp.mail.yahoo.com",
    port: 587,
    secure: false,
    auth: {
    user: 'irving.herreramolina@yahoo.com',
    pass: 'tnmleihusbfkyrca',
    },
    tls: {
    ciphers:'SSLv3'
    }
};
const PROVIDER_EMAil = {
    gmail: 'gmail',
    outlook: 'outlook',
    yahoo: 'yahoo'
}

module.exports = {
    GMAIL,
    OUTLOOK,
    YAHOO,
    PROVIDER_EMAil
}