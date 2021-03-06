import express from "express";
import multer from "multer";
import { uploadFile } from "../s3.js";
import { unlinkFile } from "../middleware/unlinkFile.js";

const router = express.Router();

const upload = multer({
	dest: function (req, res, cb) {
		cb(null, `uploads/`);
	},
});

router.post("/:carNumber", upload.single("image"), async (req, res) => {
	const file = req.file;

	const result = await uploadFile(file);
	await unlinkFile(file.path);
	res.send(`${result.Location}`);
});

export default router;
