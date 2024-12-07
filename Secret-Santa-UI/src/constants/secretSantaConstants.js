import secretSantaTheme from '../assets/secretSantaTheme.jpg';

export const CHAT_BOX_TYPE = {
    SECRET_SANTA: 'secretSanta',
    GIFT_NINJA: 'giftNinja'
  };

export const NOTIFICATION_TYPE = {
    MESSAGE: 'message'
};

export const BACKGROUND_STYLE = {
  backgroundImage: `url(${secretSantaTheme})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  height: '100vh',
  width: '100%',
};

export const ERROR = 'error';
export const SUCCESS = 'success';
export const EMPTY = '';

export const TALK_TO_USER = {
  SECRET_SANTA: 'Talk to My Secret Santa',
  GIFT_NINJA: 'Talk to My Gift Ninja'
}

export const REQUEST_ERROR_MESSAGE = 'An error occurred while processing the request';
export const POPUP_ERROR_MESSAGE = 'Something unexpected happened. Please contact your administrator';

// path constants
export const ROUTE_PATH = {
  DASHBOARD: '/secret-santa',
  GAME_STATUS: '/game-status',
  CHAT: '/chat',
  WISHLIST: '/wishlist',
  GAME: '/game',
  LOGIN: '/login',
  REGISTER: '/register',
  DEFAULT: '/'
}