import express from "express";
import { engine } from "express-handlebars";
import bodyParser from "body-parser";
// import phoneBill from "./factory-function/phoneBill.js";
import flash from "connect-flash";
import session from "express-session";
import pgPromise from "pg-promise";
import query from "./service/query.js";

//import routes
import main from './routes/route.js'

const pgp = pgPromise();

// should we use a SSL connection
let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
  useSSL = true;
}
// which db connection to use
const connectionString =
  process.env.DATABASE_URL ||
  "postgres://pyvwfhsv:ph_wln_HHzODawXJ2e1VwenZFE4zxQ70@silly.db.elephantsql.com/pyvwfhsv?ssl=true"

const database = pgp(connectionString);
const data = query(database);

//factory function
// const phoneBillFunction = phoneBill();
//route
const mainRoute = main(data)

const app = express();
app.use(
  session({
    secret: "phone bill",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(flash());
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(function (req, res, next) {
  res.locals.messages = req.flash();
  next();
});

app.get('/', mainRoute.getMainRoute)
app.post('/', mainRoute.postCalculateBill)
app.get('/price_plans', mainRoute.getPricePlans)
app.get('/price_plans:id', mainRoute.getPricePlansId)
app.get("/link_user", mainRoute.getLinkUser);
app.post('/link_user', mainRoute.postLinkUser)


const PORT = process.env.PORT || 3007;
app.listen(PORT, function () {
  console.log("App started at port:", PORT);
});
