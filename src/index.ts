import { Checkout } from './checkout';
import { PricingRules } from './pricingRules'


const pricingRules: PricingRules = {
    ipd: { name: 'Super iPad', price: 549.99, bulkDiscount: { threshold: 4, discountedPrice: 499.99 } },
    mbp: { name: 'Macbook Pro', price: 1399.99 },
    atv: { name: 'Apple TV', price: 109.5, discount: { buy: 3, pay: 2 } },
    vga: { name: 'VGA adaptor', price: 30.0 },
  };
  
  const co = new Checkout(pricingRules);
  co.scan("atv");
  co.scan("atv");
  co.scan("atv");
  co.scan("vga");
  console.log("Total expected:", co.total()); // Output: $249.00
  
  const co2 = new Checkout(pricingRules);
  co2.scan("atv");
  co2.scan("ipd");
  co2.scan("ipd");
  co2.scan("atv");
  co2.scan("ipd");
  co2.scan("ipd");
  co2.scan("ipd");
  console.log("Total expected:", co2.total());