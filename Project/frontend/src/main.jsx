import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import { SocketContextProvider } from "./context/SocketContext.jsx";

// Strictmode is a special component that helps us by telling us about mistakes we have made.
// <> is called a react fragment component.

/*
Reconciliation is the process of making changes in the real DOM, after the process of diffing
When using useState hook onChange, steps are:
1) user types input and setvalue is called
2) state is updated
3) input reads from the state
Strictmode is a special component that tells us about mistakes (wrapped around the app component)
useEffect hook is used when we want to do something outside our react application, like talking to the browser api or make a request to the server. It's generally used inside event handlers.
useRef is used when we directly want to reference the DOM elements
*/

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<BrowserRouter>
			<AuthContextProvider>
				<SocketContextProvider>
					<App />
				</SocketContextProvider>
			</AuthContextProvider>
		</BrowserRouter>
	</React.StrictMode>
);