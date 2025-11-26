import { env } from '$env/dynamic/private';
import { json, error, type RequestHandler } from '@sveltejs/kit';
import axios from 'axios';

export const POST: RequestHandler = async ({ request }) => {
	try {
		const body = await request.json();

		// Validate required fields
		if (!body.message) {
			return error(400, { message: 'Message is required' });
		}

		// Get the URL from request headers
		const referer = request.headers.get('referer') || request.headers.get('origin') || 'Unknown';

		// Format the timestamp
		const timestamp = new Intl.DateTimeFormat('en-GB', {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit',
			hour: '2-digit',
			minute: '2-digit',
			second: '2-digit',
			hour12: false
		}).format(new Date());

		// Format the Slack message
		let formattedMessage = '🆘 *New Support Request*\n';
		formattedMessage += `*From:* ${referer}\n\n`;

		if (body.email) {
			formattedMessage += `*Email:* ${body.email}\n\n`;
		}

		formattedMessage += `*Message:*\n${body.message}\n\n`;
		formattedMessage += `*Time:* ${timestamp}`;

		// Call the Slack API
		const response = await axios.post(
			`${env.API_ENDPOINT}/slack/send`,
			{
				message: formattedMessage,
				channel: 'general' // Change this to your preferred Slack channel
			},
			{
				headers: {
					Authorization: `Bearer ${env.INTERNAL_API_KEY}`,
					'Content-Type': 'application/json'
				}
			}
		);

		return json({ success: true, data: response.data });

	} catch (err: any) {
		console.error('Slack support message error:', err.message);

		// Return error to inform the user
		return error(500, { message: 'Failed to send support message' });
	}
};
