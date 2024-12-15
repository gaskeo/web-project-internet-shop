import styled from 'styled-components'

export const ProductCardWrapper = styled.div`
  position: relative;
  background-color: ${(props) => props.theme.token.colorBgLayout};
  border-radius: ${(props) => props.theme.token.borderRadius}px;
  width: 100%;
  height: 100%;
  overflow: hidden;
  transition: transform ${(props) => props.theme.token.motionDurationMid};

  display: flex;
  flex-direction: column;
  &:hover {
    transform: translateY(-2%);
  }
`

export const ProductContentWrapper = styled.div`
  padding: ${(props) => props.theme.token.sizeXXS}px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-basis: max-content;
`

export const ProductImage = styled.img`
  aspect-ratio: 1 / 1;
  width: 100%;
`
