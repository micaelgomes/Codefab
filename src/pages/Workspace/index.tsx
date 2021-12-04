import { useSpring } from 'react-spring';
import React, { FormEvent, memo, useEffect, useRef, useState } from 'react';
import { FiArrowRight, FiPlus, FiX } from 'react-icons/fi';
import Navbar from '../../components/Navbar';
import { api } from '../../services/api';
import { useAssets } from '../../hooks/assets';

import * as S from './styled';
import { useHistory } from 'react-router';
import { useAuth } from '../../hooks/auth';

const Workspace: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [infraError, setInfraError] = useState(false);
  const [creatingProject, setCreatingProject] = useState(false);
  const { setFiles } = useAssets();
  const { user } = useAuth();

  const history = useHistory();

  const propsOverlay = useSpring({
    opacity: modalOpen ? 1 : 0,
    display: modalOpen ? 'flex' : 'none',
  });

  const propsModal = useSpring({
    opacity: modalOpen ? 1 : 0,
    transform: modalOpen ? 'translateY(0)' : 'translateY(-100%)',
  });

  const inputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [projects, setProjects] = useState<any>([]);
  const [loaded, setLoaded] = useState(false);
  const max = 8;
  const min = 0;

  const toogle = () => setModalOpen(!modalOpen);

  const publishRepo = (e: FormEvent) => {
    e.preventDefault();
    const name = inputRef.current?.value;
    const description = textareaRef.current?.value;

    const hasSpecialChar = name?.search(/[!@#$%^&*(),.?":{}|<>]/g);
    const hasAccentChar = name?.search(/[ãàáäâèéëêìíïîõòóöôùúüûñç]/gi);

    setCreatingProject(true);

    if (
      hasSpecialChar &&
      hasAccentChar &&
      hasSpecialChar < 0 &&
      hasAccentChar < 0
    ) {
      api
        .post(
          '/project',
          {
            name,
            description,
          },
          {
            headers: {
              Authorization: `token ${user.access_token}`,
            },
          },
        )
        .then(res => {
          setCreatingProject(false);
          history.push(`/fable/${res.data.name}`);
        })
        .catch(err => {
          setCreatingProject(false);
          console.error(err);
          alert('Algum problema aconteceu');
          localStorage.removeItem('@codefab:user');
          window.location.reload();
        });
    } else {
      setCreatingProject(false);

      console.log(hasSpecialChar, hasAccentChar);

      if (typeof hasSpecialChar !== 'undefined' && hasSpecialChar >= 0) {
        alert(
          'O tílulo não pode conter:\n ! @ # $ % ^ & * ( ) , . ? " : { } | < >',
        );
      }

      if (typeof hasAccentChar !== 'undefined' && hasAccentChar >= 0) {
        alert('O tílulo não pode letrar com acento.');
      }
    }
  };

  useEffect(() => {
    const getProjects = async () => {
      api
        .get(`/projects?user=${user.login}`, {
          headers: {
            Authorization: `token ${user.access_token}`,
          },
        })
        .then(response => {
          setProjects(response.data);
          setLoaded(true);
        })
        .catch(err => {
          setInfraError(
            err.response.status >= 400 && err.response.status <= 504,
          );
          setProjects([{ message: 'Infra error' }]);
        });
    };

    getProjects();
  }, [setFiles, user]);

  return (
    <S.Container>
      <Navbar />

      <S.Wrapper>
        {!infraError ? (
          <S.Content>
            <h1>Suas Fábulas</h1>

            {loaded ? (
              <S.List>
                <S.CardCreate onClick={toogle}>
                  <div>
                    <FiPlus size={64} />
                    <h4>Nova fábula</h4>
                  </div>
                </S.CardCreate>

                {projects.map((project: any) => (
                  <S.Card
                    key={project?.id}
                    to={`/fable/${project?.name}`}
                    color1={Math.floor(Math.random() * (max - min + 1) + min)}
                    color2={Math.floor(Math.random() * (max - min + 1) + min)}
                  >
                    <S.ButtonDelete>
                      <FiX size={18} />
                    </S.ButtonDelete>
                    <div>
                      <img src="/castle.png" alt="castelo de fadas" />
                      <h4>{project.name.split('-').join(' ')}</h4>
                    </div>
                  </S.Card>
                ))}
              </S.List>
            ) : (
              <S.ContainerLoading />
            )}
          </S.Content>
        ) : (
          <S.Content>
            <h1>Servidor não disponível</h1>

            <S.ContainerImageError>
              <S.ImageError src="/server.png" alt="Imagem server error" />
            </S.ContainerImageError>
          </S.Content>
        )}
      </S.Wrapper>

      <S.Overlay style={propsOverlay}>
        <S.Modal style={propsModal}>
          <S.ContainerModal>
            <S.buttonClose onClick={toogle}>
              {!creatingProject && <FiX size={24} />}
            </S.buttonClose>
            <img src="/castle.png" alt="castelo de fadas" />
            {creatingProject ? (
              <S.ContainerLoadingModal>
                <p>Criando sua fábula</p>
              </S.ContainerLoadingModal>
            ) : (
              <form onSubmit={publishRepo}>
                <label>
                  Título
                  <input ref={inputRef} type="text" maxLength={30} />
                  <small>
                    {
                      'não use acento ou caracteres especiais, use ( - ) para separar palavras.'
                    }
                  </small>
                </label>

                <label>
                  Resumo
                  <textarea ref={textareaRef} maxLength={400} />
                </label>

                <S.buttonPublish type="submit">
                  Criar fábula
                  <FiArrowRight size={18} />
                </S.buttonPublish>
              </form>
            )}
          </S.ContainerModal>
        </S.Modal>
      </S.Overlay>
    </S.Container>
  );
};

export default memo(Workspace);
