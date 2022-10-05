import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, '이름을 입력해주세요.'],
			trim: true,
			maxLength: [20, '이름의 최대 길이는 20글자 입니다.'],
		},
		account: {
			type: String,
			required: [true, '이메일 또는 전화번호를 입력해주세요.'],
			trim: true,
			unique: true,
		},
		password: {
			type: String,
			required: [true, '이메일 또는 패스워드를 입력해주세요.'],
		},
		avatar: {
			type: String,
			default: 'https://www.gravatar.com/avatar?d=mp&f=y',
		},
		role: {
			type: String,
			default: 'user', // admin
		},
		type: {
			type: String,
			default: 'normal',
		},
	},
	{ timestamps: true }
);

export default mongoose.model('User', userSchema);
