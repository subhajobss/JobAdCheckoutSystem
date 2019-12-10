const express = require('express');
const bodyParser = require("body-parser");
const app = express();

// parses all the incoming request into valid json data.
app.use(bodyParser.json());


app.use((req,res,next) => {
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods","GET, POST, PATCH, DELETE, OPTIONS");
    next();
});


app.get('/api/rules',(req,res,next) =>{   
    let results = [
        { customerCode : 'SB',
          name : 'Second Bite', 
          offerDetails : [{
            minimumEligibleOfferNo : 3,
            discountedMinimumNo : 2,
            adType : 'Classic Ad'
          }]      
        },
        {
            customerCode : 'MR',
            name : 'MYER',
            offerDetails : [{
                adType : 'Standout Ad', 
                minimumEligibleOfferNo : 5,
                discountedMinimumNo : 4,
                              
            }
            ,
            {
                adType : 'Premium Ad', 
                reducedPrice  : 389.99
            }
        ]         
        },
        {
            customerCode : 'ACR',
            name : 'Axil Coffee Roasters',
            offerDetails : [
            {
                adType : 'Standout Ad', 
                reducedPrice  : 299.99
            }
        ]

        }
    ]
   
        res.status(200).json({
                   message:'Rules fetched successfully',
                   rules : results
       });
 });



    module.exports = app;