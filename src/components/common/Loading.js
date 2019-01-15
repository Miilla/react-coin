import React from 'react';
import './Loading.css';
import PropsTypes from 'prop-types';

const Loading = (props) => {
    const { width, height } = props
    return <div className="Loading" style={{ width, height }} />
}

Loading.defaultProps = {
    width: '28px',
    height: '28px'
}

Loading.propsTypes = {
    width: PropsTypes.string,
    height: PropsTypes.string
}

export default Loading;