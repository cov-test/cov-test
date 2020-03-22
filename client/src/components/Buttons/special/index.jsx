import { hot } from 'react-hot-loader';
import React from 'react'
import PropTypes from 'prop-types'
import { styled } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

const StyledButton = styled(Button)({
    fontSize: '18px',
    height: '48px',
    paddingLeft: '16px',
    paddingRight: '16px',
    paddingTop: '12px',
    paddingBottom: '12px'
})

export const SpecialButton = props => {
    const primary = '#3f2c7a';
    return (
        <>
            { props.selected ? (
                <StyledButton color="primary" />
            ) : (
                <StyledButton variant="outlined" color="primary" />
            ) }
        </>
    )
}

SpecialButton.propTypes = {
    selected: PropTypes.bool.isRequired
}
