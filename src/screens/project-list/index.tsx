import { useState } from 'react';
import { useDebounce, useDocumentTitle } from 'utils';
import { List } from './list';
import { SearchPanel } from './search-panel';
import styled from '@emotion/styled';
import { Typography } from 'antd';
import { useProjects } from 'utils/project';
import { useUsers } from 'utils/user';
import { useUrlQueryParam } from 'utils/url';

export const ProjectListScreen = () => {
  const [, setParam] = useState({
    name: '',
    personId: '',
  });
  const [param] = useUrlQueryParam(['name', 'personId']);

  const debouncedParam = useDebounce(param, 200);
  const { isLoading, error, data: list } = useProjects(debouncedParam);

  const { data: users } = useUsers(debouncedParam);

  useDocumentTitle('项目列表', false);

  return (
    <Container>
      <SearchPanel users={users || []} param={param} setParam={setParam} />
      {error ? (
        <Typography.Text type={'danger'}>{error.message}</Typography.Text>
      ) : null}
      <List loading={isLoading} users={users || []} dataSource={list || []} />
    </Container>
  );
};

ProjectListScreen.whyDidYouRender = true;

/* class ProjectListScreen extends React.Component {
  static whyDidYouRender = true;
}
 */
const Container = styled.div`
  padding: 3.2rem;
`;
