export interface PricingRules {
    [key: string]: {
      name?: string;
      price: number;
      discount?: {
        buy: number;
        pay: number;
      };
      bulkDiscount?: {
        threshold: number;
        discountedPrice: number;
      };
    };
  }