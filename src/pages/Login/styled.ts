import styled from 'styled-components';

export const Wrapper = styled.div`
  background: #272727;
  min-height: 100vh;
  display: flex;
  background: url('/bg-login.png');
  background-position: left;
  background-size: contain;
  background-repeat: repeat;
`;

export const Container = styled.div`
  max-width: 1100px;
  width: 100%;
  margin: 0 auto;
  padding: 1rem;
  display: flex;
`;

export const Branding = styled.div`
  flex: 1;
  color: #f7f9f2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h1 {
    font-weight: 400;
  }

  img {
    margin: 1rem;
  }

  h3 {
    font-weight: 400;
    max-width: 440px;
    text-align: center;
  }
`;

export const Card = styled.div`
  background: #f7f9f2;
  border-radius: 20px;
  width: 100%;
  max-width: 500px;
  height: auto;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.15);
  flex-grow: 0;
  margin: auto;
`;

export const ContainerCard = styled.div`
  flex: 1;
  margin: auto;
`;

export const LogoContainer = styled.div`
  display: flex;
  align-items: flex-start;
  background: #ffffff;
  border-radius: 20px 20px 0px 0px;
  padding: 1.5rem 1rem;

  img {
    width: 125px;
  }

  h4 {
    color: #272727;
    opacity: 0.5;
    font-weight: 500;
    margin-left: 16px;
    border-left: 1px solid rgba(39, 39, 39, 0.75);
    padding-left: 16px;
  }
`;

export const CardContainer = styled.div`
  display: flex;
  height: 150px;
  padding: 1rem;
`;

export const ButtonGithub = styled.a`
  background-color: #333;
  color: #f5f5f5 !important;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease-in-out;
  width: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;

  svg {
    margin-right: 8px;
  }

  &:hover {
    transform: translateY(-4px);
  }
`;

export const SupportLink = styled.div`
  display: flex;
  padding: 1rem;

  a {
    margin: auto;
    font-size: 0.8rem;
  }
`;
