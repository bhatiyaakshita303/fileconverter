const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

const imageRoutes = require("./routes/image.routes");
const videoRoutes = require("./routes/video.routes");
const pdfRoutes = require("./routes/pdf.routes");
const audioRoutes = require("./routes/audio.routes");

app.use(express.json());
app.use("/api/image", imageRoutes);
app.use("/api/video", videoRoutes);
app.use("/api/pdf", pdfRoutes);
app.use("/api/audio", audioRoutes);

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
