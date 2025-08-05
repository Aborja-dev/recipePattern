import { Pricing } from './../types/types';

export const PricingEngine = {
    calculateDiscounts: (pricing: Pricing) => {
        let totalDiscount = 0;
        if (pricing.vip) totalDiscount += 0.1;
        if (pricing.discount) totalDiscount += pricing.discount;
        if (pricing.bulk) totalDiscount += 0.05;
        return Math.min(totalDiscount, 0.95); // Cap máximo
    },
    
    calculateSurcharges: (basePrice: number, pricing: Pricing) => {
        let surcharges = 0;
        if (pricing.express) surcharges += basePrice * 0.15;
        if (!pricing.local) surcharges += basePrice * 0.15;
        return surcharges;
    },
    calculate : (basePrice: number, pricing: Pricing) => {
        const discount = PricingEngine.calculateDiscounts(pricing);
        const surcharges = PricingEngine.calculateSurcharges(basePrice, pricing);
        return {
            total: basePrice - (basePrice * discount) + surcharges,
            totalDiscount: discount,
        }
    },
}