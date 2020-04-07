import styled from '@emotion/styled';

import { Button } from 'antd';

const StyledButton = styled(Button)`
  &&& {
    width: 200px;
    background-color: white;
    color: #333;
    border: none;
    margin: 1rem 0;
    font-weight: bold;
  }
`;

export default StyledButton;
