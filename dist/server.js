"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const index_1 = __importDefault(require("./app/routes/index"));
const config_1 = __importDefault(require("./app/config/config"));
const models_1 = __importDefault(require("./app/models"));
const app = (0, express_1.default)();
const corsOptions = {
    origin: "http://localhost:8081"
};
app.use((0, cors_1.default)(corsOptions));
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Expose-Headers", "x-total-count");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH");
    res.header("Access-Control-Allow-Headers", "Content-Type,authorization");
    next();
});
app.use(express_1.default.json());
app.use(index_1.default);
models_1.default.sync();
app.get("/", (req, res) => {
    res.json({ message: "Welcome Precampaign!" });
});
const PORT = config_1.default.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
//# sourceMappingURL=server.js.map