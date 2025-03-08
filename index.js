import { config } from "dotenv";
import { initServer } from "./configs/server.js";
import { categoryDefault } from "./src/category/category.controller.js";

config();
initServer();
categoryDefault();