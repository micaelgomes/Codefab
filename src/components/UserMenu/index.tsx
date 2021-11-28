import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

import * as S from './styled';
import { FiInfo } from 'react-icons/fi';

interface QuickHelpProps {
  open: boolean;
  toogle: () => void;
}

const QuickHelp: React.FC<QuickHelpProps> = ({ open, toogle }) => {
  const [help, setHelp] = useState('');

  useEffect(() => {
    fetch('/help.md').then(res => res.text().then(text => setHelp(text)));
  }, []);

  return (
    <>
      <S.Overlay open={open} onClick={() => toogle()} />

      <S.Container
        open={open}
        right={true}
        width={700}
        noTouchOpen={true}
        noTouchClose={true}
        overlayColor="transparent"
        overlayClassName="custom-overlay"
      >
        <h2 className="guide-title">
          <FiInfo />
          Guia de ajuda
        </h2>

        <ReactMarkdown
          children={help}
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || '');
              return !inline && match ? (
                <SyntaxHighlighter
                  key={'123'}
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
      </S.Container>
    </>
  );
};

export default QuickHelp;
