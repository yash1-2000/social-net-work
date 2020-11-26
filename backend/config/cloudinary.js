// const { config, uploader } = require('cloudinary').v2
// // const {uploader,cloudinary } = require("cloudinary").v2;
// const config1 = require("config");
// const cloud_name = config1.get("cloud_name");
// const api_key = config1.get("api_key");
// const api_secret = config1.get("api_secret");

// const cloudinaryConfig = (req, res, next) => {
//   config({
//     cloud_name: cloud_name,
//     api_key: api_key,
//     api_secret: api_secret,
//   });
//   next();
// };
// module.exports = { cloudinaryConfig,uploader  };

const cloudinary = require("cloudinary").v2;

const config = require("config");
const cloud_name = config.get("cloud_name");
const api_key = config.get("api_key");
const api_secret = config.get("api_secret");

cloudinary.config({
  cloud_name: cloud_name,
  api_key: api_key,
  api_secret: api_secret,
});

module.exports = { cloudinary  };
