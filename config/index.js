if(process.env.NODE_ENV != 'production')
  require('dotenv')
    .config(
      { 
        path: `config/${process.env.NODE_ENV}.env`
      });

console.log('NODE_ENV:', process.env.NODE_ENV)