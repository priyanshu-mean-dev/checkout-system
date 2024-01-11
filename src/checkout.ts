import { PricingRules } from './pricingRules'

export class Checkout {
    private pricingRules: PricingRules;
    private scannedItems: string[];
  
    constructor(pricingRules: PricingRules) {
      this.pricingRules = pricingRules;
      this.scannedItems = [];
    }
  
    scan(item: string): void {
      this.scannedItems.push(item);
    }
  
    total(): number {
      const itemCounts: { [key: string]: number } = {};
      this.scannedItems.forEach((item) => {
        itemCounts[item] = (itemCounts[item] || 0) + 1;
      });
  
      let total = 0;
  
      for (const sku in itemCounts) {
        if (itemCounts.hasOwnProperty(sku)) {
          const count = itemCounts[sku];
          if (this.pricingRules[sku]?.discount) {
            total += this.applyDiscount(sku, count);
          } else if (this.pricingRules[sku]?.bulkDiscount) {
            total += this.applyBulkDiscount(sku, count);
          } else {
            total += count * this.pricingRules[sku].price;
          }
        }
      }
  
      return total;
    }
  
    private applyDiscount(sku: string, count: number): number {
      const basePrice = this.pricingRules[sku].price;
      const discountInfo = this.pricingRules[sku].discount;
      const discountedCount = Math.floor(count / discountInfo.buy) * discountInfo.pay;
      const remainingCount = count % discountInfo.buy;
      return discountedCount * basePrice + remainingCount * basePrice;
    }
  
    private applyBulkDiscount(sku: string, count: number): number {
        const basePrice = this.pricingRules[sku].price;
        const bulkDiscountInfo = this.pricingRules[sku].bulkDiscount;
        
        if (count > bulkDiscountInfo.threshold) {
          return count * bulkDiscountInfo.discountedPrice;
        }
        
        return count * basePrice;
      }
  }


