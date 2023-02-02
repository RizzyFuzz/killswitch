const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  // ! Supported APIs
  "e621": "https://e621.net",
  "e926": "https://e926.net",
  yiffrest: "https://v2.yiff.rest",
  floofy: "https://api.floofy.dev",
  shibe: "https://shibe.online/api/",
  fox: "https://randomfox.ca/floof/",
  sheri: "https://sheri.bot/api",
  gelbooru: "https://gelbooru.com",
  thaldrin: "https://thaldr.in/api/v1",
  // "r34": "https://rule34.xxx/index.php?page=dapi&s=post&q=index",

  // ? Config Stuff
  useragent: `Killswitch/v${require('./package.json').version} (rizzlydev/killswitch);`,
  port: process.env.PORT || 3000,
  log: 'killswitch.log',
  error: 'killswitch.error.log',
  redirect: process.env.REDIRECT || 'https://github.com/himbolion/killswitch/wiki'
};

