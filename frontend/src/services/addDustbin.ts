const addDustin = async (dustbin: {
	device_id?: string;
	apartment?: string;
	latitude?: number;
	longitude?: number;
}) => {
	try {
		const response = await fetch(
			`${import.meta.env.VITE_BACKEND_URL}/add-bin`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(dustbin),
			},
		).then((res) => res.json());

		if (response.error) {
			throw new Error(response?.error || 'Failed to add dustbin');
		}

		return response;
	} catch (error: any) {
		if (error.response) {
			throw new Error(error.response.data.error);
		}

		throw new Error(
			error.message || 'An error occurred while adding the dustbin',
		);
	}
};

export default addDustin;
