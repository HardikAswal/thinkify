import styled from 'styled-components';
import colors from '../../@constants/colors';

const Container = styled.div`
  background: ${colors.White};
  border: 1px solid ${colors.MediumGrey};
  border-radius: 10px;
  width: 100%;
  box-sizing: border-box;

  &:hover {
    border: 1px solid ${colors.Pink};
    border-radius: 10px;
    box-sizing: border-box;
  }
`;

interface IProps {
  children: React.ReactNode;
}

const BaseCard = ({ children }: IProps) => {
  return <Container>{children}</Container>;
};

export default BaseCard;
