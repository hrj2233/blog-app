import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { deleteBlog } from '../../redux/actions/blogAction';
import { alertActions } from '../../redux/reducers/alertReducer';
import { RootState } from '../../redux/store';
import { IBlog, IUser } from '../../utils/types';

interface IProps {
	blog: IBlog;
}

const CardHoriz: React.FC<IProps> = ({ blog }) => {
	const { slug } = useParams();
	const { auth } = useSelector((state: RootState) => state);
	const dispatch = useDispatch();

	const handleDelete = () => {
		if (!auth.user || !auth.access_token) return;

		if (slug !== auth.user._id)
			return dispatch(alertActions.getAlert({ errors: '잘못된 인증입니다.' }));

		if (window.confirm('이 게시물을 삭제하시겠습니까?')) {
			dispatch(deleteBlog(blog, auth.access_token));
		}
	};

	return (
		<div className='card mb-3' style={{ minWidth: '260px' }}>
			<div className='row g-0 p-2'>
				<div
					className='col-md-4'
					style={{
						minHeight: '150px',
						maxHeight: '170px',
						overflow: 'hidden',
					}}
				>
					{blog.thumbnail && (
						<>
							{typeof blog.thumbnail === 'string' ? (
								<Link to={`/blog/${blog._id}`}>
									<img
										src={blog.thumbnail}
										className='w-100 h-100'
										alt='thumbnail'
										style={{ objectFit: 'cover' }}
									/>
								</Link>
							) : (
								<img
									src={URL.createObjectURL(blog.thumbnail)}
									className='w-100 h-100'
									alt='thumbnail'
									style={{ objectFit: 'cover' }}
								/>
							)}
						</>
					)}
				</div>

				<div className='col-md-8'>
					<div className='card-body'>
						<h5 className='card-title'>
							<Link
								to={`/blog/${blog._id}`}
								className='text-capitalize text-decoration-none'
							>
								{blog.title}
							</Link>
						</h5>
						<p className='card-text'>{blog.description}</p>
						{blog.title && (
							<div
								className='card-text d-flex justify-content-between
							align-items-center'
							>
								{slug === auth.user?._id && (
									<div style={{ cursor: 'pointer' }}>
										<Link to={`/update_blog/${blog._id}`}>
											<i className='fas fa-edit' title='edit' />
										</Link>

										<i
											className='fas fa-trash text-danger mx-3'
											title='edit'
											onClick={handleDelete}
										/>
									</div>
								)}
								<small className='text-muted'>
									{new Date(blog.createdAt).toLocaleString()}
								</small>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default CardHoriz;
