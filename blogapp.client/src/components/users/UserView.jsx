import ImageComponent from '../ImageComponent';
import { NewsByUser, NewsProfileView } from '../news/News';
import ModalButton from '../ModalButton';
import NewsCreate from '../news/NewsCreate';
import { createNews } from '../../services/newsService';
import { PROFILE_URL } from '../../services/commonService';

const UserView = ({user, isProfile}) => {

  const addNewNews = async (news) => {
    await createNews(news);
    window.location.href = PROFILE_URL;
  }

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

      {isProfile ? 
      <div>
        <ModalButton
          btnName={'Add post'}
          modalContent = {<NewsCreate id={0} oldText={''} oldImg={''} setAction = {addNewNews}/>}
          title = 'New post' />
        <NewsProfileView userId={user.id} />
      </div> : 
          <NewsByUser userId={user.id} />}
      </div>  
    )
}
export default UserView;