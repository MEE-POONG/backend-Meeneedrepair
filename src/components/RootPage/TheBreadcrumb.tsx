import React from 'react';
import { useRouter } from 'next/router';
import { Breadcrumb } from 'react-bootstrap';
import Link from 'next/link';


const TheBreadcrumb: React.FC = () => {
    const router = useRouter();
    const isActiveHome = router.pathname === '/';
    const pathParts = router.asPath.split('/').filter(part => part);

    return (
        <Breadcrumb className='mx-auto'>
            {isActiveHome ?
                <span className='breadcrumb-item active'>Home</span>
                : <Link href="/" className='breadcrumb-item text-primary'>
                    Home
                </Link>
            }
            {pathParts.map((part, index) => {
                const pathToPart = '/' + pathParts.slice(0, index + 1).join('/');
                const isActive = (index === pathParts.length - 1);

                if (isActive) {
                    return (
                        <Breadcrumb.Item active key={pathToPart}>{part}</Breadcrumb.Item>
                    );
                } else {
                    return (
                        <Link href={pathToPart} className='breadcrumb-item text-primary' key={pathToPart}>
                            {part}
                        </Link>
                    );
                }
            })}
        </Breadcrumb>
    );
};

export default TheBreadcrumb;
