import { createReducer, on } from '@ngrx/store';
import * as OrderActions from './order.actions';

export interface OrderState {
  loading: boolean;
  order: any;
  orders: any[];
  error: any;
}

const initialState: OrderState = {
  loading: false,
  order: null,
  orders: [],
  error: null,
};

export const orderReducer = createReducer(
  initialState,
  on(
    OrderActions.createOrderRequest,
    OrderActions.getOrderByIdRequest,
    OrderActions.getOrderHistoryRequest,
    (state) => ({ ...state, loading: true, error: null })
  ),
  on(
    OrderActions.createOrderSuccess,
    OrderActions.getOrderByIdSuccess,
    (state, { order }) => ({ ...state, loading: false, order })
  ),
  on(
    OrderActions.createOrderFailure,
    OrderActions.getOrderByIdFailure,
    OrderActions.getOrderHistoryFailure,
    (state, { error }) => ({ ...state, loading: false, error })
  ),
  on(OrderActions.getOrderHistorySuccess, (state, { orders }) => ({
    ...state,
    loading: false,
    orders,
  }))
);
