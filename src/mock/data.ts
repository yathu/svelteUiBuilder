import type { ChatItem } from '../constants/storeTypes';

export const chats: ChatItem[] = [
	{
		id: 4,
		name: 'Next js standalone build',
		conversations: [
			{
				role: 'user',
				content: {
					message: 'How to create a standalone build in next js?',
					html: ''
				}
			},
			{
				role: 'assistant',
				content: {
					message:`<p>To deploy Payload CMS on Vercel, follow these steps:</p>\n<ol>\n  <li><b>Create a Vercel Account</b> at <a href='https://vercel.com/signup' target='_blank'>vercel.com</a></li>\n  <li><b>Install Vercel CLI</b>:</li>\n  <pre><code class='language-bash'>npm install -g vercel</code></pre>\n  <li><b>Initialize Your Project</b> in your project directory.</li>\n  <li><b>Configure Environment Variables</b> in the Vercel dashboard.</li>\n  <li><b>Create a <code>vercel.json</code> file</b>:</li>\n  <pre><code class='language-json'>{\n  \"version\": 2,\n  \"builds\": [{\"src\": \"package.json\", \"use\": \"@vercel/node\"}],\n  \"routes\": [{\"src\": \"/(.*)\", \"dest\": \"/index.js\"}]\n}</code></pre>\n  <li><b>Deploy Your Project</b>:</li>\n  <pre><code class='language-bash'>vercel</code></pre>\n  <li><b>Access Your Site</b> using the provided URL.</li>\n</ol>`,						
					html: `<div class="mx-auto max-w-sm rounded-xl bg-gray-50 p-6 text-center shadow-md">
									<h2 class="mb-2 text-xl font-bold">Card Title</h2>
									<p class="text-gray-600">This is a simple card made with Tailwind CSS. It's clean, minimal, and fully responsive.</p>
								</div>`
				}
			}
		]
	},
	{
		id: 7,
		name: 'Payload CMS react',
		conversations: [
			{
				role: 'user',
				content: {
					message: 'How to deploy payload cms on vercel?',
					html: ''
				}
			},
			{
				role: 'assistant',
				content: {
					message:`<p>To deploy Payload CMS on Vercel, follow these steps:</p>\n<ol>\n  <li><b>Create a Vercel Account</b> at <a href='https://vercel.com/signup' target='_blank'>vercel.com</a></li>\n  <li><b>Install Vercel CLI</b>:</li>\n  <pre><code class='language-bash'>npm install -g vercel</code></pre>\n  <li><b>Initialize Your Project</b> in your project directory.</li>\n  <li><b>Configure Environment Variables</b> in the Vercel dashboard.</li>\n  <li><b>Create a <code>vercel.json</code> file</b>:</li>\n  <pre><code class='language-json'>{\n  \"version\": 2,\n  \"builds\": [{\"src\": \"package.json\", \"use\": \"@vercel/node\"}],\n  \"routes\": [{\"src\": \"/(.*)\", \"dest\": \"/index.js\"}]\n}</code></pre>\n  <li><b>Deploy Your Project</b>:</li>\n  <pre><code class='language-bash'>vercel</code></pre>\n  <li><b>Access Your Site</b> using the provided URL.</li>\n</ol>`,						
					html: `<button class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
									Click Me
								</button>`
				}
			}
		]
	}
];
