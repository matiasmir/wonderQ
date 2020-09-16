import * as express from "express";
import routeLoader from "./loaders/routeLoader";

const PORT = process.env.PORT || 3000;

const app = express();
routeLoader(app);
app.listen(PORT);
