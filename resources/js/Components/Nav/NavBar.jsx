export default function NavBar({children, className = ''}) {
    return (
        <nav className={ "navbar " + className}>
            { children }
        </nav>
    )
}
