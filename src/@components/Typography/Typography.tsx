import styled from 'styled-components';
import colors from '../../@constants/colors';

const Text = styled.text`
  color: ${({ color }) => (color ? color : colors.DarkGrey)};
  font-size: ${({ fontSize }) => (fontSize ? `${fontSize}px` : '14px')};
  font-weight: ${({ fontWeight }) => (fontWeight ? fontWeight : 100)};
`;

interface IProps {
  text: string;
  color?: string;
  size?: number;
  weight?: number;
}

const Typography = ({ text, color, size, weight }: IProps) => {
  return (
    <Text color={color} fontSize={size} fontWeight={weight}>
      {text}
    </Text>
  );
};

export default Typography;
