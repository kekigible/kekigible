import multer from "multer";
import path from "path";

// const nftStorage = multer.diskStorage({
//   destination: function (request, file, callback) {
//     console.log("Current directory:", __dirname);
//     // callback(null, "upload");
//     // callback(null, "server/public/uploads/nft");
//   },
//   filename: function (request, file, callback) {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     // callback(null, file.fieldname + "-" + uniqueSuffix);
//   },
// });

const nftStorage = multer.memoryStorage();

const nftUpload = multer({ storage: nftStorage });

export { nftUpload };
