import { useState } from "react";
import { crateFeedbackPath, feedbackData } from "../api/feedback";
const FeedbackPage = (props) => {
  const [feedbackData, setFeedbackData] = useState();

  const loadFeedBackDetail = (id) => {
    fetch(`/api/${id}`)
      .then((res) => res.json)
      .then((data) => {
        setFeedbackData(data.feedback);
      });
  };
  return (
    <>
      {feedbackData && <p>{feedbackData.email}</p>}
      <ul>
        {props.FeedbackItems.map((item) => (
          <li key={item.id}>
            {item.text}
            <button onClick={() => loadFeedBackDetail(ietm.id)}>
              Show Detail
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};
export async function getStaticProps() {
  const data = feedbackData(crateFeedbackPath());
  return {
    props: {
      FeedbackItems: data,
    },
  };
}

export default FeedbackPage;
