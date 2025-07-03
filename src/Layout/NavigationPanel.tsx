import { Menubar } from 'primereact/menubar';
export const NavigationPanel = () =>{
    const items = [
        {label:'Home'},
        {label:'Cart'}
    ];
    const start = <img alt="logo" src="https://primefaces.org/cdn/primereact/images/logo.png" height="40" className="mr-2"></img>;
    return (
        <div className="card">
            <Menubar model={items} start={start}/>
        </div>
    )
}
        