const config = {
  apiUrl: process.env.NEXT_PUBLIC_BACKEND_URL || '',
  webSocketUrl: process.env.NEXT_PUBLIC_WS_URL || '',
  appName: process.env.NEXT_PUBLIC_NAME || '',
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL || '/slack-music-bot-client'
};

export default config;
