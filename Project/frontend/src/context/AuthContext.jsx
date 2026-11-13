import { createContext, useContext, useState } from "react";


//useContext hook is used to share data across entire component tree without having to pass props down manually (Prop drilling) at every level. It allows you to create a context (like a global variable) that can be accessed by any component that is wrapped in the corresponding provider.

/*
The Context API consists of three main parts:
createContext: Creates the "Radio Station."
useContext: The "Radio Receiver" used by a component to listen to the signal.
Provider: The "Tower" that broadcasts the signal to its children.
*/

// This initializes the "Store." Imagine it as a container that will hold your authentication data (authUser) and the function to change it (setAuthUser). It starts out empty until we give it a value.
export const AuthContext = createContext();

// It is a custom hook. Instead of writing useContext(AuthContext) in every file, you created a shortcut. Now, any component can simply call const { authUser } = useAuthContext(); to see if someone is logged in.
export const useAuthContext = () => {
	return useContext(AuthContext);
};

/*
This is a Wrapper Component. It uses a special value prop to broadcast the data to any component inside it.
{ children }: This is a React prop that represents whatever is nested inside the provider. By wrapping your entire <App /> with this, every component in your app becomes a "child."
localStorage: The code checks your browser's local storage. This is why you don't get logged out when you hit "Refresh"—the state re-initializes itself by reading the "chat-user" string saved on your hard drive.
*/
export const AuthContextProvider = ({ children }) => {
	// JSON.parse convert the string into an object. If there is no "chat-user" in localStorage, it will return null. This way, we can persist the user's authentication state across page refreshes.
	const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem("chat-user")) || null);

	// Now we are able to use authUser and setAuthUser in any component that is wrapped by AuthContextProvider. This is very useful for managing the authentication state of the user throughout the application using useAuthContext.
	return <AuthContext.Provider value={{ authUser, setAuthUser }}>{children}</AuthContext.Provider>;
};