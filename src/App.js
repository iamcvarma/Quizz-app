import { useEffect, useState } from "react";
import Card from "./Card";
import { nanoid } from "nanoid";
function App() {
  const [start, setStart] = useState(true);
  const [data, setData] = useState([]);
  const [submit, setSubmit] = useState(false);
  const [score, setScore] = useState(0);
  useEffect(() => {
    if (!start) {
      fetch("https://opentdb.com/api.php?amount=5&type=multiple")
        .then((res) => res.json())
        .then((data) => {
          setData(
            data.results.map((obj) => {
              const new_options = obj.incorrect_answers.map((op) => ({
                value: op,
                selected: false,
                correct: false,
              }));
              new_options.splice(Math.floor(Math.random() * 4), 0, {
                value: obj.correct_answer,
                selected: false,
                correct: true,
              });
              return {
                id: nanoid(),
                question: obj.question,
                options: new_options,
              };
            })
          );
        });
    }
  }, [start]);

  function handleSelect(e, id, val) {
    setData((pre) =>
      pre.map((obj) => {
        if (obj.id == id) {
          return {
            ...obj,
            options: obj.options.map((op) =>
              op.value == val
                ? { ...op, selected: !op.selected }
                : { ...op, selected: false }
            ),
          };
        } else {
          return obj;
        }
      })
    );
  }

  function getScore() {
    let score = 0;
    data.forEach((question) => {
      question.options.forEach((op) => {
        if (op.correct && op.selected) {
          score++;
        }
      });
    });
    return score;
  }

  function handleSubmit() {
    if (!submit) {
      setSubmit(true);
      setScore(getScore());
    } else {
      setStart(true);
      setSubmit(false);
      setData([]);
    }
  }

  return (
    <div className="App">
      <main>
        {start ? (
          <>
          
            <h1>Quizzical</h1>
            <h4>Simple Quiz App Made by React</h4>
            <button className="button" onClick={() => setStart(false)}>
              Start Quiz
            </button>
          </>
        ) : (
          <>
            <div className="question-container">
              {data.map((obj) => {
                return (
                  <Card
                    key={obj.id}
                    {...obj}
                    handleSelect={handleSelect}
                    submit={submit}
                  />
                );
              })}
            </div>
            {data.length != 0 && (
              <div className="score-board">
                
                {submit && <p>Score: {score}</p>}
                <button onClick={handleSubmit} className="button">
                  {submit ? "Play Again" : "Sumbit"}
                </button>
                
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default App;
