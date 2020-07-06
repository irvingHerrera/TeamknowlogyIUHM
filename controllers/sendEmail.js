const nodemailer = require('nodemailer');
const path = require('path');
const {readTempleate} = require('../common/readTempleate');

const { PROVIDER_EMAil, GMAIL, YAHOO, OUTLOOK } = require('../config/providerEmail');

async function sendEmail(req, res) {

  const body = req.body;
  const transportConfig = getProvider(body.provider || PROVIDER_EMAil.yahoo);

  const payload = {
      from: transportConfig.auth.user,
      to: body.to.toString(), // list of receivers
      subject: body.subject || 'Teamknowlogy', // Subject line
      html: readTempleate(), // html body
      attachments: [
      {
          filename: 'logo.png',
          path: path.join(path.dirname(require.main.filename) + '/template/images/logo.png'),
          cid: 'unique@logo.png' //same cid value as in the html img src
      },
      {
        filename: 'facebook.svg',
        path: path.join(path.dirname(require.main.filename) + '/template/images/facebook.svg'),
        cid: 'unique@facebook.svg' //same cid value as in the html img src
      },
      {
        filename: 'twitter.svg',
        path: path.join(path.dirname(require.main.filename) + '/template/images/twitter.svg'),
        cid: 'unique@twitter.svg' //same cid value as in the html img src
      },
      {
        filename: 'youtube.svg',
        path: path.join(path.dirname(require.main.filename) + '/template/images/youtube.svg'),
        cid: 'unique@youtube.svg' //same cid value as in the html img src
      },
      {
        filename: 'google.svg',
        path: path.join(path.dirname(require.main.filename) + '/template/images/google.svg'),
        cid: 'unique@google.svg' //same cid value as in the html img src
      },
      {
        filename: 'linkedin.svg',
        path: path.join(path.dirname(require.main.filename) + '/template/images/linkedin.svg'),
        cid: 'unique@linkedin.svg' //same cid value as in the html img src
      }
    ]
  };

  const transporter = nodemailer.createTransport(transportConfig);

  transporter.verify(function(error, success) {
      if (error) {
        return res.status(404).json({
          success: false,
          err: {
              message: 'could not verify login',
              err: error
          }
        });
      } else {
        console.log("Server is ready to take our messages");
      }
    });

    const info = await transporter.sendMail(payload);

    res.status(200).json({
      success: true,
      message: 'El correo fue enviado correctamente',
      err: {
          data: info.messageId
      }
    });
}

function getProvider(provider) {
  let providerConfig;
  switch (provider) {
    case PROVIDER_EMAil.gmail:
      providerConfig = GMAIL;
    break;
    case PROVIDER_EMAil.outlook:
      providerConfig = OUTLOOK;
    break;
    case PROVIDER_EMAil.yahoo:
      providerConfig = YAHOO;
    break;
    default:
      break;
  }

  return providerConfig;
}

module.exports = {
    sendEmail
};