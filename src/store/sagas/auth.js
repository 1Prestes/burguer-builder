import { call, delay, put } from 'redux-saga/effects'
import axios from 'axios'

import * as actions from '../actions'

export function * logoutSaga () {
  yield call([localStorage, 'removeItem'], 'token')
  yield call([localStorage, 'removeItem'], 'expirationDate')
  yield call([localStorage, 'removeItem'], 'userId')
  yield put(actions.logoutSucceed())
}

export function * checkAuthTimeoutSaga (action) {
  yield delay(action.expirationOnTime * 1000)
  yield put(actions.logout())
}

export function * authUserSaga (action) {
  yield put(actions.authStart())
  const authData = {
    email: action.email,
    password: action.password,
    returnSecureToken: true
  }
  let url =
    'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyArh3jABPr0m1sWLDgSHwlygUi6ON1dzUQ'
  if (!action.isSignUp) {
    url =
      'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyArh3jABPr0m1sWLDgSHwlygUi6ON1dzUQ'
  }
  try {
    const response = yield axios.post(url, authData)

    const expirationDate = yield new Date(
      new Date().getTime() + response.data.expiresIn * 1000
    )

    yield localStorage.setItem('token', response.data.idToken)
    yield localStorage.setItem('expirationDate', expirationDate)
    yield localStorage.setItem('userId', response.data.localId)

    yield put(actions.authSuccess(response.data.idToken, response.data.localId))
    yield put(actions.checkAuthTimeout(response.data.expiresIn))
  } catch (error) {
    yield put(actions.authFail(error.response.data.error))
  }
}

export function * authCheckStateSaga (action) {
  const token = yield localStorage.getItem('token')
  if (!token) {
    yield put(actions.logout())
  } else {
    const expirationDate = yield new Date(
      localStorage.getItem('expirationDate')
    )
    if (expirationDate < new Date()) {
      put(actions.logout())
    } else {
      const userId = yield localStorage.getItem('userId')
      yield put(actions.authSuccess(token, userId))
      yield put(
        actions.checkAuthTimeout(
          (expirationDate.getTime() - new Date().getTime()) / 1000
        )
      )
    }
  }
}
