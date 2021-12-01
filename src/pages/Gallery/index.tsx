import React, { useEffect, useState } from 'react';

import * as S from './styled';
import { FiInfo } from 'react-icons/fi';
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
            <FiInfo />
            Galeria
          </h1>

          <section>
            {images.map((image: any) => (
              <>
                <h4>{image.theme}</h4>
                <S.WrapperTheme>
                  {image.images.map((path: string) => (
                    <li>
                      <img
                        width={150}
                        src={`/assets/${image.theme}/${path}`}
                        alt={path}
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
