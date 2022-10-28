import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import OtherInfo from '../../components/profile/OtherInfo';
import UserBlogs from '../../components/profile/UserBlogs';
import UserInfo from '../../components/profile/UserInfo';
import { RootState } from '../../redux/store';

const Profile = () => {
	const { slug } = useParams();
	const { auth } = useSelector((state: RootState) => state);
	return (
		<main className='row mt-3'>
			<div className='col-md-5 mb-3'>
				{auth.user?._id === slug ? <UserInfo /> : <OtherInfo id={slug} />}
			</div>
			<div className='col-md-7'>
				<UserBlogs />
			</div>
		</main>
	);
};

export default Profile;
