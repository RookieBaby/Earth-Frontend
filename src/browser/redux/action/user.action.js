import constActionType from '../constant/actionType'
import { showFlashMessage } from './flashMessage.action'

const updateInfo = result => ({
  type: constActionType.UPDATE,
  result
})

const updateAvatar = result => ({
  type: constActionType.UPDATE_AVATAR,
  result
})

const updateSuccess = () => ({
  message: '更新成功',
  type: 'success'
})

const updateFail = error => ({
  message: error,
  type: 'error'
})

const getUserInfoSuccess = result => ({
  type: constActionType.USER_GET_INFO_SUCCESS,
  result
})

/**
 * Update user info.
 *
 * @param {Object} [data] Info input by user, such as account and pwd.
 * @param {Function} [dispatch] Redux dispatch function.
 * @param {Function} [getState] Redux getState function.
 * @param {Object} [util] Redux middleware, such as fetch.
 * @returns {Object} Data responsed from server, for example:
 *   ```js
 *   {
 *     "id" : "ef88e24b-23a7-4ad1-bf3c-912f9d66e279",
 *     "phoneNumber" : "18262608001",
 *     "name" : "",
 *     "gender" : "x",
 *     "bio" : "",
 *     "avatar" : "default_avatar.jpg"
 *   }
 *   ```
 * @public
 */
export const update = data => async (dispatch, getState, util) => {
  try {
    let result = await util.api.updateUserInfo(data)
    if (result.status.code !== 0) {
      dispatch(showFlashMessage(updateFail(result.status.msg)))
    } else {
      dispatch(updateInfo(result.data))
      dispatch(showFlashMessage(updateSuccess()))
    }
    return result
  } catch (e) {
    console.error(e)
  }
}

/**
 * Update state after unlogined user upload avatar.
 *
 * @public
 */
export const updateAvatarUnlogined = result => dispatch => {
  result && dispatch(updateAvatar(result.data))
}

/**
 * Update state after logined user upload avatar.
 *
 * @public
 */
export const updateAvatarLogined = result => dispatch => {
  if (result) {
    dispatch(updateInfo(result.data))
    dispatch(showFlashMessage(updateSuccess()))
  }
}

export const getUserInfo = userId => async (dispatch, getState, util) => {
  try {
    let result = await util.api.getUserInfo(userId)
    if (result.status.code !== 0) {
      dispatch(showFlashMessage(updateFail(result.status.msg)))
    } else {
      dispatch(getUserInfoSuccess(result.data))
      dispatch(showFlashMessage(updateSuccess()))
    }
  } catch (e) {
    console.error(e)
  }
}
