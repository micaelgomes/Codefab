import React, { useEffect, useState } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter/dist/esm/default-highlight';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

import * as S from './styled';
import { FiInfo } from 'react-icons/fi';
import Navbar from '../../components/Navbar';
import { useAuth } from '../../hooks/auth';

const Help: React.FC = () => {
  const [help, setHelp] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    fetch('/help.md').then(res => res.text().then(text => setHelp(text)));
  }, []);

  return (
    <S.Container>
      {!!user && <Navbar />}

      <S.Wrapper>
        <S.Content>
          <h1 className="guide-title">
            <FiInfo />
            Guia de ajuda
          </h1>

          <ReactMarkdown
            children={help}
            rehypePlugins={[rehypeRaw]}
            remarkPlugins={[remarkGfm]}
            components={{
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '');
                return !inline && match ? (
                  <SyntaxHighlighter
                    children={String(children).replace(/\n$/, '')}
                    style={atomOneDark}
                    language="xml"
                    PreTag="div"
                  />
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
            }}
          />
        </S.Content>
      </S.Wrapper>
    </S.Container>
  );
};

export default Help;
