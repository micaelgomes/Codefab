import React from 'react';
import { FiLayers, FiUploadCloud, FiXCircle } from 'react-icons/fi';
import { useDropzone } from 'react-dropzone';

import * as S from './styled';
import { useAssets } from '../../hooks/assets';
import { api } from '../../services/api';
import { useAuth } from '../../hooks/auth';
import { useParams } from 'react-router';

interface SidenavProps {
  open: boolean;
}

interface PathType {
  repo: string;
}

const Sidenav: React.FC<SidenavProps> = ({ open }) => {
  const { files, setFiles, deleteFile, checkIfExists } = useAssets();
  const { repo } = useParams<PathType>();
  const { user } = useAuth();

  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    maxFiles: 1,
    accept: 'image/jpeg, image/png, audio/mp3, audio/wav, video/mp4',
    onDrop: acceptedFiles => {
      const filesData = new FormData();

      const newFiles = acceptedFiles.map(file =>
        Object.assign(file, {
          download_url: URL.createObjectURL(file),
          nameFile: file.name,
        }),
      );

      let exists;
      newFiles.forEach(file => {
        filesData.append('assets', file);
        exists = checkIfExists(file.nameFile);
      });

      if (exists) {
        alert(
          'Ocorreu algum problema no envio...\nVeja se o nome do arquivo que está tentando enviar é diferente',
        );

        return;
      }

      api
        .post(`/file?user=${user.login}&repo=${repo}`, filesData, {
          headers: {
            Authorization: `token ${user.access_token}`,
          },
        })
        .then(res => {
          const filesRepo = res.data.content;
          setFiles([...files, filesRepo]);
        })
        .catch(err => {
          console.error(err);
        });

      setFiles([...files, ...newFiles]);
    },
  });

  const thumbs = files.map((file: any) => {
    const infosFile = file.name.split('.');
    const allowedTypes = ['mp3', 'wav', 'ogg', 'mp4', 'wmv'];

    return (
      <S.Thumb key={file.name}>
        <button onClick={() => deleteFile(file.name, repo, file.sha)}>
          <FiXCircle size={22} />
        </button>
        <S.ThumbInner>
          {allowedTypes.includes(infosFile[1]) ? (
            <>
              {infosFile[1] === 'mp4' ? (
                <S.ThumbImage src="/video.png" alt={file.name} />
              ) : (
                <S.ThumbImage src="/audio.png" alt={file.name} />
              )}
            </>
          ) : (
            <S.ThumbImage src={file.download_url} alt={file.name} />
          )}
          <small>{file.name}</small>
        </S.ThumbInner>
      </S.Thumb>
    );
  });

  return (
    <S.Container open={open}>
      <S.Title>
        <FiLayers />
        <span>Assets disponíveis</span>
      </S.Title>

      <S.ContainerDragNDrop>
        {!files.length && (
          <S.ContainerEmpty {...getRootProps({ className: 'dropzone' })}>
            <input name="assets" {...getInputProps()} />
            <S.isEmpty>
              <FiUploadCloud size={32} />
              Clique aqui ou arraste os arquivos que deseja utilizar
            </S.isEmpty>
          </S.ContainerEmpty>
        )}
        {!!files.length && (
          <>
            <S.ListFiles>{thumbs}</S.ListFiles>
            <S.ContentFiles {...getRootProps({ className: 'dropzone' })}>
              <input {...getInputProps()} />
              <S.InputFileBefore>
                <small>
                  Clique aqui ou arraste para adicionar mais arquivos
                </small>
              </S.InputFileBefore>
            </S.ContentFiles>
          </>
        )}
      </S.ContainerDragNDrop>
    </S.Container>
  );
};

export default Sidenav;
