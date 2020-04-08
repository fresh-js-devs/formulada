import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/hljs';

import Container from '../components/Container';

const FormikExample = () => {
  return (
    <Container>
      {/* <SyntaxHighlighter language='json' style={dracula}>
        {JSON.stringify(values, null, 2)}
      </SyntaxHighlighter>
      <SyntaxHighlighter language='json' style={dracula}>
        {JSON.stringify(errors, null, 2)}
      </SyntaxHighlighter> */}
    </Container>
  );
};

export default FormikExample;
