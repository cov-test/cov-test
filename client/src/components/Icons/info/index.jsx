import { hot } from 'react-hot-loader';

import React from 'react';
import PropTypes from 'prop-types';

import SvgIcon from '@material-ui/core/SvgIcon';

import InfoIcon from '../../../assets/icons/info.svg';

function Info(props) {
  return (
    <SvgIcon {...props}>
      <g fill="none" fill-rule="evenodd">
        <circle cx="12" cy="12" r="11.5" stroke="#3F2C7A" />
        <path
          fill="#3F2C7A"
          fill-rule="nonzero"
          d="M12.293 8.195c.263 0 .485-.09.667-.272.182-.182.273-.405.273-.667 0-.263-.091-.485-.273-.667-.182-.182-.402-.273-.66-.273-.257 0-.477.09-.659.273-.182.182-.273.404-.273.667 0 .262.089.485.266.667.177.181.396.272.66.272zm.682 9.656V9.529h-1.38v8.322h1.38z"
        />
      </g>
    </SvgIcon>
    // <SvgIcon {...props} component={InfoIcon} />
  );
}

Info.propTypes = {};

export default hot(module)(Info);
