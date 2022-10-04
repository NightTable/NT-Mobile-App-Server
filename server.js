// NightTable, LLC has been granted a license by John Nydam 
// to use this document and the information contained in it 
// for business objectives pertinent to the company. 
// It must not be copied, duplicated, or used in any manner, 
// or transmitted to others without the written consent of John Nydam. 
// It must be returned to John Nydam when its authorized use is terminated. 

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const socketio = require('socket.io');
const cors = require('cors');
const bodyParser = require("body-parser")
const { configureTestInterfaceRoutes } = require('./testinterfaceroutes/TestInterfaceUtil');
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')

const { getFileStream } = require('./s3');

const authControllerRoutes = require('./routes/AuthController');
const eventControllerRoutes = require('./routes/EventController');
const utilControllerRoutes = require('./controllers/UtilController');
const clubControllerRoutes = require('./routes/ClubController');
const tableConfigurationControllerRoutes = require('./routes/TableConfigurationController');
const userControllerRoutes = require('./routes/UserController');
const tableRequestControllerRoutes = require('./routes/TableRequestController');
const messageChatControllerRoutes = require('./routes/MessageChatController');
const transactionControllerRoutes = require('./routes/TransactionController');
const messageControllerRoutes = require('./routes/MessageController')
const photoControllerRoutes = require('./routes/PhotoController');
const roomControllerRoutes = require('./routes/RoomController');

let socketNameSpaces = ['tableReqNameSpace', 'messageChatNamespace'];

// comment to trigger build

require('dotenv').config();

app.use(express.json());
app.use(cors());

app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))

app.use('/api/auth', authControllerRoutes);
app.use('/api/util', utilControllerRoutes);
app.use('/api/clubs', clubControllerRoutes);
app.use('/api/tableconfigurations', tableConfigurationControllerRoutes);
app.use('/api/tablerequests', tableRequestControllerRoutes);
app.use('/api/events', eventControllerRoutes);
app.use('/api/users', userControllerRoutes);
app.use('/api/events', eventControllerRoutes);
app.use('/api/messagechats', messageChatControllerRoutes);
app.use('/api/transactions', transactionControllerRoutes);
app.use('/api/messages', messageControllerRoutes);
app.use('/api/photos', photoControllerRoutes);
app.use('/api/rooms', roomControllerRoutes);


configureTestInterfaceRoutes(app);


app.get('/images/:key', (req, res) => {

  const key = req.params.key;
  const readStream = getFileStream(key);

  readStream.pipe(res);

});



app.get('/', (req, res) => {
  res.send('You reached the mobile server api');
});

const serverInstance = app;

let listenedServerInstance;
let io;

if (process.env.NODE_ENV !== 'test') {

  listenedServerInstance = app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });

  io = socketio(listenedServerInstance);

  io.on('connect', (socket) => {

    console.log("Congratulations, you connected to the socket server");
    console.log(`The socket id is ${socket.id}`);


  });



  io.of('/tableReqNameSpace').on('connect', (socket) => {



      // code which will handle various table request namespace
      //
      //

      console.log(`You connected to the table request namespace`);

      socket.emit('onTableReqConnectionResponse', "You just connected to the table request namespace");


  });

  io.of('/messageChatNameSpace').on('connect', (socket) => {



    // code which will handle various message chat namespaces
    //
    //

    console.log(`You connected to the message chat namespace`);

    socket.emit('onMessageChatConnectionResponse', "You just connected to the message chat namespace");


});




}


const mongooseConnection = mongoose.connect(process.env.DATABASE_URL ? process.env.DATABASE_URL : 'mongodb+srv://joygo34:newpassword45@cluster0.esl77.mongodb.net/test-dev?retryWrites=true&w=majority').then((res) => {
      console.log("Database connection successfully setup");
  })
  .catch((err) => {

      console.log(err);
      console.log("Looks like mongoose had an issue setting up");
  });

exports.app = serverInstance;
exports.mongooseConnection = mongooseConnection;
