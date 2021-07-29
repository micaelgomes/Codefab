import styled from 'styled-components';

export const Container = styled.div`
  width: 400px;
  background: #3e3d32;
  color: white;
`;

export const Title = styled.h3`
  margin: 16px 8px;
`;

export const ContainerIamges = styled.div`
  display: flex;
  flex-wrap: wrap;

  img {
    width: 100%;
    max-width: 120px;
    height: 100px;
    border-radius: 3px;
    margin: 8px;
  }
`;
