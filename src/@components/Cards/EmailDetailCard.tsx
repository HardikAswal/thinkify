import Typography from '../Typography';
import styled from 'styled-components';
import Avatar from '../Avatar';
import BaseCard from './BaseCard';
import colors from '../../@constants/colors';

const Wrapper = styled.div`
  padding: 25px 50px 25px 25px;
  display: grid;
  grid-template-columns: 100px 1fr;
`;

const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Bullets = styled.span`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

const FavBtn = styled.button`
  border: none;
  padding: 2px;
  cursor: pointer;
  background: #fff;
  margin-left: 40px;
`;

interface IProps {
  id: string;
  subject: string;
  date: string;
  time: string;
  children: React.ReactNode;
  isFavorite: boolean;
  onSelectFavorite?: (id: string) => void;
}

const EmailDetailCard = ({
  id,
  subject,
  date,
  time,
  children,
  isFavorite,
  onSelectFavorite,
}: IProps) => {
  const favButtonHandler = (id: string) => {
    if (onSelectFavorite) {
      onSelectFavorite(id);
    }
  };

  return (
    <BaseCard>
      <Wrapper>
        <Avatar />
        <InfoSection>
          <Row>
            <Typography
              text={subject}
              color={colors.DarkGrey}
              size={28}
              weight={600}
            />

            {!isFavorite ? (
              <FavBtn onClick={() => favButtonHandler(id)}>
                <Typography
                  text={'Favorite'}
                  color={colors.Pink}
                  size={14}
                  weight={700}
                />
              </FavBtn>
            ) : (
              <FavBtn onClick={() => favButtonHandler(id)}>
                <Typography
                  text={'Remove Favorite'}
                  color={colors.DarkGrey}
                  size={14}
                  weight={700}
                />
              </FavBtn>
            )}
          </Row>
          <br />
          <Bullets>
            <Typography text={date} color={colors.DarkGrey} size={14} />
            <Typography text={time} color={colors.DarkGrey} size={14} />
          </Bullets>
          <br />
          {children}
        </InfoSection>
      </Wrapper>
    </BaseCard>
  );
};

export default EmailDetailCard;
