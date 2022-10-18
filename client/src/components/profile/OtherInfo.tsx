import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getOtherInfo } from '../../redux/actions/profileAction';
import { RootState } from '../../redux/store';
import { IUser } from '../../utils/types';
import Loading from '../global/Loading';

interface IProps {
	id?: string;
}

const OtherInfo: React.FC<IProps> = ({ id }) => {
	const [other, setOther] = useState<IUser>();
	const { otherInfo } = useSelector((state: RootState) => state);
	const dispatch = useDispatch();

	useEffect(() => {
		if (!id) return;
		if (otherInfo.every((user) => user._id !== id)) {
			dispatch(getOtherInfo(id));
		} else {
			const newUser = otherInfo.find((user) => user._id === id);
			if (newUser) setOther(newUser);
		}
	}, [id, otherInfo, dispatch]);
	if (!other) return <Loading />;
	return (
		<div className='profile_info text-center rounded'>
			<div className='info_avatar'>
				<img src={other.avatar} alt='avatar' />
			</div>

			<h2 className='text-uppercase text-danger'>{other.role}</h2>

			<div>
				이름: <span className='text-info'>{other.name}</span>
			</div>

			<div>이메일 / 전화번호</div>
			<span className='text-info'>{other.account}</span>

			<div>
				가입날짜:{' '}
				<span style={{ color: '#ffc107' }}>
					{new Date(other.createdAt).toLocaleString()}
				</span>
			</div>
		</div>
	);
};

export default OtherInfo;
