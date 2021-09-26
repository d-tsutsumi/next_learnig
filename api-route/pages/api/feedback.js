import path from "path";
import fs from "fs";

export const crateFeedbackPath = () => {
  return path.join(process.cwd(), "data", "feedback.json");
};

export const feedbackData = (filePath) => {
  const fileData = fs.readFileSync(filePath);
  return JSON.parse(fileData);
};
const handler = (req, res) => {
  if (req.method === "POST") {
    const email = req.body.email;
    const feedbackText = req.body.text;
    const newFeedback = {
      id: new Date().toISOString(),
      email,
      text: feedbackText,
    };
    const data = feedbackData(crateFeedbackPath());
    data.push(newFeedback);
    fs.writeFileSync(filePath, JSON.stringify(data));
    res.status(201).json({
      message: "Success",
      feedback: newFeedback,
    });
  } else {
    const data = feedbackData(crateFeedbackPath());
    res.status(200).json({
      feedback: data,
    });
  }
};

export default handler;
