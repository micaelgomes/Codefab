import React, { useEffect, useState } from 'react';

import * as S from './styled';
import { FiGrid } from 'react-icons/fi';
import Navbar from '../../components/Navbar';
import { api } from '../../services/api';

const Gallery: React.FC = () => {
  const [images, setImages] = useState([]);

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

          <section>
            {images.map((image: any) => (
              <>
                <S.ThemeTitle>{image.theme}</S.ThemeTitle>
                <S.WrapperTheme>
                  {image.images.map((path: string) => (
                    <li>
                      <S.AssetImg
                        src={`/assets/${image.theme}/${path}`}
                        alt={path}
                        loading="lazy"
                      />
                    </li>
                  ))}
                </S.WrapperTheme>
              </>
            ))}
          </section>
        </S.Content>
      </S.Wrapper>
    </S.Container>
  );
};

export default Gallery;
