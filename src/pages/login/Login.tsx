import { Button, Form, Input, Space, Typography } from 'antd'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import { LoginDto, useLogin } from '@shared/api'

export function Login() {
  const { login, isLoading, error } = useLogin()
  const redirect = useNavigate()
  const handleFinish = async (loginDto: LoginDto) => {
    await login(loginDto)
    redirect('/')
  }
  return (
    <LoginWrapper>
      <FormWrapper onFinish={handleFinish}>
        <Typography.Title>Вход</Typography.Title>
        <Space size={28} direction="vertical">
          <Form.Item layout="vertical" label="Электронная почта" name="email">
            <Input size="large" type="email" placeholder="Введите электронную почту" />
          </Form.Item>
          <Form.Item layout="vertical" label="Пароль" name="password">
            <Input.Password size="large" placeholder="Введите пароль" />
          </Form.Item>
          <Button block htmlType="submit" size="large" type="primary" loading={isLoading}>
            Войти
          </Button>
        </Space>
        {error && <Typography.Text type="danger">{error.message}</Typography.Text>}
      </FormWrapper>
    </LoginWrapper>
  )
}

const LoginWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.token.colorBgLayout};
`

const FormWrapper = styled(Form<LoginDto>)`
  border-radius: ${(props) => props.theme.token.borderRadius}px;
  width: min(98vw, 400px);
  background-color: ${(props) => props.theme.token.colorBgContainer};
  padding: ${(props) => props.theme.token.padding}px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;

  & > * {
    width: 100%;
  }
`
