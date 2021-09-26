import { useRef, useState } from "react";

function HomePage(props) {
  const [item, setItem] = useState([]);
  const emailRef = useRef();
  const feedbackRef = useRef();

  const submitFormHandler = (e) => {
    e.preventDefault();

    const enterEmail = emailRef.current.value;
    const enterdFeedback = feedbackRef.current.value;
    fetch("/api/feedback", {
      method: "POST",
      body: JSON.stringify({
        email: enterEmail,
        text: enterdFeedback,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };
  const loadFeedbackHandler = () => {
    fetch("/api/feedback")
      .then((res) => res.json())
      .then((data) => setItem(data.feedback));
  };
  return (
    <div>
      <h1>The Home Pages</h1>
      <form onSubmit={submitFormHandler}>
        <div>
          <label htmlFor="email">E-mail</label>
          <input type="email" id="email" ref={emailRef} />
        </div>
        <div>
          <label htmlFor="feedback">feedback</label>
          <textarea rows="5" id="feedback" ref={feedbackRef} />
        </div>
        <button>send feedback</button>
      </form>
      <hr />
      <button onClick={loadFeedbackHandler}>Load FeedBack</button>
      <ul>
        {item.map((item) => (
          <li key={item.id}>{item.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default HomePage;
