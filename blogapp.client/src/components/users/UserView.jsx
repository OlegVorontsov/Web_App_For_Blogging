import ImageComponent from '../ImageComponent';
import { NewsProfileView } from '../news/News';
import ModalButton from '../ModalButton';
import NewsCreate from '../news/NewsCreate';
import { createNews } from '../../services/newsService';
import { PROFILE_URL } from '../../services/commonService';
import { UserSubsView } from './UserSubsView';

const UserView = ({user, isProfile}) => {

  const addNewNews = async (news) => {
    await createNews(news);
    window.location.href = PROFILE_URL;
  }

    return (
      <div style={{textAlign: 'left'}}>
        <h3>{user.name}</h3>
        <div style={{display: 'flex', gap: '20px', marginBottom: '10px'}}>
          <div className='user-img'>
            <ImageComponent base64String={user.photo} />
          </div>
          <div>
            <p>{user.email}</p>
            <p>{user.description}</p>
            { isProfile ? 
              <UserSubsView userId={user.id}/> :
            <div></div>
            }
          </div>
      </div>

      { isProfile ? 
      <div>
        <div style={{textAlign: 'right', marginRight: '10px', marginBottom: '10px'}}>
          <ModalButton
            btnName={'Add post'}
            modalContent = {<NewsCreate
                            id={0}
                            oldText={''}
                            oldImg={''}
                            setAction = {addNewNews}/>}
            title = 'New post' />
        </div>
        <NewsProfileView userId={user.id} isProfile={isProfile} />
      </div> : 
          <div>
            <NewsProfileView userId={user.id} isProfile={isProfile} />
          </div>}
      </div>  
    )
}
export default UserView;