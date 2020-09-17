import * as express from "express";
import routeLoader from "./loaders/routeLoader";
import Message from "./services/Message";
import Routes from "./routes";
import * as bodyParser from "body-parser";

const PORT = process.env.PORT || 3000;

global["messageService"] = new Message();

let app: express.Application = express();
app.use(bodyParser.json());
app = routeLoader(app);
app.listen(PORT);
