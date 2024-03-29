import { Table, TableProps } from 'antd';
import dayjs from 'dayjs';
import React from 'react';
import { Link } from 'react-router-dom';
import { User } from './search-panel';

// TODO 把所有id都改成number
export interface Project {
  id: string; // TODO 改成number
  name: string;
  personId: string;
  pin: boolean;
  organization: string;
  created: number;
}
interface ListProps extends TableProps<Project> {
  users: User[];
}
export const List = ({ users, ...props }: ListProps) => {
  return (
    <Table
      columns={[
        {
          title: '名称',
          render(row, project, index) {
            
            return <Link to={`${project.id}`}>{project.name}</Link>;
          },
          sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
          title: '部门',
          dataIndex: 'organization',
        },
        {
          title: '负责人',
          render: (value, project) => {
            return (
              <span>
                {users.find((user) => user.id === project.personId)?.name ||
                  '未知'}
              </span>
            );
          },
        },
        {
          title: '创建时间',
          render: (value, project) => {
            return (
              <span>
                {project.created
                  ? dayjs(project.created).format('YYYY-MM-DD')
                  : ''}
              </span>
            );
          },
        },
      ]}
      {...props}
    ></Table>
  );
};
