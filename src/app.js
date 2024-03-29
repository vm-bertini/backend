if (process.env.NODE_ENV !== 'production'){
  require('dotenv').config()
}


import express from 'express';
import routes from './routes';
import flash from 'express-flash'
import session from 'express-session'
import passport from 'passport';
import methodOverride from 'method-override'
import cors from 'cors'
import cookieParser from 'cookie-parser';

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(cors({origin: process.env.client,credentials: true,}))
    this.server.use(express.json());
    this.server.use(express.urlencoded({extended: true}))
    this.server.use(flash())
    this.server.use(cookieParser())
    this.server.use(session({
      secret: process.env.secret,
      resave: false,
      saveUninitialized: false
    }))
    this.server.use(passport.initialize())
    this.server.use(passport.session())
    this.server.use(methodOverride('_method'))
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;