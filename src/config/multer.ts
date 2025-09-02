import multer from "multer";
import path from "path";
import fs from "fs";

const uploadDir = path.join(process.cwd(), "uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const baseName = path.basename(file.originalname, ext);

    const safeName = baseName
      .toLowerCase()
      .replace(/\s+/g, "_")
      .replace(/[^a-z0-9_.-]/g, "");

    cb(null, `${safeName}_${Date.now()}${ext}`);
  },
});


export const upload = multer({ storage });

export const deleteFile = (fileUrl: string) => {
  if (!fileUrl) return;

  const filePath = path.join(process.cwd(), "uploads", path.basename(fileUrl));

  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    console.log(`Archivo eliminado: ${filePath}`);
  }
};
