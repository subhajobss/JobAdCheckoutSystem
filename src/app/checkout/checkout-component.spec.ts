import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CheckoutComponent } from './checkout-component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { CheckoutService } from './checkout.service';

describe('AppComponent', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [
          RouterTestingModule,
          HttpClientModule
        ],
        declarations: [
          CheckoutComponent
        ],
        providers:[CheckoutService],
        schemas: [NO_ERRORS_SCHEMA]
      }).compileComponents();
    }));

    beforeEach(() => TestBed.configureTestingModule({
        imports: [HttpClientTestingModule], 
       // providers: []
      }));

    it('should create the app', () => {
        const fixture = TestBed.createComponent(CheckoutComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
      });

      it('should test addItemWithOffer',()=>{
        const fixture = TestBed.createComponent(CheckoutComponent);
        const app = fixture.debugElement.componentInstance;
        let selectedAd =  {id:1,type:'Classic Ad',description:'BasicLevel',price:269.99};
        app.addItemWithOffer(selectedAd);
        expect(app.totalAmount).toBe(269.99);
      });
      it('should test addItemWithOffer when minimumEligibleOfferNo is present in response',()=>{
        const fixture = TestBed.createComponent(CheckoutComponent);
        const app = fixture.debugElement.componentInstance;
        app.addCount = () => 3;
        app.privilegedCustomer = { 
              customerCode : 'SB',
              name : 'Second Bite', 
              offerDetails : [{
                    minimumEligibleOfferNo : 3,
                    discountedMinimumNo : 2,
                    adType : 'Classic Ad'
              }]
        }
        
        let selectedAd =  {id:1,type:'Classic Ad',description:'BasicLevel',price:269.99};
        app.addItemWithOffer(selectedAd);
        console.log(app.totalAmount,'###############################################')
        expect(app.totalAmount).toBe(539.98);
        expect(app.offerMessage).toBe('Offer Applied: Total no of Classic Ads : 3 Price Calculated for 2 Ads');
      });

      it('should test addItemWithOffer when reduced price is present in response',()=>{
        const fixture = TestBed.createComponent(CheckoutComponent);
        const app = fixture.debugElement.componentInstance;
        
        app.privilegedCustomer = { 
              customerCode : 'ACR',
              name : 'Axil Coffee Roasters',
              offerDetails : [{
                  adType : 'Standout Ad', 
                  reducedPrice  : 80
              }]
            }
            app.addCount = () => 3;
        
        let selectedAd =  {id:1,type:'Standout Ad',description:'BasicLevel',price:100};
        app.addItemWithOffer(selectedAd);
        console.log(app.totalAmount,'###############################################')
        expect(app.totalAmount).toBe(80);
        expect(app.offerMessage).toBe('Reduced Price $ 80 Applied');
      })
      
});