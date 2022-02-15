import { useContext } from 'react';
import { GithubContext } from '../../context/Github/GithubContext';
import UsersItem from './UsersItem';


function UserResults() {
    const {loading, users} = useContext(GithubContext)
    if(!loading){
        return <div className='grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2'>
            {
                users.map((user)=>(
                    <UsersItem key={user.id} user = {user}/>
                ))
            }
        </div>
    }else{
        return <h3>Loading...</h3>
    }

}

export default UserResults;
