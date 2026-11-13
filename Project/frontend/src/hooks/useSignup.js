import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

// react-hot-toast is a library for showing notifications in React apps. It provides a simple API to display toast messages, which are small, temporary pop-up notifications that inform users about the status of an action (e.g., success, error, info).

const useSignup = () => {
	// In this context, the loading state is used to manage the User Experience (UX) during the asynchronous network request. Since talking to a database takes time (anywhere from a few milliseconds to a few seconds), we need a way to track that "waiting" period.
	// Imagine a user clicks the "Sign Up" button, but their internet is slow. They might get impatient and click the button 5 more times. Without loading, you would send 5 separate API requests to your server, potentially creating duplicate users or causing errors. With loading, you can disable the button in your UI while the request is in progress.
	const [loading, setLoading] = useState(false);

	// We are using the setAuthUser function from the AuthContext to update the authentication state of the user after a successful signup. This allows us to keep track of whether the user is logged in or not throughout the application.
	const { setAuthUser } = useAuthContext();

	const signup = async ({ fullName, username, password, confirmPassword, gender }) => {
		const success = handleInputErrors({ fullName, username, password, confirmPassword, gender });
		if (!success) return;

		setLoading(true);
		try {
			const res = await fetch("/api/auth/signup", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ fullName, username, password, confirmPassword, gender }),
			});

			const data = await res.json();
			if (data.error) {
				throw new Error(data.error);
			}
			// When we refresh page or anything, we shdn't lose the authentication state. So we save the user data in localStorage. This way, when the app initializes, it can check localStorage and set the authUser state accordingly.
			localStorage.setItem("chat-user", JSON.stringify(data));
			// Will make sure the user is sent to the home page after signing up, because in App.jsx we have a condition that checks if authUser exists. If it does, it renders the Home component; if not, it redirects to the login page.
			setAuthUser(data);
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { loading, signup };
};
export default useSignup;

function handleInputErrors({ fullName, username, password, confirmPassword, gender }) {
	// So now we are checking everything both on the client side and the server side. This is a good, because it provides a better user experience (immediate feedback) and also ensures security (server-side validation is crucial to prevent malicious input).
	if (!fullName || !username || !password || !confirmPassword || !gender) {
		toast.error("Please fill in all fields");
		return false;
	}

	if (password !== confirmPassword) {
		toast.error("Passwords do not match");
		return false;
	}

	if (password.length < 6) {
		toast.error("Password must be at least 6 characters");
		return false;
	}

	return true;
}