import styled from 'styled-components';
import colors from '../../@constants/colors';
import Typography from '../Typography';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: ${colors.Pink};
  color: ${colors.LightGrey};
`;

const Avatar = () => {
  return (
    <Container>
      <Typography text="F" size={26} color={colors.LightGrey} />
    </Container>
  );
};

export default Avatar;
