export interface ChatItem {
	id: number;
	name: string;
	conversations:Conversations[];
}

export interface Conversations{
	version: number;
	conversation: Conversation[];
}

export interface Conversation {
	role: string;
	content: Content;
}
export interface Content {
	message?: string;
	html?: string;
}
