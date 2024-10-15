import { Injectable } from "@angular/core";
import { BASE_API_URL } from "../../config/api";
import { Store } from "@ngrx/store";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
import { addItemToCartFailure, addItemToCartSuccess, getCartFailure, getCartSuccess, removeCartItemSuccess } from "./cart.action";
import { catchError, map, of } from "rxjs";

@Injectable({
    providedIn:"root"
})
export class CartService{
    API_BASE_URL=BASE_API_URL
    
    constructor(private store:Store,private http:HttpClient,private router:Router,private route:ActivatedRoute){}

    addItemToCart(reqData:any){
        const url=`${this.API_BASE_URL}/api/cart/add`
        
        const headers=new HttpHeaders({
            'Content-Type':'application/json',
            'Authorization':`Bearer ${localStorage.getItem("jwt")}`
        });
        return this.http.put(url,reqData,{headers:headers}).pipe(
            map((data:any)=>{
                return addItemToCartSuccess({payload:data})
            }),
            catchError((error:any)=>{
                return of(addItemToCartFailure(error.response && error.response.data.message ? error.response.data.message : error.message))
            })
        ).subscribe((action) => this.store.dispatch(action))
    }

    getCart(){
        const url=`${this.API_BASE_URL}/api/cart/`
        const headers=new HttpHeaders({
            'Content-Type':'application/json',
            'Authorization':`Bearer ${localStorage.getItem("jwt")}`
        });
        return this.http.get(url,{headers}).pipe(
            map((data:any)=>{
                return getCartSuccess({payload:data})
            }),
            catchError((error:any)=>{
                return of(getCartFailure(error.response && error.response.data.message ? error.response.data.message : error.message))
            })
        ).subscribe((action) => this.store.dispatch(action))
    }

    removeCartItem(cartItemId:any){
        const url=`${this.API_BASE_URL}/api/cart/cart_items/${cartItemId}`
        const headers=new HttpHeaders({
            'Content-Type':'application/json',
            'Authorization':`Bearer ${localStorage.getItem("jwt")}`
        });
        return this.http.delete(url,{headers}).pipe(
            map((data:any)=>removeCartItemSuccess({payload:data})),
            catchError((error:any)=>{
                return of(addItemToCartFailure(error.response && error.response.data.message ? error.response.data.message : error.message))
            })
        ).subscribe((action) => this.store.dispatch(action))
    }

    updateCartItem(reqData:any){
        const url=`${this.API_BASE_URL}/api/cart/cart_items/${reqData.cartItemId}`
        const headers=new HttpHeaders({
            'Content-Type':'application/json',
            'Authorization':`Bearer ${localStorage.getItem("jwt")}`
        });
        return this.http.put(url,reqData,{headers}).pipe(
            map((data:any)=>addItemToCartSuccess({payload:data})),
            catchError((error:any)=>{
                return of(addItemToCartFailure(error.response && error.response.data.message ? error.response.data.message : error.message))
            })
        ).subscribe((action) => this.store.dispatch(action))
    }

}