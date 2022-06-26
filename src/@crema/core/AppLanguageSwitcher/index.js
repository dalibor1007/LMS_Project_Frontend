import React from 'react';
import PropTypes from 'prop-types';
import './index.style.less';
const AppLanguageSwitcher = () => {


  return (
    <>
      {/* <Dropdown
      className="hidden"
        overlay={menu}
        trigger={['click']}
        overlayStyle={{zIndex: 1052}}>
        <a
          className='ant-dropdown-link langBtn'
          onClick={(e) => e.preventDefault()}>
          <span className='lang-icon'>
            <IoLanguageOutline />
          </span>
          <span className='lang-text'>{locale.name}</span>
        </a>
      </Dropdown> */}
    </>
  );
};

export default AppLanguageSwitcher;

AppLanguageSwitcher.defaultProps = {
  iconOnly: false,
};

AppLanguageSwitcher.propTypes = {
  iconOnly: PropTypes.bool,
};
