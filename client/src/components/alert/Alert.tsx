import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import Loading from './Loading';
import Toast from './Toast';

const Alert = () => {
	const { alert } = useSelector((state: RootState) => state);
	return (
		<div>
			{alert.loading && <Loading />}
			{alert.errors && (
				<Toast title='Errors' body={alert.errors} bgColor='bg-danger' />
			)}
			{alert.success && (
				<Toast title='Success' body={alert.success} bgColor='bg-success' />
			)}
		</div>
	);
};

export default Alert;
