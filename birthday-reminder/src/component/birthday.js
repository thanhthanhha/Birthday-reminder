import { Helmet } from "react-helmet";
import favicon from '../icon.png'
const Birthday = () => {
    return <> 
    <h2>Birthday Reminder</h2>
    <Helmet>
        <title>Birthday Reminder</title>
            <link rel="icon" type="image/png" href={favicon}/>
    </Helmet>
    </>
};

export default Birthday