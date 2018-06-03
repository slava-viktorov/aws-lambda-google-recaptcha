const fetch = require('node-fetch');
const FormData = require('form-data');

const VERIFY_URL = 'https://www.google.com/recaptcha/api/siteverify';
const SECRET = '';

exports.handler = async (event) => {
  try {
    const { 'g-recaptcha-response': gRecaptchaResponse, remoteip = '' } = event;

    if (!gRecaptchaResponse) throw new Error('Not field g-recaptcha-response');

    const form = new FormData();
    form.append('secret', SECRET);
    form.append('response', gRecaptchaResponse);
    form.append('remoteip', remoteip);

    const res = await fetch(VERIFY_URL, { method: 'POST', body: form });

    if (res.status !== 200) return { error: res.status };

    const { success } = await res.json();
    return { success };
  } catch (err) {
    console.error(err);
    throw err;
  }
};
