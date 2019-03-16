const env = process.env.NODE_ENV || 'development';

if(env === 'development'){
  const configs = require('./config.json')[env];
  Object.keys(configs).forEach(key => process.env[key] = configs[key])
}

{/*
    "development": {
      "PORT": 3000,
      "MONGODB_URI": "mongodb://localhost:27017/diyardb",
      "JWT_KEY": "KEY HERE",
      "HMAC_KEY": "KEY HERE"
    }
*/}