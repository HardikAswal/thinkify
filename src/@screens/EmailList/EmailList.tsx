import { useEffect, useState } from 'react';
import styled from 'styled-components';
import colors from '../../@constants/colors';
import { EmailListCard, EmailDetailCard } from '../../@components/Cards';

const Wrapper = styled.div`
  margin: 0;
  padding: 40px;
  background-color: ${colors.Aqua};
  min-height: 100vh;
  height: 100%;
  display: flex;
  flex-direction: row;
  gap: 25px;

  > div {
    height: auto;
  }
`;

const EmailListCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
  width: 100%;
`;

interface IEmailTemplate {
  id: string;
  from: {
    email: string;
    name: string;
  };
  date: number;
  subject: string;
  short_description: string;
  body?: React.ReactNode;
}

const EmailList = () => {
  const [emailsList, setEmailsList] = useState<IEmailTemplate[]>([]);
  const [readEmailView, setReadEmailView] = useState<IEmailTemplate | null>(
    null
  );

  useEffect(() => {
    fetchEmails();
  });

  const fetchEmails = async () => {
    const url = `https://flipkart-email-mock.now.sh/?page=`;

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        const res = await response.json();
        if (res && res.list) {
          setEmailsList(res.list);
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  const fetchEmailDetails = async (email: IEmailTemplate) => {
    const url = `https://flipkart-email-mock.now.sh/?id=${email.id}`;

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        const res = await response.json();
        if (res && res.body) {
          setReadEmailView({
            ...email,
            body: res.body,
          });
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  const toggleFavorite = (id: string) => {
    const localStorageEmailList = localStorage.getItem('favoriteEmails');

    if (!localStorageEmailList) {
      localStorage.setItem('favoriteEmails', JSON.stringify([id]));
    } else {
      let parsedList: string[] = JSON.parse(localStorageEmailList);
      console.log(parsedList);
      if (parsedList.includes(id)) {
        parsedList = parsedList.filter((_id: string) => _id !== id);
      } else {
        parsedList.push(id);
      }
      localStorage.setItem('favoriteEmails', JSON.stringify(parsedList));
    }
    return id;
  };

  const handleEmailRead = (id: string) => {
    const readListString = localStorage.getItem('readEmails');

    if (!readListString) {
      localStorage.setItem('readEmails', JSON.stringify([id]));
    } else {
      const parsedList: string[] = JSON.parse(readListString);
      console.log(parsedList);
      if (!parsedList.includes(id)) {
        parsedList.push(id);
      }
      localStorage.setItem('readEmails', JSON.stringify(parsedList));
    }
  };

  const isEmailFavorite = (id: string) => {
    const localStorageEmailList = localStorage.getItem('favoriteEmails');
    let parsedList: string[] = [];

    if (localStorageEmailList) {
      parsedList = JSON.parse(localStorageEmailList);
    }

    return parsedList.includes(id);
  };

  const renderEmailList = (list: IEmailTemplate[]) => {
    const localStorageEmailList = localStorage.getItem('favoriteEmails');
    let parsedList: string[] = [];

    const readEmailList = localStorage.getItem('readEmails');
    let parsedReadList: string[] = [];

    if (localStorageEmailList) {
      parsedList = JSON.parse(localStorageEmailList);
    }

    if (readEmailList) {
      parsedReadList = JSON.parse(readEmailList);
    }

    return (
      <EmailListCardContainer>
        {list.map((email: IEmailTemplate) => {
          const { id, from, date, subject, short_description } = email;
          const formattedDate = new Date(date);
          return (
            <EmailListCard
              key={Math.random()}
              id={id}
              from={from.email}
              subject={subject}
              content={short_description}
              date={`${formattedDate}`.split('T')[0]}
              time={`${formattedDate}`.split('T')[1]}
              isFavorite={parsedList.includes(id)}
              isRead={parsedReadList.includes(id)}
              onClick={() => {
                handleEmailRead(id);
                if (readEmailView?.id === id) {
                  setReadEmailView(null);
                } else {
                  fetchEmailDetails(email);
                }
              }}
              onSelectFavorite={(id: string) => toggleFavorite(id)}
            />
          );
        })}
      </EmailListCardContainer>
    );
  };

  return (
    <Wrapper>
      {renderEmailList(emailsList)}
      {readEmailView && (
        <EmailDetailCard
          id={readEmailView.id}
          subject={readEmailView.subject}
          date={readEmailView.date.toString()}
          time={readEmailView.date.toString()}
          isFavorite={isEmailFavorite(readEmailView.id)}
          onSelectFavorite={(id: string) => toggleFavorite(id)}
        >
          {readEmailView.body}
        </EmailDetailCard>
      )}
    </Wrapper>
  );
};

export default EmailList;
