const { authJwt } = require("../middlewares");
const controller = require("../controllers/campaign.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );

        next();
    });

    app.post("/campaigns", [authJwt.verifyToken], controller.create);
    app.get("/campaigns", [authJwt.verifyToken], controller.findAll);
    app.get("/:id", [authJwt.verifyToken], controller.findOne);
};