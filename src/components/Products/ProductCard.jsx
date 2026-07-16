import { forwardRef } from 'react';
import { ShieldCheck } from 'lucide-react';

/**
 * ProductCard
 * -----------
 * Deliberately restrained hover: a slight elevation, a soft border-glow,
 * and image parallax — no rotation, no bounce, no exaggerated scale.
 * Typography for strength/generic uses a monospace face to read as
 * clinical data rather than marketing copy.
 */
const ProductCard = forwardRef(function ProductCard(
  { product, index, onOpen, isActive },
  ref
) {
  return (
    <div
      ref={ref}
      data-reveal
      onClick={(e) => onOpen(product, e.currentTarget)}
      style={{
        opacity: isActive ? 0 : undefined,
        // gentle organic offset every 3rd card — not a rigid grid
        marginTop: index % 3 === 1 ? '28px' : 0,
      }}
      className="prod-card group relative flex cursor-pointer flex-col justify-between rounded-[20px] border border-[#1B2740] bg-[#0B1220]/80 p-7 text-left shadow-[0_1px_0_0_rgba(255,255,255,0.03)_inset] backdrop-blur-sm transition-[transform,border-color,box-shadow] duration-500 ease-out will-change-transform hover:-translate-y-1.5 hover:border-[#7FD8D0]/30 hover:shadow-[0_24px_60px_-20px_rgba(0,0,0,0.7),0_0_0_1px_rgba(127,216,208,0.06)]"
    >
      {/* image */}
      <div className="relative mb-8 flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-xl bg-gradient-to-b from-white/[0.03] to-transparent">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          decoding="async"
          className="max-h-[85%] object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)] transition-transform duration-700 ease-out will-change-transform group-hover:scale-[1.06] group-hover:-translate-y-1"
        />
      </div>

      {/* copy */}
      <div className="mt-auto flex flex-col border-t border-white/[0.06] pt-5">
        <h3 className="mb-1.5 text-[26px] font-semibold tracking-tight text-[#E7ECF3]">
          {product.name}
        </h3>
        <p className="mb-4 font-mono text-[10.5px] uppercase tracking-[0.14em] text-[#7C8BA3]">
          {product.generic.trim()}
        </p>
        <div className="flex w-fit items-center gap-1.5 rounded-full border border-[#7FD8D0]/25 bg-[#7FD8D0]/[0.08] px-3.5 py-1.5 font-mono text-[11px] font-medium tracking-[0.04em] text-[#9FE6DF]">
          {product.strength}
        </div>
      </div>

      {/* corner mark — subtle scientific reference, not decoration */}
      <span className="absolute right-6 top-6 font-mono text-[10px] tracking-[0.1em] text-white/15 transition-colors duration-500 group-hover:text-[#7FD8D0]/40">
        {String(product.id).padStart(2, '0')}
      </span>
    </div>
  );
});

export default ProductCard;

export function TrustBadge({ icon: Icon, title, desc }) {
  return (
    <div className="prod-badge-item group flex items-center gap-3.5">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.02] text-[#9FE6DF] transition-colors duration-300 group-hover:border-[#7FD8D0]/30">
        <Icon className="h-[18px] w-[18px] stroke-[1.75]" />
      </div>
      <div className="flex flex-col text-left">
        <span className="text-[13px] font-semibold text-[#E7ECF3]">{title}</span>
        <span className="font-mono text-[10.5px] uppercase tracking-[0.08em] text-[#7C8BA3]">
          {desc}
        </span>
      </div>
    </div>
  );
}