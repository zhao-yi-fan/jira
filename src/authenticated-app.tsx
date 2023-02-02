import styled from '@emotion/styled';
import { Row } from 'components/lib';
import { useAuth } from 'context/auth-context';
import { ProjectListScreent } from 'screens/project-list';
import { ProjectScreent } from 'screens/project';
import { ReactComponent as SoftWareLogo } from 'assets/software-logo.svg';
import { Button, Dropdown } from 'antd';
import { Route, Routes } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';

export const AuthenticatedApp = () => {
  return (
    <Container>
      <PageHeader />
      <Main>
        <Router>
          <Routes>
            <Route path={'/projects'} element={<ProjectListScreent />} />
            <Route
              path={'/projects/:projectId/*'}
              element={<ProjectScreent />}
            />
          </Routes>
        </Router>
      </Main>
    </Container>
  );
};

const PageHeader = () => {
  const { logout, user } = useAuth();
  const items = [
    {
      label: (
        <Button type="link" onClick={logout}>
          登出
        </Button>
      ),
      key: 'logout',
    },
  ];
  return (
    <Header between={true}>
      <HeaderLeft gap={true}>
        <SoftWareLogo width={'18rem'} color={'rgb(38, 132,255)'} />
        <h2>项目</h2>
        <h2>用户</h2>
      </HeaderLeft>
      <HeaderRight>
        <Dropdown menu={{ items }}>
          <Button type="link">Hi, {user?.name}</Button>
        </Dropdown>
      </HeaderRight>
    </Header>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
  height: 100vh;
`;
const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`;

const HeaderLeft = styled(Row)``;

const HeaderRight = styled.div``;

const Main = styled.main``;
