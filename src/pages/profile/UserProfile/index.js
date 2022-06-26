import React from 'react';
import {connect} from 'react-redux';
import './index.style.less';
import {Tabs} from 'antd';
import PersonalInfo from './PersonalInfo';
import ChangePassword from './ChangePassword';
import Information from './Information';
// import Notification from './Notification';
import SocialLink from './SocialLink';
import UserManager from './UserManager';

import {HiUser} from 'react-icons/hi';
import {AiFillLock} from 'react-icons/ai';
import {FaBandcamp, FaNetworkWired} from 'react-icons/fa';
import {IoMdNotifications} from 'react-icons/io';
import accountData from '../../../@crema/services/db/account';
import IntlMessages from '../../../@crema/utility/IntlMessages';

const UserProfile = (role) => {
  const TabPane = Tabs.TabPane;
  console.log('flag====', role.role);
  // useEffect(() =>{
  //   const user_role = localStorage.getItem('role');
  //   // flag = user_role === "admin" ? true : false;
  // })
  return (
    <div className='user-profile-container'>
      <Tabs
        className='user-profile-tabs'
        defaultActiveKey='1'
        tabPosition='left'>
        <TabPane
          tab={
            <span className='user-profile-icon'>
              <HiUser className='icon' />
              <span>
                <IntlMessages id='userProfile.personalInfo' />
              </span>
            </span>
          }
          key='1'>
          <PersonalInfo />
        </TabPane>
        <TabPane
          tab={
            <span className='user-profile-icon'>
              <AiFillLock className='icon' />
              <span>
                <IntlMessages id='userProfile.changePassword' />
              </span>
            </span>
          }
          key='2'>
          <ChangePassword />
        </TabPane>
        <TabPane
          tab={
            <span className='user-profile-icon'>
              <FaBandcamp className='icon' />
              <span>
                <IntlMessages id='userProfile.information' />
              </span>
            </span>
          }
          key='3'>
          <Information />
        </TabPane>
        { 
        role.role & (<div>
          <TabPane
            tab={
              <span className='user-profile-icon'>
                <FaNetworkWired className='icon' />
                <span>
                  <IntlMessages id='userProfile.social' />
                </span>
              </span>
            }
            key='4'>
            <SocialLink socialLink={accountData.member} />
          </TabPane>
          </div>)}
          <TabPane
            tab={
              <span className='user-profile-icon'>
                <IoMdNotifications className='icon' />
                <span>
                  <IntlMessages id='userProfile.userList' />
                </span>
              </span>
            }
            key='6'>
            <UserManager />
          </TabPane>
        
        
        
      
      </Tabs>
    </div>
  );
};
const mapStateToProps = ({common}) =>{
  const flag = common.flag;
  return {flag};
}


export default connect(mapStateToProps, null)(UserProfile);
