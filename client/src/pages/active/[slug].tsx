import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
	showErrorMessage,
	showSuccessMessage,
} from '../../components/alert/Alert';
import { postAPI } from '../../utils/fetchData';

const Active = () => {
	const { slug } = useParams();
	const [err, setErr] = useState('');
	const [success, setSuccess] = useState('');

	useEffect(() => {
		if (slug) {
			postAPI('active', { active_token: slug })
				.then((res) => setSuccess(res.data.message))
				.catch((err) => setErr(err.response.data.message));
		}
	}, [slug]);

	return (
		<div>
			{err && showErrorMessage(err)}
			{success && showSuccessMessage(success)}
		</div>
	);
};

export default Active;
