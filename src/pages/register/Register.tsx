import { Button, Form, Input, Space, Typography } from 'antd'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import { RegisterDto, useRegister } from '@shared/api/register'

export function Register() {
  const { register, isLoading, error } = useRegister()
  const [formError, setFormError] = useState<string | null>(null)
  const redirect = useNavigate()
  const handleFinish = async (registerDto: RegisterDto & { passwordAgain: string }) => {
    if (registerDto.password === registerDto.passwordAgain) {
      setFormError(null)
      await register(registerDto)
      redirect('/')
    } else {
      setFormError('Пароли не совпадают')
    }
  }
  return (
    <RegisterWrapper>
      <FormWrapper onFinish={handleFinish}>
        <Typography.Title>Регистрация</Typography.Title>
        <Space size={28} direction="vertical">
          <Form.Item layout="vertical" label="Электронная почта" name="email">
            <Input size="large" type="email" placeholder="Введите электронную почту" />
          </Form.Item>
          <Form.Item layout="vertical" label="Пароль" name="password">
            <Input.Password size="large" placeholder="Введите пароль" />
          </Form.Item>
          <Form.Item layout="vertical" label="Пароль" name="passwordAgain">
            <Input.Password size="large" placeholder="Подтвердите пароль" />
          </Form.Item>

          <Button block htmlType="submit" size="large" type="primary" loading={isLoading}>
            Зарегистрироваться
          </Button>
        </Space>
        {(error || formError) && (
          <Typography.Text type="danger">{error ? error : formError}</Typography.Text>
        )}
      </FormWrapper>
    </RegisterWrapper>
  )
}

const RegisterWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.token.colorBgLayout};
`

const FormWrapper = styled(Form)`
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
