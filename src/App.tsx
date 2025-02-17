import Router from "@/Router"
import Proxy from "@/Proxy";


function App() {
    return (<>
        <Proxy>
            <Router />
        </Proxy>
    </>)
}

export default App
