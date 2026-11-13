import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext";

/*
<Routes> (The Container)
Acts as a parent wrapper. Its job is to look at all its children (<Route> elements) and find the match for the URL.
It functions similarly to a switch statement in JavaScript.
Once it finds a match, it stops looking and renders only that specific route.

<Route> (The Mapping)
Defines the relationship between a path (the URL) and an element (the React component).
Path: The string that follows your domain (e.g., /about).
Element: The JSX component you want to show when that path is active.
*/

function App() {
	const { authUser } = useAuthContext();
	return (
    // p - padding    h - height and so on. Tailwind CSS is being used for styling in this project.
		<div className='p-4 h-screen flex items-center justify-center'>
			<Routes>
				<Route path='/' element={authUser ? <Home /> : <Navigate to={"/login"} />} />
				<Route path='/login' element={authUser ? <Navigate to='/' /> : <Login />} />
				<Route path='/signup' element={authUser ? <Navigate to='/' /> : <SignUp />} />
			</Routes>
			<Toaster />
		</div>
	);
}

export default App;