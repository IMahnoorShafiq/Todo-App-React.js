
import React from "react";

import TodoApp from "./Todo";
import { ThemeProvider } from "./ThemeContext";

const App = () => (
  <ThemeProvider>
    <TodoApp />
  </ThemeProvider>
);

export default App;
