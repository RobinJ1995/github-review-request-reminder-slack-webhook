import { checkNotEmpty } from "./utils.js";

export const AUTH_USER = checkNotEmpty(process.env.AUTH_USER);
export const AUTH_PASSWORD = checkNotEmpty(process.env.AUTH_PASSWORD);
export const AUTH_HEADERS = {
    'Authorization': 'Basic ' + Buffer.from(`${AUTH_USER}:${AUTH_PASSWORD}`).toString('base64')
};
export const BASE_HEADERS = {
    'Accept': 'application/json',
    ...AUTH_HEADERS
};

export const GITHUB_API_BASE_URL = 'https://api.github.com/';
export const SLACK_WEBHOOK_URL = checkNotEmpty(process.env.SLACK_WEBHOOK_URL);

export const USERNAME_MAPPING = Object.fromEntries(checkNotEmpty(process.env.USERS)
    .split(',')
    .map(x => x.trim())
    .map(mapping => {
        if (!mapping.includes(':')) {
            return [mapping, null];
        }

        const [githubUsername, slackUsername] = mapping.split(':', 2);
        return [githubUsername, slackUsername];
    }));
export const GITHUB_USERNAMES = Object.keys(USERNAME_MAPPING);