import Fs from 'fs';
import mergeOptions from 'merge-options';

import { CATSTRINGS } from './catstrings';

/** DEFAULT OPTIONS */
const TOOT_OPTIONS = {
  visibility: 'public',
  sensitive: false,
};

const TIME_BETWEEN_TOOTS = 120; // minutes
/** */

export const getSettings = (file) => {
  const data = Fs.readFileSync(file);
  if (data == null) {
    throw new Error('Unable to load settings');
  }

  const customSettings = JSON.parse(data);
  let { instanceUrl } = customSettings;
  const { accessToken } = customSettings;

  if (instanceUrl == null || accessToken == null) {
    throw new Error('accessToken and instanceUrl are mandatory');
  }

  if (instanceUrl.endsWith('/') === false) {
    instanceUrl = `${instanceUrl}/`;
  }

  const tootOptions = mergeOptions(TOOT_OPTIONS, customSettings.tootOptions || {});

  let catStrings = CATSTRINGS;
  if (Array.isArray(customSettings.customCatStrings)) {
    catStrings = [
      ...catStrings,
      ...customSettings.customCatStrings,
    ];
  }

  let timeBetweenToots = parseInt(customSettings.timeBetweenToots, 10);
  if (Number.isNaN(timeBetweenToots)) {
    timeBetweenToots = TIME_BETWEEN_TOOTS;
  }

  return {
    instanceUrl,
    accessToken,
    tootOptions,
    catStrings,
    timeBetweenToots,
  };
};

export default getSettings;
