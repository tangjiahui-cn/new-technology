import React from "react";
import ReactDOM from "react-dom/client";
// @ts-ignore
const ComponentA = React.lazy(() => import('appA/ComponentA'))

const dom = document.querySelector("#root") as any;
const root = ReactDOM.createRoot(dom);
root.render(<div>
  <h1>我是B</h1>
  <ComponentA />
</div>);
