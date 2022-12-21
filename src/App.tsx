import { useState } from "react";
import "./styles.css";
import { ObserveListElement } from "./ObserveListElement";
import { data, prepareAnalyticPayload, data1 } from "./trash";
import tracking from "./tracking";

export default function App() {
  const [state, setState] = useState(data);
  const analyticCallback = (arg: number[], arg2) => {
    console.log(arg, arg2);
  };

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <button
        onClick={() => {
          setState(data1);
        }}
      >
        add new elements
      </button>
      <div>
        <ObserveListElement callback={analyticCallback}>
          {state.map((item, i) => {
            return (
              <div key={item.id} className="box">
                {item.name}
              </div>
            );
          })}
        </ObserveListElement>
      </div>
    </div>
  );
}
