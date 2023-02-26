// NightTable, LLC has been granted a license by John Nydam
// to use this document and the information contained in it
// for business objectives pertinent to the company.
// It must not be copied, duplicated, or used in any manner,
// or transmitted to others without the written consent of John Nydam.
// It must be returned to John Nydam when its authorized use is terminated.

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require("mongoose");
const socketio = require("socket.io");
const cors = require("cors");
const bodyParser = require("body-parser");
const {
  configureTestInterfaceRoutes,
} = require("./testinterfaceroutes/TestInterfaceUtil");
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");
const methodOverride = require("method-override");
const multer = require("multer");
const { getFileStream } = require("./s3");

const authControllerRoutes = require("./routes/AuthController");
const eventControllerRoutes = require("./routes/EventController");
const utilControllerRoutes = require("./controllers/UtilController");
const clubControllerRoutes = require("./routes/ClubController");
const tableConfigurationControllerRoutes = require("./routes/TableConfigurationController");
const userControllerRoutes = require("./routes/UserController");
const tableRequestControllerRoutes = require("./routes/TableRequestController");
const messageChatControllerRoutes = require("./routes/MessageChatController");
const transactionControllerRoutes = require("./routes/TransactionController");
const messageControllerRoutes = require("./routes/MessageController");
const photoControllerRoutes = require("./routes/PhotoController");
const roomControllerRoutes = require("./routes/RoomController");
const fileUploadRoutes = require("./routes/uploadFileControllers");
const representativeControllerRoutes = require("./routes/RepresentativeController");
const jwt = require("jsonwebtoken");
let socketNameSpaces = ["tableReqNameSpace", "messageChatNamespace"];
let userModel = require("./models/User");
let representativeModel = require("./models/Representative");
// comment to trigger build

require("dotenv").config();

// app.use(express.json());
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer().any());
app.use(flash());
// app.use(session({
//   secret: process.env.SESSION_SECRET,
//   resave: false,
//   saveUninitialized: false
// }))
// commented above code and added below code to run in local
app.use(
  session({
    secret: process.env.AUTH_ACCESS_TOKEN_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride("_method"));

app.use("/api/auth", authControllerRoutes);
app.use("/api/util", utilControllerRoutes);
app.use("/api/clubs", clubControllerRoutes);
app.use("/api/tableconfigurations", tableConfigurationControllerRoutes);
// app.use("/api/tablerequests", tableRequestControllerRoutes);
// app.use("/api/events", eventControllerRoutes);
app.use("/api/users", userControllerRoutes);
app.use("/api/events", eventControllerRoutes);
// app.use("/api/messagechats", messageChatControllerRoutes);
// app.use("/api/transactions", transactionControllerRoutes);
// app.use("/api/messages", messageControllerRoutes);
// app.use("/api/photos", photoControllerRoutes);
// app.use("/api/rooms", roomControllerRoutes);
app.use("/api/fileUpload", fileUploadRoutes);
app.use("/api/representatives", representativeControllerRoutes);

configureTestInterfaceRoutes(app);

// app.get("/images/:key", (req, res) => {
//   const key = req.params.key;
//   const readStream = getFileStream(key);

//   readStream.pipe(res);
// });

//checking status of token and if the user is login
app.get("/session", async (req, res, next) => {
  try {
    let token1 = req.header("Authorization");
    if (!token1)
      return res
        .status(400)
        .send({ status: false, message: "token must be present" });
    token1 = token1.split(" ");
    const token = token1[1];
    let secretString = "nightclubapp";
    if (req.body.isRepresentative) {
      secretString = "nightclubappforrepresentative";
    }
    let decodedToken = jwt.verify(token, secretString);
    if (!decodedToken) {
      return res.status(403).send({ status: false, message: "Bad token" });
    }
    let id = decodedToken.userId;
    let user;
    if (req.body.isRepresentative) {
      user = await representativeModel.findOne({ _id: id }).populate("clubPrivileges.club clubPrivileges.privileges").lean();
      if(!user) return res.status(404).send({status:false, message: "not found."})
    } else {
      user = await userModel.findOne({ _id: id }).lean();
      if(!user) return res.status(404).send({status:false, message: "not found."})
    }

    // let loggedInUser = await user.findById(decodedToken.userId);
    return res.status(200).send({ status: true, message: "success", loggedInPerson: user });
    // console.log(loggedInUser);
    // req.loggedUser = decodedToken.userId;
  } catch (error) {
    return res.status(401).send({ status: false, message: error.message });
  }
});

app.get("/", (req, res) => {
  res.send("You reached the mobile server api");
});

const serverInstance = app;

let listenedServerInstance;
let io;

if (process.env.NODE_ENV !== "test") {
  listenedServerInstance = app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });

  io = socketio(listenedServerInstance);

  io.on("connect", (socket) => {
    console.log("Congratulations, you connected to the socket server");
    console.log(`The socket id is ${socket.id}`);
  });

  io.of("/tableReqNameSpace").on("connect", (socket) => {
    // code which will handle various table request namespace
    //
    //

    console.log(`You connected to the table request namespace`);

    socket.emit(
      "onTableReqConnectionResponse",
      "You just connected to the table request namespace"
    );
  });

  io.of("/messageChatNameSpace").on("connect", (socket) => {
    // code which will handle various message chat namespaces
    //
    //

    console.log(`You connected to the message chat namespace`);

    socket.emit(
      "onMessageChatConnectionResponse",
      "You just connected to the message chat namespace"
    );
  });
}

const mongooseConnection = mongoose
  .connect(
    process.env.DATABASE_URL
      ? process.env.DATABASE_URL
      : "mongodb+srv://joygo34:newpassword45@cluster0.esl77.mongodb.net/test-dev?retryWrites=true&w=majority"
  )
  .then((res) => {
    console.log("Database connection successfully setup");
  })
  .catch((err) => {
    console.log(err);
    console.log("Looks like mongoose had an issue setting up");
  });

exports.app = serverInstance;
exports.mongooseConnection = mongooseConnection;
