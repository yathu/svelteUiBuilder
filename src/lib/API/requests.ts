import type { ChatItem } from "../../constants/storeTypes";

export const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

export const newChat = async (promt: string):Promise<ChatItem> => {
  const response = await fetch(`${API_BASE_URL}/newChat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message: promt }),
  });
  return response.json();
}