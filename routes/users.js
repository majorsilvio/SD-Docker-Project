const controller = require("../controllers/users");
const router = require("express").Router();
const redisInterceptor = require("./interceptors/RedisInterceptor");

// CRUD Routes /users
router.get("/", redisInterceptor, controller.getUsers); // /users
router.get("/:userId", redisInterceptor, controller.getUser); // /users/:userId
router.post("/", controller.createUser); // /users
router.put("/:userId", controller.updateUser); // /users/:userId
router.delete("/:userId", controller.deleteUser); // /users/:userId

module.exports = router;
