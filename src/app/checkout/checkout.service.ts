import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({providedIn:'root'})
export class CheckoutService {
    constructor(private http : HttpClient){

    }

    getPricingRules () :Observable<any>{

        return this.http.get('http://localhost:3000/api/rules');
    //    return this.http.get('http://localhost:3000/api/rules').subscribe(response =>{
    //         debugger;
    //         console.log('data@@@@@@@@@@@@@@22', response);
    //    });
    }
}