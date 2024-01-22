import ErrorMessage from "../errorMessage/ErrorMessage";
import { Link } from "react-router-dom";


const Page404 = () => {
    return(
        <div>
          <ErrorMessage/> 
          <h1>Are you an idiot? what the fuck you trying to do???</h1>
          <Link to='/'>GO BACK!!!</Link> 
        </div>
    )
}

export default Page404;
