import {Link} from 'react-router-dom';
import {Header} from '../header/Header';
import './Layout.css';

export function Layout({children}: any) {
    return (
        <div className='layout-container' data-testid='layout-test-id'>
            <div className='header'>
                <Header />
            </div>
            <div className='sidebar'>
                <Link to='/' className='link'>
                    Show my books
                </Link>
                <Link to='/addUser' className='link'>
                    Add a book
                </Link>
            </div>
            <div className='content'>
                {/* <Header /> */}
                {children}
            </div>

            {/*{children}

            <Footer /> */}
        </div>
    );
}
