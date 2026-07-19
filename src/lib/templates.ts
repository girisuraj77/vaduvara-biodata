import dynamic from "next/dynamic";
import React from "react";

// Modern minimal loading spinner fallback for dynamic split chunk retrieval using React.createElement (JSX-free) to prevent syntax parsing failures in pure .ts files
const TemplateLoader = () => React.createElement(
  "div",
  { className: "w-[794px] h-[1123px] bg-white flex items-center justify-center" },
  React.createElement("div", { className: "w-8 h-8 rounded-full border-2 border-zinc-200 border-t-primary animate-spin" })
);

// Dynamic lazy-loading components mapping (SSR disabled to ensure zero hydration mismatches)
export const TEMPLATE_COMPONENTS: Record<string, React.ComponentType<any>> = {
  // Database IDs / Store IDs
  "traditional_gold": dynamic(() => import("@/components/templates/traditional-gold").then(m => m.TraditionalGold), { loading: TemplateLoader, ssr: false }),
  "traditional-gold": dynamic(() => import("@/components/templates/traditional-gold").then(m => m.TraditionalGold), { loading: TemplateLoader, ssr: false }),
  "trad_maroon": dynamic(() => import("@/components/templates/traditional-gold").then(m => m.TraditionalGold), { loading: TemplateLoader, ssr: false }),
  "trad-maroon": dynamic(() => import("@/components/templates/traditional-gold").then(m => m.TraditionalGold), { loading: TemplateLoader, ssr: false }),

  "basic_template": dynamic(() => import("@/components/templates/basic-template").then(m => m.BasicTemplate), { loading: TemplateLoader, ssr: false }),
  "basic-template": dynamic(() => import("@/components/templates/basic-template").then(m => m.BasicTemplate), { loading: TemplateLoader, ssr: false }),
  "simple_leafy": dynamic(() => import("@/components/templates/basic-template").then(m => m.BasicTemplate), { loading: TemplateLoader, ssr: false }),
  "simple-leafy": dynamic(() => import("@/components/templates/basic-template").then(m => m.BasicTemplate), { loading: TemplateLoader, ssr: false }),

  "modern_teal": dynamic(() => import("@/components/templates/modern-teal").then(m => m.ModernTeal), { loading: TemplateLoader, ssr: false }),
  "modern-teal": dynamic(() => import("@/components/templates/modern-teal").then(m => m.ModernTeal), { loading: TemplateLoader, ssr: false }),
  "royal_gold": dynamic(() => import("@/components/templates/royal-gold").then(m => m.RoyalGold), { loading: TemplateLoader, ssr: false }),
  "royal-gold": dynamic(() => import("@/components/templates/royal-gold").then(m => m.RoyalGold), { loading: TemplateLoader, ssr: false }),
  "floral_gold": dynamic(() => import("@/components/templates/floral-gold").then(m => m.FloralGold), { loading: TemplateLoader, ssr: false }),
  "floral-gold": dynamic(() => import("@/components/templates/floral-gold").then(m => m.FloralGold), { loading: TemplateLoader, ssr: false }),
  "brown_bird": dynamic(() => import("@/components/templates/brown-bird").then(m => m.BrownBird), { loading: TemplateLoader, ssr: false }),
  "brown-bird": dynamic(() => import("@/components/templates/brown-bird").then(m => m.BrownBird), { loading: TemplateLoader, ssr: false }),
  "sona_sanskriti": dynamic(() => import("@/components/templates/sona-sanskriti").then(m => m.SonaSanskriti), { loading: TemplateLoader, ssr: false }),
  "sona-sanskriti": dynamic(() => import("@/components/templates/sona-sanskriti").then(m => m.SonaSanskriti), { loading: TemplateLoader, ssr: false }),
  "scarlet_aura": dynamic(() => import("@/components/templates/scarlet-aura").then(m => m.ScarletAura), { loading: TemplateLoader, ssr: false }),
  "scarlet-aura": dynamic(() => import("@/components/templates/scarlet-aura").then(m => m.ScarletAura), { loading: TemplateLoader, ssr: false }),
  "royal_amethyst": dynamic(() => import("@/components/templates/royal-amethyst").then(m => m.RoyalAmethyst), { loading: TemplateLoader, ssr: false }),
  "royal-amethyst": dynamic(() => import("@/components/templates/royal-amethyst").then(m => m.RoyalAmethyst), { loading: TemplateLoader, ssr: false }),
  "ivory_filigree": dynamic(() => import("@/components/templates/ivory-filigree").then(m => m.IvoryFiligree), { loading: TemplateLoader, ssr: false }),
  "ivory-filigree": dynamic(() => import("@/components/templates/ivory-filigree").then(m => m.IvoryFiligree), { loading: TemplateLoader, ssr: false }),

  // New Hindu Premium Templates
  "aura_crimson": dynamic(() => import("@/components/templates/aura-crimson").then(m => m.AuraCrimson), { loading: TemplateLoader, ssr: false }),
  "aura-crimson": dynamic(() => import("@/components/templates/aura-crimson").then(m => m.AuraCrimson), { loading: TemplateLoader, ssr: false }),
  "sanskrit_sandalwood": dynamic(() => import("@/components/templates/sanskrit-sandalwood").then(m => m.SanskritSandalwood), { loading: TemplateLoader, ssr: false }),
  "sanskrit-sandalwood": dynamic(() => import("@/components/templates/sanskrit-sandalwood").then(m => m.SanskritSandalwood), { loading: TemplateLoader, ssr: false }),
  "marigold_garden": dynamic(() => import("@/components/templates/marigold-garden").then(m => m.MarigoldGarden), { loading: TemplateLoader, ssr: false }),
  "marigold-garden": dynamic(() => import("@/components/templates/marigold-garden").then(m => m.MarigoldGarden), { loading: TemplateLoader, ssr: false }),
  "royal_peacock": dynamic(() => import("@/components/templates/royal-peacock").then(m => m.RoyalPeacock), { loading: TemplateLoader, ssr: false }),
  "royal-peacock": dynamic(() => import("@/components/templates/royal-peacock").then(m => m.RoyalPeacock), { loading: TemplateLoader, ssr: false }),
  "temple_lotus": dynamic(() => import("@/components/templates/temple-lotus").then(m => m.TempleLotus), { loading: TemplateLoader, ssr: false }),
  "temple-lotus": dynamic(() => import("@/components/templates/temple-lotus").then(m => m.TempleLotus), { loading: TemplateLoader, ssr: false }),

  // ── Muslim Templates ──
  "emerald_paradise": dynamic(() => import("@/components/templates/emerald-paradise").then(m => m.EmeraldParadise), { loading: TemplateLoader, ssr: false }),
  "emerald-paradise": dynamic(() => import("@/components/templates/emerald-paradise").then(m => m.EmeraldParadise), { loading: TemplateLoader, ssr: false }),
  "turquoise_arabesque": dynamic(() => import("@/components/templates/turquoise-arabesque").then(m => m.TurquoiseArabesque), { loading: TemplateLoader, ssr: false }),
  "turquoise-arabesque": dynamic(() => import("@/components/templates/turquoise-arabesque").then(m => m.TurquoiseArabesque), { loading: TemplateLoader, ssr: false }),
  "midnight_lantern": dynamic(() => import("@/components/templates/midnight-lantern").then(m => m.MidnightLantern), { loading: TemplateLoader, ssr: false }),
  "midnight-lantern": dynamic(() => import("@/components/templates/midnight-lantern").then(m => m.MidnightLantern), { loading: TemplateLoader, ssr: false }),
  "sandstone_grace": dynamic(() => import("@/components/templates/sandstone-grace").then(m => m.SandstoneGrace), { loading: TemplateLoader, ssr: false }),
  "sandstone-grace": dynamic(() => import("@/components/templates/sandstone-grace").then(m => m.SandstoneGrace), { loading: TemplateLoader, ssr: false }),
  "imperial_nikah": dynamic(() => import("@/components/templates/imperial-nikah").then(m => m.ImperialNikah), { loading: TemplateLoader, ssr: false }),
  "imperial-nikah": dynamic(() => import("@/components/templates/imperial-nikah").then(m => m.ImperialNikah), { loading: TemplateLoader, ssr: false }),

  // ── Christian Templates ──
  "celestial_grace": dynamic(() => import("@/components/templates/celestial-grace").then(m => m.CelestialGrace), { loading: TemplateLoader, ssr: false }),
  "celestial-grace": dynamic(() => import("@/components/templates/celestial-grace").then(m => m.CelestialGrace), { loading: TemplateLoader, ssr: false }),
  "ivory_chapel": dynamic(() => import("@/components/templates/ivory-chapel").then(m => m.IvoryChapel), { loading: TemplateLoader, ssr: false }),
  "ivory-chapel": dynamic(() => import("@/components/templates/ivory-chapel").then(m => m.IvoryChapel), { loading: TemplateLoader, ssr: false }),
  "azure_faith": dynamic(() => import("@/components/templates/azure-faith").then(m => m.AzureFaith), { loading: TemplateLoader, ssr: false }),
  "azure-faith": dynamic(() => import("@/components/templates/azure-faith").then(m => m.AzureFaith), { loading: TemplateLoader, ssr: false }),
  "rose_garden": dynamic(() => import("@/components/templates/rose-garden").then(m => m.RoseGarden), { loading: TemplateLoader, ssr: false }),
  "rose-garden": dynamic(() => import("@/components/templates/rose-garden").then(m => m.RoseGarden), { loading: TemplateLoader, ssr: false }),
  "silver_blessing": dynamic(() => import("@/components/templates/silver-blessing").then(m => m.SilverBlessing), { loading: TemplateLoader, ssr: false }),
  "silver-blessing": dynamic(() => import("@/components/templates/silver-blessing").then(m => m.SilverBlessing), { loading: TemplateLoader, ssr: false }),

  // ── Sikh Templates ──
  "golden_khanda": dynamic(() => import("@/components/templates/golden-khanda").then(m => m.GoldenKhanda), { loading: TemplateLoader, ssr: false }),
  "golden-khanda": dynamic(() => import("@/components/templates/golden-khanda").then(m => m.GoldenKhanda), { loading: TemplateLoader, ssr: false }),
  "saffron_glory": dynamic(() => import("@/components/templates/saffron-glory").then(m => m.SaffronGlory), { loading: TemplateLoader, ssr: false }),
  "saffron-glory": dynamic(() => import("@/components/templates/saffron-glory").then(m => m.SaffronGlory), { loading: TemplateLoader, ssr: false }),
  "anand_karaj": dynamic(() => import("@/components/templates/anand-karaj").then(m => m.AnandKaraj), { loading: TemplateLoader, ssr: false }),
  "anand-karaj": dynamic(() => import("@/components/templates/anand-karaj").then(m => m.AnandKaraj), { loading: TemplateLoader, ssr: false }),
  "punjab_heritage": dynamic(() => import("@/components/templates/punjab-heritage").then(m => m.PunjabHeritage), { loading: TemplateLoader, ssr: false }),
  "punjab-heritage": dynamic(() => import("@/components/templates/punjab-heritage").then(m => m.PunjabHeritage), { loading: TemplateLoader, ssr: false }),
  "steel_akali": dynamic(() => import("@/components/templates/steel-akali").then(m => m.SteelAkali), { loading: TemplateLoader, ssr: false }),
  "steel-akali": dynamic(() => import("@/components/templates/steel-akali").then(m => m.SteelAkali), { loading: TemplateLoader, ssr: false }),
};

export const DEFAULT_TEMPLATE = dynamic(() => import("@/components/templates/traditional-gold").then(m => m.TraditionalGold), { loading: TemplateLoader, ssr: false });
