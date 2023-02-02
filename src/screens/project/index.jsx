import { Link, Routes, Route, Navigate } from 'react-router-dom';
import { KanbanScreen } from 'screens/kanban';
import { EpicScreen } from 'screens/epic';
export const ProjectScreen = () => {
  return (
    <>
      <h1>ProjectScreen</h1>
      <Link to={'kanban'}>看板</Link>
      <Link to={'epic'}>任务组</Link>
      <Routes>
        <Route path={'/kanban'} element={<KanbanScreen />} />
        <Route path={'/epic'} element={<EpicScreen />} />
        <Route
          path="*"
          element={<Navigate to={window.location.pathname + '/kanban'} />}
        />
      </Routes>
    </>
  );
};
