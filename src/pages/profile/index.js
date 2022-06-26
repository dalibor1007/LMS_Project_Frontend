import React from 'react';

const UserProfile = React.lazy(() => import('./UserProfile'));
const user_role = localStorage.getItem('role');
const role = user_role === "admin" ? true : false;
export const profileConfig = [
  {
    path: '/my-profile',
    element: <UserProfile role={role} />,
  },
];
