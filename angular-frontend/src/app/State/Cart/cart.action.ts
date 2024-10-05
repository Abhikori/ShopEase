import { createAction, props } from "@ngrx/store";

export const addItemToCartRequest=createAction("[Cart] Add Item To Cart Request",props<{reqData:any}>());
export const addItemToCartSuccess=createAction("[Cart] Add Item To Cart Success",props<{payload:any}>());
export const addItemToCartFailure=createAction("[Cart] Add Item To Cart Failure",props<{error:any}>());

export const getCartRequest=createAction("[Cart] Get Cart Request");
export const getCartSuccess=createAction("[Cart] Get Cart Success",props<{payload:any}>());
export const getCartFailure=createAction("[Cart] Get Cart Failure",props<{error:any}>());

export const removeCartItemRequest=createAction("[Cart] Remove Item From Cart Request",props<{reqData:any}>());
export const removeCartItemSuccess=createAction("[Cart] Remove Item From Cart Success",props<{payload:any}>());
export const removeCartItemFailure=createAction("[Cart] Remove Item From Cart Failure",props<{error:any}>());

export const updateCartItemRequest=createAction("[Cart] Update Item From Cart Request",props<{reqData:any}>());
export const updateCartItemSuccess=createAction("[Cart] Update Item From Cart Success",props<{payload:any}>());
export const updateCartItemFailure=createAction("[Cart] Update Item From Cart Failure",props<{error:any}>());