export default function NavContainer({ children, className='' }){
    return (
        <div className={ 'nav-container ' + className}>
            { children }
        </div>
    )
}
