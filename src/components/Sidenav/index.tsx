import React, { useEffect } from 'react';
import { FiLayers, FiUploadCloud, FiXCircle } from 'react-icons/fi';
import { useDropzone } from 'react-dropzone';

import * as S from './styled';
import { useAssets } from '../../hooks/assets';

interface SidenavProps {
  open: boolean;
}

const Sidenav: React.FC<SidenavProps> = ({ open }) => {
  const { files, setFiles, deleteFile } = useAssets();

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/jpeg, image/png, audio/*, video/mp4',
    onDrop: acceptedFiles => {
      const newFiles = acceptedFiles.map(file =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
          nameFile: file.name,
        }),
      );

      setFiles([...files, ...newFiles]);
    },
  });

  const thumbs = files.map((file: any) => (
    <S.Thumb key={file.name}>
      <button onClick={() => deleteFile(file.name)}>
        <FiXCircle size={22} />
      </button>
      <S.ThumbInner>
        <S.ThumbImage src={file.preview} alt="" />
        <small>{file.nameFile}</small>
      </S.ThumbInner>
    </S.Thumb>
  ));

  useEffect(
    () => () => {
      files.forEach((file: any) => URL.revokeObjectURL(file.preview));
    },
    [files],
  );

  return (
    <S.Container open={open}>
      <S.Title>
        <FiLayers />
        <span>Assets disponíveis</span>
      </S.Title>

      <S.ContainerDragNDrop>
        {!files.length && (
          <div {...getRootProps({ className: 'dropzone' })}>
            <input {...getInputProps()} />
            <S.isEmpty>
              <FiUploadCloud size={32} />
              Clique aqui ou arraste os arquivos que deseja utilizar
            </S.isEmpty>
          </div>
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
