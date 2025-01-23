import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faChevronDown, faChevronUp} from "@fortawesome/free-solid-svg-icons";
import {Link} from "@inertiajs/react";

const NavItem = ({ children, href, dropdown = false, label, className = '', icon = '', active = false, button=false, method=undefined }) => {
    const [open, setOpen] = useState(false);

    return (
        <>
            {dropdown ? (
                <div className={`nav-item ${className}`} aria-current={active ? "page" : undefined}>
                    <button onClick={() => setOpen((prev) => !prev)} aria-expanded={open} aria-controls={label}>
                        {icon && <div className="nav-item-icon">{icon}</div>}
                        <div className="nav-item-label">{label}</div>
                        <div className="nav-item-trigger">
                            {open ?
                                <FontAwesomeIcon icon={faChevronDown} />
                                :
                                <FontAwesomeIcon icon={faChevronUp} />
                            }
                        </div>
                    </button>

                    {open && (
                        <>
                            <ul id={label} className="nav-item-dropdown">
                                {children}
                            </ul>
                            <div id="nav-dropdown-close" onClick={() => setOpen(false)}></div>
                        </>
                    )}
                </div>
            ) : (
                <Link href={href} as={button ? "button" : undefined} method={method} className={`nav-item ${className}`} aria-current={active ? "page" : undefined}>
                    {icon && <div className="nav-item-icon">{icon}</div>}
                    <div className="nav-item-label">{children}</div>
                </Link>
            )}
        </>
    );
};

const Content = ({ children, href, className = '', active = false, button=false, method=undefined}) => {
    return (
        <li>
            <Link href={href} as={button ? "button" : undefined} method={method} className={`nav-item-content ${className} ${active ? 'active' : ''}`}>
                {children}
            </Link>
        </li>
    );
};

NavItem.Content = Content;

export default NavItem;
