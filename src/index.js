import app from './app';
import './database';
import express from 'express';
import {engine} from 'express-handlebars';
import path from 'path';
import session from 'express-session';
import methodOverride from 'method-override';
import flash from 'connect-flash';
import passport from 'passport';
import morgan from 'morgan';
import MongoStore from 'connect-mongo';
import config from './config';
import { createAdminUser } from './libs/createUser';
import indexRoutes from './routes/index.routes';
import notesRoutes from './routes/notes.routes';
import userRoutes from './routes/users.routes';
app=express();
createAdminUser();
//settings
app.set('port', config.PORT);
app.set('views', path.join(__dirname,'views'));
app.engine(
    '.hbs',
    engine({
        defaultLayout:'main',
        layoutsDir:path.join(app.set('views','layouts')),
        partilasDir:path.join(app.get('views','partials')),
        extname:'.hbs',
    })
);
app.set('view engine', '.hbs');
//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(methodOverride('_method'));
app.use(
    session({
        secret:'secret',
        resave:' true',
        saveUninitialized:true,
        store:MongoStore.create(
            {mongoUrl:config.MONGODB_URI}
        )
    })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
//global variables
app.use((req,res,next)=>{
    res.locals.success_msg=req.flash('success_msg');
    res.locals.error_msg=req.flash('error-msg');
    res.locals.error=req.flash('error');
    res.locals.user=req.user||null;
    next();
});
//routes
app.use(indexRoutes);
app.use(userRoutes);
app.use(notesRoutes);
app.use(express.static(
    path.join(__dirname,'public')
));
app.use((req,res)=>{
    res.render('404')
});
app.listen(app.get('port'));
console.log('Server on port ', app.get('port'));
console.log('Enviroment: ', process.env.NODE_ENV);