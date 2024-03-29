import React, { useEffect, useState } from 'react';
import { GoMarkGithub } from 'react-icons/go';
import { useAuth } from '../../hooks/auth';

import * as S from './styled';

const Login: React.FC = () => {
  const client_id = process.env.REACT_APP_CLIENT_ID;
  const redirect_uri = process.env.REACT_APP_REDIRECT_URI;

  const [loading, setLoading] = useState(false);
  const widthWindow = window.innerWidth;

  const { signIn } = useAuth();

  useEffect(() => {
    const url = window.location.href;
    const hasCode = url.includes('?code=');

    if (hasCode) {
      setLoading(true);
      const newUrl = url.split('?code=');
      window.history.pushState({}, '', newUrl[0]);

      signIn({ githubCode: newUrl[1] });
    }
  }, [signIn]);

  return (
    <>
      {widthWindow >= 992 ? (
        <S.Wrapper>
          <S.Container>
            <S.Branding>
              <h1>
                A fábrica de <b>Fábulas</b>
              </h1>
              <img src="/peeps.svg" alt="" />
              <h3>
                Aprenda a programar escrevendo fábulas com FableJS. Aqui todos
                são aceitos, inclusive elfos e fadas
              </h3>
            </S.Branding>

            <S.ContainerCard>
              <S.Card>
                <header>
                  <S.LogoContainer>
                    <img src="/logo.svg" alt="" />
                    <h4>
                      <code>Alpha 0.9</code>
                    </h4>
                  </S.LogoContainer>
                </header>
                <S.CardContainer>
                  {loading ? (
                    <S.ButtonGithubLoading />
                  ) : (
                    <S.ButtonGithub
                      href={`https://github.com/login/oauth/authorize?scope=delete_repo%20user%20repo&client_id=${client_id}&redirect_uri=${redirect_uri}&allow_signup=true`}
                    >
                      <GoMarkGithub size={18} />
                      <span>Login com GitHub</span>
                    </S.ButtonGithub>
                  )}
                </S.CardContainer>
                <S.SupportLink>
                  <a href="/">Criar atividade para moodle com H5P</a>
                </S.SupportLink>
              </S.Card>
            </S.ContainerCard>
          </S.Container>
        </S.Wrapper>
      ) : (
        <S.NoResolution>
          <p>O Playground ainda não está disponível nesta resolução. </p>
        </S.NoResolution>
      )}
    </>
  );
};

export default Login;
