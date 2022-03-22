import Typography from '../Typography';
import styled from 'styled-components';
import Avatar from '../Avatar';
import BaseCard from './BaseCard';
import colors from '../../@constants/colors';

interface IWrapperProps {
  isRead: boolean;
}

const Wrapper = styled.div<IWrapperProps>`
  padding: 10px 20px;
  display: grid;
  grid-template-columns: 100px 1fr;
  border-radius: 10px;
  background: ${({ isRead }) => (isRead ? colors.MediumGrey : colors.White)};
`;

const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
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
  background: transparent;
  margin-left: 40px;
`;

interface IProps {
  id: string;
  from: string;
  subject: string;
  content: string;
  date: string;
  time: string;
  isFavorite: boolean;
  isRead: boolean;
  onClick?: (id: string) => void;
  onSelectFavorite?: (id: string) => void;
}

const EmailListCard = ({
  id,
  from,
  subject,
  content,
  date,
  time,
  isFavorite,
  isRead,
  onClick,
  onSelectFavorite,
}: IProps) => {
  const favButtonHandler = (id: string) => {
    if (onSelectFavorite) {
      onSelectFavorite(id);
    }
  };

  return (
    <BaseCard>
      <Wrapper isRead={isRead}>
        <Avatar />
        <InfoSection>
          <Bullets onClick={() => onClick && onClick(id)}>
            <Typography text="From:" color={colors.DarkGrey} size={14} />
            <Typography
              text={from}
              color={colors.DarkGrey}
              size={14}
              weight={700}
            />
          </Bullets>
          <Bullets>
            <Typography text="Subject:" color={colors.DarkGrey} size={14} />
            <Typography
              text={subject}
              color={colors.DarkGrey}
              size={14}
              weight={700}
            />
          </Bullets>
          <Bullets>
            <Typography
              text={`${content.slice(0, 100)}${
                content.length > 100 ? '...' : ''
              }`}
              color={colors.DarkGrey}
              size={14}
            />
          </Bullets>
          <Bullets>
            <Typography text={date} color={colors.DarkGrey} size={14} />
            <Typography text={time} color={colors.DarkGrey} size={14} />

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
          </Bullets>
        </InfoSection>
      </Wrapper>
    </BaseCard>
  );
};

export default EmailListCard;
