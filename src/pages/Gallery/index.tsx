import React, { useEffect, useState } from 'react';

import * as S from './styled';
import { FiGrid } from 'react-icons/fi';
import Navbar from '../../components/Navbar';
import { api } from '../../services/api';

const Gallery: React.FC = () => {
  const [images, setImages] = useState([]);
  const allowedsFiles = ['mp3', 'wav', 'ogg'];

  useEffect(() => {
    api
      .get(`/gallery`)
      .then(res => {
        setImages(res.data);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  return (
    <S.Container>
      <Navbar />

      <S.Wrapper>
        <S.Content>
          <h1 className="guide-title">
            <FiGrid />
            Galeria
          </h1>

          {images.length > 0 ? (
            <section>
              {images.map((image: any, i: number) => (
                <div key={i}>
                  <S.ThemeTitle>{image.theme}</S.ThemeTitle>
                  <S.WrapperTheme>
                    {image.images.map((path: string) => {
                      const infoFiles = path.split('.');

                      return (
                        <>
                          {allowedsFiles.includes(infoFiles[1]) ? (
                            <S.AssetAudio
                              key={`/assets/${image.theme}/${path}`}
                            >
                              <S.AssetImg
                                src="/audio.png"
                                alt={path}
                                loading="lazy"
                              />
                              <p>{path}</p>
                            </S.AssetAudio>
                          ) : (
                            <li key={`/assets/${image.theme}/${path}`}>
                              <S.AssetImg
                                src={`/assets/${image.theme}/${path}`}
                                alt={path}
                                loading="lazy"
                              />
                            </li>
                          )}
                        </>
                      );
                    })}
                  </S.WrapperTheme>
                </div>
              ))}
            </section>
          ) : (
            <S.ContainerLoading />
          )}
        </S.Content>
      </S.Wrapper>
    </S.Container>
  );
};

export default Gallery;
