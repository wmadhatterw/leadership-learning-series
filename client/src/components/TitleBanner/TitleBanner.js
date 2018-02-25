import React from 'react';
import './titleBanner.css';

const TitleBanner = (props) => {
    return(
        <div class="header-blue text-center">
            <h1>{props.children}</h1>
        </div>
    );
}

export default TitleBanner;