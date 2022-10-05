import styled from 'styled-components';

const Header = styled.div`
	position: relative;
	min-height: calc(100vh - 70px);
`;

const Title = styled.h2`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	font-size: 30px;
`;

const NotFound = () => {
	return (
		<Header>
			<Title>404 | Not Found</Title>
		</Header>
	);
};

export default NotFound;
