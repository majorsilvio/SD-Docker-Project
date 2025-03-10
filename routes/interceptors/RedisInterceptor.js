const redis = require("../../util/redis");

const redisInterceptor = async (req, res, next) => {

  try {
    console.log("Checking Redis for user data...");
    
    const cachedData = await redis.get(req.originalUrl);

    if (cachedData) {
      console.log("Cache hit");
      return res.json(JSON.parse(cachedData));
    }

    console.log("Cache miss");
    next();
  } catch (error) {
    console.error("Error checking Redis:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


module.exports = redisInterceptor
