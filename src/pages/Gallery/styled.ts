import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background: #272822;
`;

export const Wrapper = styled.div`
  display: flex;
`;

export const Content = styled.div`
  padding: 0 1rem;
  width: 100%;
  max-width: 1100px;
  margin: 1rem auto;
  color: #fff;

  .guide-title {
    display: flex;
    align-items: center;
    margin-bottom: 2.5rem;

    svg {
      margin-right: 0.5rem;
    }
  }
`;

export const WrapperTheme = styled.ul`
  display: flex;
  flex-wrap: wrap;
`;
