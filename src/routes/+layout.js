import { error } from '@sveltejs/kit';

export const load = async ({ url, fetch }) => {
	try {
		return {
			path: url.pathname
		}
	}
	catch(err) {
		error(500, err)
	}
};
