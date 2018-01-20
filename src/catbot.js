import Mastodon from 'mastodon-api';

import { getSettings } from './settings';

const sendToot = async ({ accessToken, instanceUrl, tootOptions, catStrings }) => {
  const instance = new Mastodon({
    access_token: accessToken,
    api_url: instanceUrl,
  });

  const text = catStrings[Math.floor(Math.random() * catStrings.length)];
  return instance.post('statuses', Object.assign(tootOptions, {
    status: text,
  }));
};

export const startBot = () => {
  const settings = getSettings(`${__dirname}/../settings.json`);

  sendToot(settings)
    .then(r => console.log('Published: ', r.data.content))
    .catch(e => console.log('Error: ', e));

  setInterval(() => {
    sendToot(settings)
      .then(r => console.log('Published: ', r.data.content))
      .catch(e => console.log('Error: ', e));
  }, settings.timeBetweenToots * 60000);
};

export default startBot;

