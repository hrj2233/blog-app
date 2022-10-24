import React, { useCallback, useEffect, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useDispatch } from 'react-redux';
import { alertActions } from '../../redux/reducers/alertReducer';
import { checkImage, imageUpload } from '../../utils/imageUpload';

interface IProps {
	setBody: (value: string) => void;
	body: string;
}

const Quill: React.FC<IProps> = ({ setBody, body }) => {
	const dispatch = useDispatch();
	const quillRef = useRef<ReactQuill>(null);

	const modules = { toolbar: { container } };

	// Custom image
	const handleChangeImage = useCallback(() => {
		const input = document.createElement('input');
		input.type = 'file';
		input.accept = 'image/*';
		input.click();

		input.onchange = async () => {
			const files = input.files;
			if (!files)
				return dispatch(
					alertActions.getAlert({ errors: '파일은 존재하지 않습니다.' })
				);

			const file = files[0];
			const check = checkImage(file);
			if (check) return dispatch(alertActions.getAlert({ errors: check }));

			dispatch(alertActions.getAlert({ loading: true }));
			const photo = await imageUpload(file);

			const quill = quillRef.current;
			const range = quill?.getEditor().getSelection()?.index;
			if (range !== undefined) {
				quill?.getEditor().insertEmbed(range, 'image', `${photo.url}`);
			}

			dispatch(alertActions.getAlert({ loading: false }));
		};
	}, [dispatch]);

	useEffect(() => {
		const quill = quillRef.current;
		if (!quill) return;

		let toolbar = quill.getEditor().getModule('toolbar');
		toolbar.addHandler('image', handleChangeImage);
	}, [handleChangeImage]);

	return (
		<ReactQuill
			theme='snow'
			modules={modules}
			placeholder='내용을 작성해주세요.'
			onChange={(e) => setBody(e)}
			value={body}
			ref={quillRef}
		/>
	);
};

let container = [
	[{ font: [] }],
	[{ header: [1, 2, 3, 4, 5, 6, false] }],
	[{ size: ['small', false, 'large', 'huge'] }], // custom dropdown

	['bold', 'italic', 'underline', 'strike'], // toggled buttons
	['blockquote', 'code-block'],
	[{ color: [] }, { background: [] }], // dropdown with defaults from theme
	[{ script: 'sub' }, { script: 'super' }], // superscript/subscript

	[{ list: 'ordered' }, { list: 'bullet' }],
	[{ indent: '-1' }, { indent: '+1' }], // outdent/indent
	[{ direction: 'rtl' }], // text direction
	[{ align: [] }],

	['clean', 'link', 'image', 'video'],
];

export default Quill;
