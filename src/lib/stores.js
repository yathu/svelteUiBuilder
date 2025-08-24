import { writable } from "svelte/store"

export const sidebarOpen = writable(false)
export const settingsOpen = writable(false)
export const apiKey = writable("")
export const chats = writable([
  // { id: 1, name: "Chat 1", active: false },
  // { id: 2, name: "Chat 2", active: false },
  // { id: 3, name: "Chat 3", active: false },
])
export const messages = writable([
  
])
export const activeChat = writable(null)
export const showWelcomeScreen = writable(true)
export const generatedCode = writable(`<button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
  Click me
</button>`)
