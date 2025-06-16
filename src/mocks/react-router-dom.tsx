import React from 'react';

export const BrowserRouter: React.FC<{ children: React.ReactNode }> = ({ children }) => <div>{children}</div>;
export const Routes: React.FC<{ children: React.ReactNode }> = ({ children }) => <div>{children}</div>;
export const Route: React.FC<{ element: React.ReactNode }> = ({ element }) => <div>{element}</div>;
export const Navigate: React.FC<{ to: string }> = ({ to }) => <div>Redirect to {to}</div>;

export const useNavigate = () => jest.fn();
