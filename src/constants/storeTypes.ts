export interface ChatItem {
	id: number;
	name: string;
	conversations:Conversation[];
}

export interface Conversation {
	role: string;
	content: Content;
}
export interface Content {
	message?: string;
	html?: string;
}
