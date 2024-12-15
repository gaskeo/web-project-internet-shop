import {
  GlobalOutlined,
  LogoutOutlined,
  ShoppingCartOutlined,
  UserOutlined
} from '@ant-design/icons'
import { Layout, Menu, theme } from 'antd'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import { useCurrentUser, useLogout } from '@shared/api'

export function AuthLayout() {
  const redirect = useNavigate()
  const location = useLocation()
  const { user, isLoading: isCurrentUserLoading } = useCurrentUser()
  const { logout } = useLogout()
  const {
    token: { colorBgContainer, borderRadiusLG }
  } = theme.useToken()

  const handleLogout = async () => {
    await logout()
  }

  return (
    <Layout>
      <Layout.Header style={{ display: 'flex', justifyContent: 'space-between' }}>
        <LogoContainer>
          <GlobalOutlined />
        </LogoContainer>
        <Menu
          selectedKeys={[getSelectedKey(location?.pathname ?? '')]}
          theme="dark"
          mode="horizontal"
          items={[
            {
              key: 'catalog',
              label: 'Каталог',
              onClick: () => redirect('/')
            },
            {
              key: 'sales',
              label: 'Выгодно!',
              onClick: () => redirect('/sales')
            }
          ]}
        />
        {isCurrentUserLoading ? (
          <div />
        ) : user ? (
          <Menu
            style={{ flexBasis: 200 }}
            selectedKeys={['user']}
            theme="dark"
            mode="horizontal"
            items={[
              {
                key: 'cart',
                label: 'Корзина',
                icon: <ShoppingCartOutlined />,
                onClick: () => redirect('/cart')
              },
              {
                key: 'user',
                label: <UserOutlined height={32} width={32} />,
                children: [
                  {
                    label: 'Выйти',
                    key: 'logout',
                    onClick: handleLogout,
                    icon: <LogoutOutlined />
                  }
                ]
              }
            ]}
          />
        ) : (
          <div style={{ flexBasis: 200 }}>
            <Menu
              theme="dark"
              mode="horizontal"
              items={[
                {
                  key: 'login',
                  label: 'Вход',
                  onClick: () => redirect('/login')
                },
                {
                  key: 'register',
                  label: 'Регистрация',
                  onClick: () => redirect('/register')
                }
              ]}
            />
          </div>
        )}
      </Layout.Header>
      <Layout.Content
        style={{
          padding: 24,
          margin: 0,
          minHeight: 280,
          background: colorBgContainer,
          borderRadius: borderRadiusLG
        }}
      >
        <Outlet />
      </Layout.Content>
    </Layout>
  )
}

function getSelectedKey(pathname: string) {
  switch (pathname) {
    case '/':
      return 'catalog'
    case '/sales':
      return 'sales'
    case '/cart':
      return 'cart'
  }
  return ''
}

const LogoContainer = styled.div`
  height: 100%;
  aspect-ratio: 1 /1;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.token.colorBgBase};
  font-size: 32px;

  &:hover {
    background-color: ${(props) => props.theme.token.colorInfoBgHover};
  }
`
