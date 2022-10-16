export default function Card(props) {
  return (
    <div className="card">
      <p>{props.question}</p>
      <div className="option-container">
        {props.options.map((op) => {
          let clr = props.submit ? "grey" : "";
          let border = "solid 1px #293264";
          let bg;
          if (props.submit) {
            if (op.selected && op.correct) {
              bg = "#94D7A2";
              border = "none";
              clr = "#020d46";
            } else if (op.selected) {
              bg = "#F8BCBC";
              border = "none";
            } else if (op.correct) {
              bg = "#94D7A2";
              border = "none";
            }
          } else if (op.selected) {
            bg = "#D6DBF5";
            border = "none";
          }
          const style = {
            backgroundColor: bg,
            border: border,
            color: clr,
          };
          return (
            <button
              className="option"
              style={style}
              onClick={(e) => props.handleSelect(e, props.id, op.value)}
            >
              {op.value}
            </button>
          );
        })}
      </div>
    </div>
  );
}
