export const checkImage = (file: File) => {
	let err = '';
	if (!file) return (err = '파일이 존재하지 않습니다.');

	if (file.size > 1024 * 1024)
		// 1mb
		err = '최대 이미지 사이즈는 1mb 입니다.';

	return err;
};

export const imageUpload = async (file: File) => {
	const formData = new FormData();
	formData.append('file', file);
	formData.append('upload_preset', 'xvkh5tk1');
	formData.append('cloud_name', 'dvp4193v8');

	const res = await fetch('https://api.cloudinary.com/v1_1/dvp4193v8/upload', {
		method: 'POST',
		body: formData,
	});

	const data = await res.json();
	return { public_id: data.public_id, url: data.secure_url };
};
