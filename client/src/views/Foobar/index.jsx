import { hot } from 'react-hot-loader';
import React from 'react';

import { SpecialButtonGroup } from '../../components';

const Foobar = () => (
  <>
    <SpecialButtonGroup buttons={['Button1', 'Button2', 'Foobar']} />
  </>
);

export default hot(module)(Foobar);
