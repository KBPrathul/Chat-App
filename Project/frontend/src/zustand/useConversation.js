import { create } from "zustand";

/*
Zustand is an alternative to Context API for state management in React.
Context is like a megaphone you use to shout information to everyone in a room, while Zustand is like a specialized central database that only sends updates to the people who specifically subscribed to them.

Context: When a value in a Context Provider changes, every component that uses that context re-renders. If your context holds an object with ten different properties and you only update one, every component listening to that context will refresh, even if they only cared about the other nine properties.
Zustand: It uses "Selectors." A component can subscribe to a specific piece of the state. If other parts of the store change, that component will not re-render. This makes Zustand much more efficient for large-scale applications.
*/

/*
1. The create Function
The create function is the heart of Zustand. It creates a Hook (which you’ve named useConversation) that any component in your app can call to access or change the chat data.
The set parameter: This is a built-in function provided by Zustand. You use it to update the values in your store, similar to how you use setState in React.

2. The State Variables (The Data)
The store contains two main pieces of information:
selectedConversation (null): This keeps track of which user you are currently chatting with. When you click on a friend in a sidebar, you’ll update this with that friend's user object.
messages ([ ]): An empty array that will hold the actual chat bubbles (the conversation history) for the currently selected friend.

3. The Actions (The Setters)
In Zustand, the "logic" to change the data lives inside the store itself. This keeps your components clean.
setSelectedConversation: Takes a conversation object and updates the state.
setMessages: Takes an array of new messages (usually fetched from an API) and replaces the old array.
The Syntax: set({ messages }) is shorthand for set({ messages: messages }). Same for set({ selectedConversation }).
*/

const useConversation = create((set) => ({
	selectedConversation: null,
	setSelectedConversation: (selectedConversation) => set({ selectedConversation }),
	messages: [],
	setMessages: (messages) => set({ messages }),
}));

export default useConversation;