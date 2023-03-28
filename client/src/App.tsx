import { Refine, Authenticated, AuthBindings } from '@refinedev/core';
import { RefineKbar, RefineKbarProvider } from '@refinedev/kbar';

import { ErrorComponent, notificationProvider, RefineSnackbarProvider } from '@refinedev/mui';

import dataProvider from '@refinedev/simple-rest';
import { CssBaseline, GlobalStyles } from '@mui/material';
import { BrowserRouter, Route, Routes, Outlet } from 'react-router-dom';
import routerBindings, {
  NavigateToResource,
  CatchAllNavigate,
  UnsavedChangesNotifier,
} from '@refinedev/react-router-v6';
import axios, { AxiosRequestConfig } from 'axios';
import {
  Login,
  Home,
  PropertyList,
  PropertyCreate,
  PropertyEdit,
  PropertyShow,
  AgentList,
  AgentShow,
  MyProfile,
  Messages,
  Reviews,
} from 'pages';
import { ColorModeContextProvider } from './contexts/color-mode';
// import { Login } from "pages/login";
import { CredentialResponse } from 'interfaces/google';
import { parseJwt } from 'utils/parse-jwt';
import { Layout, Header, Sider, Title } from 'components/layout';
import {
  AccountCircleOutlined,
  ChatBubbleOutline,
  DashboardOutlined,
  PeopleAltOutlined,
  StarOutlineRounded,
  VillaOutlined,
} from '@mui/icons-material';
import { MuiInferencer } from '@refinedev/inferencer/mui';

const axiosInstance = axios.create();
axiosInstance.interceptors.request.use((request: AxiosRequestConfig) => {
  const token = localStorage.getItem('token');
  if (request.headers) {
    request.headers['Authorization'] = `Bearer ${token}`;
  } else {
    request.headers = {
      Authorization: `Bearer ${token}`,
    };
  }

  return request;
});

function App() {
  const authProvider: AuthBindings = {
    login: async ({ credential }: CredentialResponse) => {
      const profileObj = credential ? parseJwt(credential) : null;

      if (profileObj) {
        localStorage.setItem(
          'user',
          JSON.stringify({
            ...profileObj,
            avatar: profileObj.picture,
          })
        );

        localStorage.setItem('token', `${credential}`);

        return {
          success: true,
          redirectTo: '/',
        };
      }

      return {
        success: false,
      };
    },
    logout: async () => {
      const token = localStorage.getItem('token');

      if (token && typeof window !== 'undefined') {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        axios.defaults.headers.common = {};
        window.google?.accounts.id.revoke(token, () => {
          return {};
        });
      }

      return {
        success: true,
        redirectTo: '/login',
      };
    },
    onError: async (error) => {
      console.error(error);
      return { error };
    },
    check: async () => {
      const token = localStorage.getItem('token');

      if (token) {
        return {
          authenticated: true,
        };
      }

      return {
        authenticated: false,
        error: new Error('Not authenticated'),
        logout: true,
        redirectTo: '/login',
      };
    },
    getPermissions: async () => null,
    getIdentity: async () => {
      const user = localStorage.getItem('user');
      if (user) {
        return JSON.parse(user);
      }

      return null;
    },
  };

  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <CssBaseline />
          <GlobalStyles styles={{ html: { WebkitFontSmoothing: 'auto' } }} />
          <RefineSnackbarProvider>
            <Refine
              dataProvider={dataProvider('https://api.fake-rest.refine.dev')}
              notificationProvider={notificationProvider}
              routerProvider={routerBindings}
              authProvider={authProvider}
              resources={[
                {
                  name: 'dashboard',
                  options: { label: 'Dashboard' },
                  list: MuiInferencer,
                  icon: <DashboardOutlined />,
                },
                {
                  name: 'properties',
                  list: MuiInferencer,
                  icon: <VillaOutlined />,
                },
                {
                  name: 'agents',
                  list: MuiInferencer,
                  icon: <PeopleAltOutlined />,
                },
                {
                  name: 'reviews',
                  list: MuiInferencer,
                  icon: <StarOutlineRounded />,
                },
                {
                  name: 'messages',
                  list: MuiInferencer,
                  icon: <ChatBubbleOutline />,
                },
                {
                  name: 'my-profile',
                  options: { label: 'My Profile' },
                  list: MuiInferencer,
                  icon: <AccountCircleOutlined />,
                },
              ]}
              options={{
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
              }}
            >
              <Routes>
                <Route
                  element={
                    <Authenticated fallback={<CatchAllNavigate to='/login' />}>
                      <Layout Header={Header} Sider={Sider} Title={Title}>
                        <Outlet />
                      </Layout>
                    </Authenticated>
                  }
                >
                  <Route index element={<NavigateToResource resource='dashboard' />} />
                  <Route path='/dashboard' element={<Home />} />
                  <Route path='/properties'>
                    <Route index element={<PropertyList />} />
                    <Route path='create' element={<PropertyCreate />} />
                    <Route path='edit/:id' element={<PropertyEdit />} />
                    <Route path='show/:id' element={<PropertyShow />} />
                  </Route>
                  <Route path='/agents'>
                    <Route index element={<AgentList />} />
                    <Route path='show/:id' element={<AgentShow />} />
                  </Route>
                  <Route path='/messages' element={<Messages />} />
                  <Route path='/reviews' element={<Reviews />} />
                  <Route path='/my-profile' element={<MyProfile />} />
                </Route>
                <Route
                  element={
                    <Authenticated fallback={<Outlet />}>
                      <NavigateToResource />
                    </Authenticated>
                  }
                >
                  <Route path='/login' element={<Login />} />
                </Route>
                <Route
                  element={
                    <Authenticated>
                      <Layout Header={Header} Sider={Sider} Title={Title}>
                        <Outlet />
                      </Layout>
                    </Authenticated>
                  }
                >
                  <Route path='*' element={<ErrorComponent />} />
                </Route>
              </Routes>

              <RefineKbar />
              <UnsavedChangesNotifier />
            </Refine>
          </RefineSnackbarProvider>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;

