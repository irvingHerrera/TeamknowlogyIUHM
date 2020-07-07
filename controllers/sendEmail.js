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
        filename: 'facebook.png',
        path: path.join(path.dirname(require.main.filename) + '/template/images/facebook.png'),
        cid: 'unique@facebook.png' //same cid value as in the html img src
      },
      {
        filename: 'twitter.png',
        path: path.join(path.dirname(require.main.filename) + '/template/images/twitter.png'),
        cid: 'unique@twitter.png' //same cid value as in the html img src
      },
      {
        filename: 'youtube.png',
        path: path.join(path.dirname(require.main.filename) + '/template/images/youtube.png'),
        cid: 'unique@youtube.png' //same cid value as in the html img src
      },
      {
        filename: 'google.png',
        path: path.join(path.dirname(require.main.filename) + '/template/images/google.png'),
        cid: 'unique@google.png' //same cid value as in the html img src
      },
      {
        filename: 'linkedin.png',
        path: path.join(path.dirname(require.main.filename) + '/template/images/linkedin.png'),
        cid: 'unique@linkedin.png' //same cid value as in the html img src
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