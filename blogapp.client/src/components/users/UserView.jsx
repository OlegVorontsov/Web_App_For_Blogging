import ImageComponent from '../ImageComponent';
import NewsByUser from '../news/News';

const UserView = ({user}) => {
    return (
      <div style={{textAlign: 'left'}}>
        <h2>{user.name}</h2>
        <div style={{display: 'flex'}}>
          <div className='image-box' style={{width: '50%', marginRight: '20px'}}>
            <ImageComponent base64String={user.photo} />
          </div>
          <div className='user-data'>
            <p>Email: {user.email}</p>
            <p>Description: {user.description}</p>
          </div>
      </div>
      <NewsByUser userId={user.id} />
      </div>  
    )
}
export default UserView;