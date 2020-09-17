import * as express from "express";
import routeLoader from "./loaders/routeLoader";
import Message from "./services/Message";
import * as bodyParser from "body-parser";
import * as swaggerUi from "swagger-ui-express";
import { swaggerDocument } from "./swagger/swagger";
import { handleError } from "./middlewares/handlers";

const PORT = process.env.PORT || 3000;

let app: express.Application = express();

global["messageService"] = new Message(); // Instantiate the message service and make it available globally.

app.use(bodyParser.json());
app = routeLoader(app);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(handleError);
app.listen(PORT);
