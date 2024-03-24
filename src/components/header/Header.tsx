// import {Link} from 'react-router-dom';

import './Header.css';

const Header = () => {
    return (
        <div className='header' data-testid='header-test-id'>
            <nav className='navbar'>
                <div className='title'>BookNook</div>
            </nav>
        </div>
    );
};

export {Header};
