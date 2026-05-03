import { memo } from 'react';

export const CardSkeleton = memo(() => (
  <div className="rounded-2xl overflow-hidden card">
    <div className="aspect-[4/3] shimmer" />
    <div className="p-5 space-y-3">
      <div className="shimmer h-5 w-3/4 rounded-full" />
      <div className="shimmer h-4 w-1/2 rounded-full" />
      <div className="flex gap-2">
        <div className="shimmer h-3 w-16 rounded-full" />
        <div className="shimmer h-3 w-16 rounded-full" />
        <div className="shimmer h-3 w-16 rounded-full" />
      </div>
      <div className="flex justify-between items-center pt-2">
        <div className="shimmer h-6 w-20 rounded-full" />
        <div className="shimmer h-9 w-24 rounded-full" />
      </div>
    </div>
  </div>
));

CardSkeleton.displayName = 'CardSkeleton';

export const HeroSkeleton = memo(() => (
  <div className="h-screen shimmer" />
));

export default CardSkeleton;
