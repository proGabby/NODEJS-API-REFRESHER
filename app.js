require('dotenv').config();
require('express-async-errors'); //middleware to jandle all try/catch errors

const express = require('express');
const app = express();


// require database
const connectDB = require('./db/connect');

//get routes
const authRouter = require('./routes/authRoutes');

const cookieParser = require('cookie-parser'); //to get cookie from frontend

//get middlewares
const notFoundMiddleware = require('./middlewares/not-found');
const errorHandlerMiddleware = require('./middlewares/error-handler');


//use middlewares
app.use(express.json());

//use to get the cookies coming back from the browser.... cookies available on req.cookies or req.signedCookies 
app.use(cookieParser(process.env.JWT_SECRET));


app.use('/api/v1/auth', authRouter);



app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware); 


const port = process.env.PORT || 500;
const start = async () => {
    try {
     await connectDB(process.env.MONGO_URL);
      app.listen(port, () =>
        console.log(`Server is listening on port ${port}...`)
      );
    } catch (error) {
      console.log(error);
    }
  };

start();