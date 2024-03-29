import express, { Application, Request, Response } from "express";
import userHandler from "./handlers/users/userHandler";
import productHandler from "./handlers/products/productHandler";
import validattorInit from "./init/validation";
import ordersHandler from "./handlers/orders/ordersHandler";
import Cors from "cors";

const corsOption = {
    origin: ["http://localhost:5173", "http://storefrontfront.s3-website-us-east-1.amazonaws.com"],
    // origin: "*",
};
const App: Application = express();
const port = process.env.PORT || 3000;

App.listen(port, (): void => {
    console.log(`\nApplication started in http://localhost:${port}`);
    validattorInit();
});

App.use(express.json());

App.use(Cors(corsOption));

App.get("/", (request: Request, response: Response): void => {
    response.send("welcome ");
});

userHandler(App);
productHandler(App);
ordersHandler(App);
export default App;
