import React from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';
import { useTranslation } from 'react-i18next';

const TranslationTest = (props) => {
  const { t, i18n } = useTranslation();
  return <div>{t('welcome')}</div>;
};

TranslationTest.propTypes = {};

export default hot(module)(TranslationTest);
