import { put } from 'redux-saga/effects'
import axios from '../../axios-orders'

import * as actions from '../actions'

export function * initIngredientsSaga () {
  try {
    const response = yield axios.get(
      'https://burger-builder-d8334-default-rtdb.firebaseio.com/ingredients.json'
    )
    yield put(actions.setIngredients(response.data))
  } catch (error) {
    yield put(actions.fetchIngredientsFailed())
  }
}
