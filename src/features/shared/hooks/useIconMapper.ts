import { Car, DollarSign, ShoppingBag, Users, TrendingUp, Send, Clock, CheckCircle, ShoppingCart, type LucideIcon } from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  'car': Car,
  'dollar-sign': DollarSign,
  'shopping-bag': ShoppingBag,
  'users': Users,
  'trending-up': TrendingUp,
  'send': Send,
  'clock': Clock,
  'check-circle': CheckCircle,
  'shopping-cart': ShoppingCart,
};

export function useIconMapper(iconName: string): LucideIcon {
  return iconMap[iconName] || Car;
}
