import {crateFeedbackPath, feedbackData } from "./feedback"
const handler = (req, res) => {
  const id = req.query.feedbackId;
  const data =feedbackData(crateFeedbackPath());

  const selectedFeedBack = data.find((feedback) => feedback.id === id)
  
  res.status(200).json({
    feedback: selectedFeedBack
  })
}

export default handler;
