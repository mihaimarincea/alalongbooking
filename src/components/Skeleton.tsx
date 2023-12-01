import React from 'react';

const Skeleton = () => {
    return (
        <div className="skeleton ">
            <div className="skeleton-image"></div>
            <div className="skeleton-text skeleton-title"></div>
            <div className="skeleton-text"></div>
            <div className="skeleton-text"></div>
            <div className="skeleton-text"></div>
        </div>
    );
};

export default Skeleton;