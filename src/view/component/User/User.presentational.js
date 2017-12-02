import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import { NavLink } from 'react-router-dom'
import { Sticky, StickyContainer } from 'react-sticky'
import Avatar from '_common_ui/Avatar'
import Header from '../../layout/Header/Header.connected'
import Footer from '../../layout/Footer/Footer.presentational'
import styles from './index.less'

@CSSModules(styles)
class User extends Component {
    static propTypes = {
        userInfo: PropTypes.object
    }
    render () {
        let { userInfo } = this.props
        let avatarSrc = userInfo ? userInfo.avatar : ''
        const cards = new Array(16).fill('')
        return (
            <div styleName="container">
                { avatarSrc
                    ? <Header buttonLink="/newphoto" buttonName="发布" avatarSrc={avatarSrc} nofixed />
                    : <Header buttonLink="/register" buttonName="注册" nofixed />
                }
                <StickyContainer>
                    <div styleName="top-background" style={{backgroundImage: 'url(/img/common/personal_bg.jpg)'}}>
                        <div styleName="homepage-userinfo">
                            <Avatar src={avatarSrc} title="更换头像" />
                            <div styleName="name">{userInfo.name}</div>
                            <div styleName="bio">{userInfo.bio}</div>
                            {/* <div styleName="location">陕西省-西安市-雁塔区</div> */}
                            <div styleName="follow-btn">已关注</div>
                        </div>
                    </div>
                    <Sticky relative>
                        {
                            ({ isSticky, style }) => {
                                console.log(isSticky)
                                return <div className={styles.navTop} style={style}>
                                    <NavLink to="/user" activeClassName={styles.active}>
                                        <div className={styles.navMenu}>帖子</div>
                                    </NavLink>
                                    <NavLink to="/settings/account" activeClassName={styles.active}>
                                        <div className={styles.navMenu}>收藏夹</div>
                                    </NavLink>
                                    <NavLink to="/settings/account" activeClassName={styles.active}>
                                        <div className={styles.navMenu}>个人资料</div>
                                    </NavLink>
                                </div>
                            }
                        }
                    </Sticky>
                    <div styleName="main">
                        { cards.map((card, index) =>
                            <div key={index} styleName="card">
                                <img src={`img/test/${index + 1}.jpg`} alt="" />
                                <div styleName="card-info">
                                    <span>喜欢</span>
                                    <span>评论</span>
                                </div>
                            </div>)
                        }
                    </div>
                    <Footer />
                </StickyContainer>
            </div>
        )
    }
}

export default User
