import { Component, Input, OnInit } from '@angular/core';
import { CheckoutService } from './checkout.service';
@Component({
  selector: 'checkout',
  templateUrl: './checkout-component.html',
  styleUrls: ['./checkout-component.scss']
})
export class CheckoutComponent implements OnInit{

    selectedCustomer:string;    
    classicAdCount = 0; standoutAdCount=0;premiumAdCount =0;  
    offerMessage : string;
    customers:Customer[] = [
        {id:1,value:'DEF',viewValue:'Default'},
        {id:2,value:'SB',viewValue:'SecondBite'},
        {id:3,value:'ACR',viewValue:'Axil Coffee Roasters'},
        {id:4,value:'MR',viewValue:'MYER'}
      ];
    jobAdsList : Advertisement[] = [
        {id:1,type:'Classic Ad',description:'BasicLevel',price:269.99},
        {id:1,type:'Standout Ad',description:'Company logo and longer presentation text',price:322.99},
        {id:1,type:'Premium Ad',description:'Ads at the top of the results,higher visibility',price:394.99}
    ];
    totalAmount : number = 0;
    pricingRules : PricingRules[];
    privilegedCustomer;dealForCustomer;
    constructor(private checkoutService : CheckoutService){}

    ngOnInit(){
        this.checkoutService.getPricingRules().subscribe(response =>{
            this.pricingRules = response.rules;         
        });
    }

    
    onCustomerSelection(){
        this.dealForCustomer = '';
        this.privilegedCustomer = this.pricingRules.find( item => item.customerCode === this.selectedCustomer);
        this.privilegedCustomer.offerDetails.forEach(element => {                    
           if(element.minimumEligibleOfferNo) {
            this.dealForCustomer = `${element.minimumEligibleOfferNo} for ${element.discountedMinimumNo} deal on ${element.adType}s`;
           }else if(element.reducedPrice){              
            this.dealForCustomer =  this.dealForCustomer + ` ,Price drops to ${element.reducedPrice} for ${element.adType}s`;
           }            
          
        }); 
          
        this.totalAmount = 0;
        this.classicAdCount = 0; this.standoutAdCount=0;this.premiumAdCount =0;  
        this.offerMessage = ''
    }

   
  addItemWithOffer(selectedAd){
    let adCount:number  = this.addCount(selectedAd);
    let offer = this.privilegedCustomer ? this.privilegedCustomer.offerDetails.find( item => item.adType === selectedAd.type):'';  
    
    if(offer){        
        if(offer.minimumEligibleOfferNo){              
            if(adCount >= offer.minimumEligibleOfferNo && (adCount % offer.minimumEligibleOfferNo == 0)){               
                let countAftDiscount = offer.discountedMinimumNo *(adCount/offer.minimumEligibleOfferNo);
                this.totalAmount = selectedAd.price * (countAftDiscount)
                this.offerMessage = `Offer Applied: Total no of ${selectedAd.type}s : ${adCount} Price Calculated for ${countAftDiscount} Ads`;                       
            } else{
                this.offerMessage = ''
                this.totalAmount += selectedAd.price;
            }  
           
        } else if (offer.reducedPrice)  {
            this.offerMessage = `Reduced Price $ ${offer.reducedPrice} Applied`;
            this.totalAmount += offer.reducedPrice;
        }      
        //applyOffer()
    }else{
        this.offerMessage = ''
        this.totalAmount += selectedAd.price;
    }

    }

    addItem(jobAd){
        this.addCount(jobAd);
        this.totalAmount +=jobAd.price;
    }

   
  
    addCount(jobAd):number{
        switch(jobAd.type) { 
            case 'Classic Ad':  return ++this.classicAdCount; 
            case 'Standout Ad': return ++this.standoutAdCount;
            case 'Premium Ad': return ++this.premiumAdCount;
       } 
    }

}

export interface Advertisement{
    id:number;
    type:string;
    description:string;
    price:number;    
}


export interface Customer {
    id: number;
    value:string
    viewValue: string;
  }
  
  export class PricingRules {
    customerCode : string;
    name : string;
    offerDetails : OfferDetails[];
  }
  export class OfferDetails{
    adType : string;
    discountedMinimumNo : number;
    minimumEligibleOfferNo : number;
    reducedPrice : number;

  }
  