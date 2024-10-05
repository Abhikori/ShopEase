import { Injectable } from "@angular/core";
import { BASE_API_URL } from "../../config/api";
import { Store } from "@ngrx/store";
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
import { catchError, map, of } from "rxjs";
import { createOrderFailure, createOrderSuccess, getOrderByIdFailure, getOrderByIdSuccess, getOrderHistoryFailure, getOrderHistorySuccess } from "./order.actions";

@Injectable({
    providedIn:"root"
})
export class OrderService{

    API_BASE_URL=BASE_API_URL
    private headers;
    
    constructor(private store:Store,private http:HttpClient,private router:Router,private route:ActivatedRoute){
        this.headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        };
    }

    createOrder(reqData:any){
        const url=`${this.API_BASE_URL}/api/orders/`
        return this.http.post(url,reqData,{headers:this.headers}).pipe(
            map((data:any)=>{
                if(data.id){
                    this.router.navigate([`/checkout/payment/${data.id}`],{
                        queryParams:{steps:'3',order_id:data.id}
                    });
                }
                return createOrderSuccess({order:data});
            }),
            catchError((error:any)=>{
                return of(createOrderFailure(error.response && error.response.data.message ? error.response.data.message : error.message))
            })
        ).subscribe((action) => this.store.dispatch(action))
    }

    getOrderById(orderId:any){
        const url=`${this.API_BASE_URL}/api/orders/${orderId}`
        return this.http.get(url,{headers:this.headers}).pipe(
            map((data:any)=>{
                return getOrderByIdSuccess({order:data});
            }),
            catchError((error:any)=>{
                return of(getOrderByIdFailure(error.response && error.response.data.message ? error.response.data.message : error.message))
            })
        ).subscribe((action) => this.store.dispatch(action))
    }   

    getOrderHistory(){
        const url=`${this.API_BASE_URL}/api/orders/history`
        return this.http.get(url,{headers:this.headers}).pipe(
            map((data:any)=>{
                return getOrderHistorySuccess({orders:data});
            }),
            catchError((error:any)=>{
                return of(getOrderHistoryFailure(error.response && error.response.data.message ? error.response.data.message : error.message))
            })
        ).subscribe((action) => this.store.dispatch(action))
    }


}