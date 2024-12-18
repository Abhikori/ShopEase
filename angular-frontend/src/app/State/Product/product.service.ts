    import { Injectable } from "@angular/core";
    import { BASE_API_URL } from "../../config/api";
    import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
    import { Store } from "@ngrx/store";
    import { ActivatedRoute, Router } from "@angular/router";
    import { catchError, map, of } from "rxjs";
    import { findProductByCategoryFailure, findProductByCategorySuccess, findProductByIdFailure, findProductByIdSuccess } from "./product.action";

    @Injectable({
        providedIn:'root',
    })

    export class ProductService{
        API_BASE_URL=BASE_API_URL
        private getHeader():HttpHeaders{
            const token = localStorage.getItem('jwt');
            if (token) {
                // Return header with token if logged in
                return new HttpHeaders().set("Authorization", `Bearer ${token}`);
            } else {
                // Return an empty header if not logged in
                return new HttpHeaders();
            }
            // return new HttpHeaders().set("Authorization",`Bearer ${token}`);
        }

        constructor(
            private store:Store,
            private http:HttpClient,
            private router:Router,
            private route:ActivatedRoute
        ){}

        findProductsByCategory(reqData:any){
            const {colors,sizes,minPrice,maxPrice,minDiscount,category,stock,sort,pageNumber,pageSize}=reqData;

            let params=new HttpParams().set("color",colors).set("size",sizes).set("minPrice",minPrice).set("maxPrice",maxPrice).set("minDiscount",minDiscount).set("category",category).set("stock",stock).set("sort",sort).set("pageNumber",pageNumber).set("pageSize",pageSize);
            const headers=this.getHeader(); 
            const options = headers ? { headers, params } : { params };
            
            return this.http.get(`${this.API_BASE_URL}/api/products`,options).pipe(
                map((data:any)=>{
                    return findProductByCategorySuccess({payload:data})
                }),
                catchError((error:any)=>{
                    return of(findProductByCategoryFailure(
                        error.response && error.response.data.message ? error.response.data.message : error.message
                    ))
                })
            ).subscribe((action)=>this.store.dispatch(action))
        }

        findProductsById(productId:any){

        const headers=this.getHeader(); 
        const options = headers ? { headers } : {};
            return this.http.get(`${this.API_BASE_URL}/api/products/id/${productId}`,options).pipe(
                map((data:any)=>{
                    return findProductByIdSuccess({payload:data})
                }),
                catchError((error:any)=>{
                    return of(findProductByIdFailure(
                        error.response && error.response.data.message ? error.response.data.message : error.message
                    ))
                })
            ).subscribe((action)=>this.store.dispatch(action))
        }

    }