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
  max-width: 800px;
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

  h1 {
    margin-top: 2.5rem;
  }

  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-top: 1rem;
  }

  p {
    margin: 1rem 0;
  }

  hr {
    margin: 1rem 0;
  }

  iframe {
    max-width: 600px;
    height: 400px;
    width: 100%;

    &.forms {
      margin-top: 1rem;
      max-width: 100%;
      height: 900px;
    }
  }

  table {
    margin: 1rem 0 4rem;
  }

  pre {
    margin: 1rem 0;

    div {
      &::-webkit-scrollbar {
        width: 10px;
        background-color: #3e3d32;
      }

      &::-webkit-scrollbar-track {
        border-radius: 10px;
        background: transparent;
      }

      &::-webkit-scrollbar-thumb {
        border-radius: 10px;
        background: #cfcfc2;
      }

      &::-webkit-scrollbar-thumb:hover {
        background: #75715e;
      }
    }
  }
`;
