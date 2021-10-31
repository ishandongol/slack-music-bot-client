const config = {
  apiUrl: process.env.NEXT_PUBLIC_BACKEND_URL || 'https://slack-music-bot-rs.herokuapp.com',
  webSocketUrl: process.env.NEXT_PUBLIC_WS_URL || 'wss://slack-music-bot-rs.herokuapp.com/ws',
  appName: process.env.NEXT_PUBLIC_NAME || 'Music Playground',
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL || '/slack-music-bot-client'
};

export default config;
