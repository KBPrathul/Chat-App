import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useGetConversations = () => {
	const [loading, setLoading] = useState(false);
	const [conversations, setConversations] = useState([]);

	// This will run once when the component mounts, fetching the list of conversations (users) from the backend API.
	useEffect(() => {
		const getConversations = async () => {
			setLoading(true);
			try {
				// Get request to the backend to fetch the list of conversations (users). No need of any options as its only a get request.
				const res = await fetch("/api/users");
				const data = await res.json();
				if (data.error) {
					throw new Error(data.error);
				}
				setConversations(data);
			} catch (error) {
				toast.error(error.message);
			} finally {
				setLoading(false);
			}
		};

		getConversations();
	}, []);

	return { loading, conversations };
};
export default useGetConversations;