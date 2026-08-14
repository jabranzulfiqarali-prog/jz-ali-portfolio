import { useState, useEffect, useMemo, useId, useRef } from "react";
import {
  ShoppingCart,
  X,
  Menu,
  Instagram,
  Mail,
  ArrowRight,
  ArrowUpRight,
  Upload,
  Plus,
  Minus,
  Trash2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Eye,
  ZoomIn,
  Globe,
  Palette,
  Award,
  CheckCircle2,
  Heart,
  Link2,
} from "lucide-react";

// -----------------------------
// Mock Data
// -----------------------------
const ARTWORKS = [
  {
    id: 1,
    title: "Obsidian Reverie",
    category: "Monochrome Oils",
    price: 4200,
    medium: "Oil on canvas",
    dimensions: '48" x 60"',
    year: 2024,
    sold: false,
    img: "/images/art01-img.jpg",
    detailImg1: "/images/art01-detailImg1.jpg",
    detailImg2: "/images/art01-detailImg2.jpg",
    story:
      "She came to the studio on a grey November afternoon and asked to be painted the way she felt, not the way she looked. Obsidian Reverie is the result — a figure dissolving into smoke and umber, more felt than seen. Some nights, sitting with the finished canvas, the artist still isn't sure if she's arriving or leaving. That uncertainty is the whole point.",
  },
  {
    id: 2,
    title: "Golden Hour Study No. 3",
    category: "Limited Prints",
    price: 320,
    medium: "Archival giclée print",
    dimensions: '24" x 32"',
    year: 2023,
    sold: false,
    img: "/images/art02-img.jpg",
    detailImg1: "/images/art02-detailImg1.jpg",
    detailImg2: "/images/art02-detailImg2.jpg",
    story:
      "There's a particular ten minutes each evening on the coast when the light turns everything to copper, and this horse happened to be standing exactly where it landed. The artist sketched fast, chasing the moment before it slipped away, and finished the rest from memory back in the studio. Golden Hour Study No. 3 is less a portrait of an animal than a portrait of that ten minutes. Limited to 50 signed editions, because moments like that don't repeat.",
  },
  {
    id: 3,
    title: "Quiet Monolith",
    category: "Monochrome Oils",
    price: 6800,
    medium: "Acrylic on panel",
    dimensions: '40" x 40"',
    year: 2024,
    sold: true,
    img: "/images/art03-img.jpg",
    detailImg1: "/images/art03-detailImg1.jpg",
    detailImg2: "/images/art03-detailImg2.jpg",
    story:
      "He stands with his back to us, and that was deliberate — the artist wanted a figure you complete yourself, not one who tells you how to feel. Quiet Monolith was painted during a stretch of solitude the artist rarely talks about, and something of that silence made it into the surface. The pigment oxidizes slowly over years, so the piece is quietly still changing, the way memory does. It's the only work in the collection built to keep aging after it leaves the studio.",
  },
  {
    id: 4,
    title: "Ember & Ash",
    category: "Limited Prints",
    price: 280,
    medium: "Archival giclée print",
    dimensions: '18" x 24"',
    year: 2022,
    sold: false,
    img: "/images/art04-img.jpg",
    detailImg1: "/images/art04-detailImg1.jpg",
    detailImg2: "/images/art04-detailImg2.jpg",
    story:
      "The artist stood closer to a wildfire evacuation line than he probably should have, watching a band of horses run for open ground through drifting embers. Ember & Ash carries that fear and that awe in the same brushstroke — destruction and survival painted as one motion. It's the piece he returns to most when talking about why he paints at all. A portion of every sale goes back to the land the horses were running from.",
  },
  {
    id: 5,
    title: "Nocturne in Bronze",
    category: "Monochrome Oils",
    price: 5400,
    medium: "Mixed media on canvas",
    dimensions: '36" x 48"',
    year: 2023,
    sold: false,
    img: "/images/art05-img.jpg",
    detailImg1: "/images/art05-detailImg1.jpg",
    detailImg2: "/images/art05-detailImg2.jpg",
    story:
      "Long after the last train, the artist used to walk home through empty streets slicked with rain and sodium light, and this figure is built from a hundred versions of that walk. Nocturne in Bronze isn't any one person — it's the particular hush of a city once everyone else has gone home. The muted, hand-mixed tones took months to get right, because that kind of quiet doesn't photograph. It has to be remembered into being.",
  },
  {
    id: 6,
    title: "Vestige",
    category: "Charcoal Studies",
    price: 3900,
    medium: "Charcoal on linen",
    dimensions: '30" x 40"',
    year: 2021,
    sold: true,
    img: "/images/art06-img.jpg",
    detailImg1: "/images/art06-detailImg1.jpg",
    detailImg2: "/images/art06-detailImg2.jpg",
    story:
      "An early piece, made during a period when the artist was more interested in what gets forgotten than what gets remembered. The face is only half-resolved, deliberately left to dissolve into the grain of the linen, the way a memory blurs before it disappears entirely. Vestige was shown across three cities and, in every room, someone asked whose face it was. The honest answer is: no one's, and everyone's.",
  },
  {
    id: 7,
    title: "Amber Horizon",
    category: "Limited Prints",
    price: 340,
    medium: "Archival giclée print",
    dimensions: '24" x 32"',
    year: 2024,
    sold: false,
    img: "/images/art07-img.jpg",
    detailImg1: "/images/art07-detailImg1.jpg",
    detailImg2: "/images/art07-detailImg2.jpg",
    story:
      "A rider and horse reduced almost to silhouette, crossing a horizon that doesn't end so much as fade. The artist painted Amber Horizon after a long, mostly wordless trip through open country, where distance starts to feel less like space and more like a feeling. There's no drama in it, no destination in view — just the steady fact of moving forward. Printed on cotton rag archival paper, so it ages the way the memory did: slowly, and without losing its warmth.",
  },
  {
    id: 8,
    title: "Filigree",
    category: "Charcoal Studies",
    price: 7200,
    medium: "Charcoal and ink on panel",
    dimensions: '44" x 44"',
    year: 2024,
    sold: false,
    img: "/images/art08-img.jpg",
    detailImg1: "/images/art08-detailImg1.jpg",
    detailImg2: "/images/art08-detailImg2.jpg",
    story:
      "Nearly two hundred individually drawn sections make up this single study of a horse in motion, and the artist admits he lost track of the hours somewhere past the first month. Filigree isn't about the whole animal — it's about the specific, unrepeatable way muscle and mane move together for a fraction of a second. It remains the most demanding piece he's made, and the one he's least willing to explain, because some things are better looked at than talked about.",
  },
  {
    id: 9,
    title: "Solstice Range",
    category: "Acrylic Paintings",
    price: 4600,
    medium: "Acrylic on canvas",
    dimensions: '40" x 30"',
    year: 2025,
    sold: false,
    img: "/images/art09-img.jpg",
    detailImg1: "/images/art09-detailImg1.jpg",
    detailImg2: "/images/art09-detailImg2.jpg",
    story:
      "The artist spent a season sketching at altitude, waiting each evening for the ten minutes when the peaks catch fire with alpenglow before the light drops out completely. Solstice Range was his first real step away from the figure and into landscape, built up with a palette knife until the color itself seemed to hold heat. It's a younger body of work, in a sense — less certain, more willing to just look at something and let it be beautiful. That willingness is exactly what makes it work.",
  },
  {
    id: 10,
    title: "Turquoise Hollow",
    category: "Acrylic Paintings",
    price: 3600,
    medium: "Acrylic on canvas",
    dimensions: '36" x 24"',
    year: 2025,
    sold: true,
    img: "/images/art10-img.jpg",
    detailImg1: "/images/art10-detailImg1.jpg",
    detailImg2: "/images/art10-detailImg2.jpg",
    story:
      "A hidden cove along a remote coastline, painted from studies made over several return trips because the light there never behaved the same way twice. Turquoise Hollow is built from more than a dozen translucent glazes, each one chasing a particular quality of water the artist swears is impossible to photograph honestly. What's on the canvas is closer to what it felt like to stand there than what a camera would have caught. That gap between seeing and feeling is where most of this piece lives.",
  },
  {
    id: 11,
    title: "Amber Understory",
    category: "Acrylic Paintings",
    price: 2900,
    medium: "Acrylic on panel",
    dimensions: '24" x 30"',
    year: 2025,
    sold: false,
    img: "/images/art11-img.jpg",
    detailImg1: "/images/art11-detailImg1.jpg",
    detailImg2: "/images/art11-detailImg2.jpg",
    story:
      "Late one October, the artist sat beneath a stand of maples just to watch the light change, and this is what came out of that sitting. Amber Understory is painted wet-into-wet, softer and less deliberate than most of his work, closer to the feeling of being somewhere quiet than to a finished statement. It's the smallest and gentlest piece in the collection. A good place to start, if you're building a collection of your own.",
  },
  {
    id: 12,
    title: "Nebula Reverie",
    category: "Acrylic Paintings",
    price: 5800,
    medium: "Acrylic and metallic pigment on canvas",
    dimensions: '32" x 40"',
    year: 2025,
    sold: true,
    img: "/images/art12-img.jpg",
    detailImg1: "/images/art12-detailImg1.jpg",
    detailImg2: "/images/art12-detailImg2.jpg",
    story:
      "The artist has never seen a stellar nursery in person, only in the astrophotography he kept returning to during a stretch of late nights that turned into this series. Nebula Reverie began as small, tentative studies and grew, almost against his own expectations, into the most ambitious cosmic work he's completed. The gold-leaf accents shift with the light in the room, so the piece never looks quite the same twice. It's less a picture of space than a picture of looking up.",
  },
  {
    id: 13,
    title: "Event Horizon",
    category: "Acrylic Paintings",
    price: 6400,
    medium: "Acrylic and metallic pigment on canvas",
    dimensions: '40" x 40"',
    year: 2025,
    sold: false,
    img: "/images/art13-img.jpg",
    detailImg1: "/images/art13-detailImg1.jpg",
    detailImg2: "/images/art13-detailImg2.jpg",
    story:
      "A companion to Nebula Reverie, and the more demanding of the two — over forty individual glazes layered in concentric passes to suggest something pulling everything else toward it. Event Horizon started as an idea about gravity and ended up, the artist admits, as something closer to a picture of obsession. He kept adding passes long after the piece was technically finished, because he couldn't quite let it go. That refusal to stop is baked into every layer.",
  },
  {
    id: 14,
    title: "Reliquary",
    category: "Still Life & Interiors",
    price: 3800,
    medium: "Oil on canvas",
    dimensions: '24" x 30"',
    year: 2025,
    sold: true,
    img: "/images/art14-img.jpg",
    detailImg1: "/images/art14-detailImg1.jpg",
    detailImg2: "/images/art14-detailImg2.jpg",
    story:
      "Late one night, the artist arranged a crystal decanter and a handful of gold vessels on a marble ledge, lit a single candle, and started painting before he could think too hard about it. Reliquary took over a dozen sittings, each one built from thinner and thinner glazes until the metal seemed to generate its own light rather than reflect it. It's a quiet piece about permanence — objects built to outlast the people who use them. Nothing in the composition was staged twice; what you see is the first arrangement.",
  },
  {
    id: 15,
    title: "Ascension Hall",
    category: "Still Life & Interiors",
    price: 6200,
    medium: "Oil on canvas",
    dimensions: '36" x 45"',
    year: 2025,
    sold: false,
    img: "/images/art15-img.jpg",
    detailImg1: "/images/art15-detailImg1.jpg",
    detailImg2: "/images/art15-detailImg2.jpg",
    story:
      "The artist was given a single afternoon inside a private residence he still won't name, and this staircase is what he chose to spend it on. Ascension Hall follows a shaft of afternoon light down marble steps worn soft by a century of hands before it, each stair a small record of everyone who climbed it. It remains one of the largest architectural studies he's completed, and the one that took the longest to plan and the shortest to actually paint. Some places just tell you what to do with them.",
  },
  {
    id: 16,
    title: "Sovereign Fold",
    category: "Still Life & Interiors",
    price: 4400,
    medium: "Oil on canvas",
    dimensions: '32" x 40"',
    year: 2025,
    sold: false,
    img: "/images/art16-img.jpg",
    detailImg1: "/images/art16-detailImg1.jpg",
    detailImg2: "/images/art16-detailImg2.jpg",
    story:
      "Painted entirely from memory, drawn from textiles the artist studied in a European archive years before this canvas existed. Sovereign Fold treats drapery as the subject itself rather than a backdrop for something else — every fold built up in successive layers until it holds weight the way real velvet does. There's no figure hidden beneath it; the fabric was always meant to stand alone. Sometimes the absence of a subject is the most interesting subject there is.",
  },
  {
    id: 17,
    title: "Single Study, White",
    category: "Still Life & Interiors",
    price: 2600,
    medium: "Oil on canvas",
    dimensions: '20" x 25"',
    year: 2025,
    sold: false,
    img: "/images/art17-img.jpg",
    detailImg1: "/images/art17-detailImg1.jpg",
    detailImg2: "/images/art17-detailImg2.jpg",
    story:
      "The smallest and most restrained piece in the current collection, and, the artist says, the hardest to get right precisely because there was nowhere to hide. Single Study, White gives a single orchid the same patient attention he usually reserves for a human face — a dozen sittings spent on one bloom and its trailing, unopened buds. Nothing extraneous survived the process. What's left is close to as honest as this artist gets.",
  },
  {
    id: 18,
    title: "Pour, Candlelit",
    category: "Still Life & Interiors",
    price: 3400,
    medium: "Oil on canvas",
    dimensions: '24" x 30"',
    year: 2025,
    sold: false,
    img: "/images/art18-img.jpg",
    detailImg1: "/images/art18-detailImg1.jpg",
    detailImg2: "/images/art18-detailImg2.jpg",
    story:
      "A moment of celebration that lasts under a second in real life, and took weeks to hold still on canvas. The artist worked from rapid charcoal studies of an actual pour, chasing the exact arc of liquid catching candlelight before it disappeared into the glass. Pour, Candlelit is one of the few pieces in the collection built entirely around motion frozen at its peak. It's a small, warm scene, and it was made to feel that way — nothing grand, just one good moment kept.",
  },
  {
    id: 19,
    title: "Confidante",
    category: "Monochrome Oils",
    price: 7800,
    medium: "Oil on canvas",
    dimensions: '40" x 50"',
    year: 2025,
    sold: false,
    img: "/images/art19-img.jpg",
    detailImg1: "/images/art19-detailImg1.jpg",
    detailImg2: "/images/art19-detailImg2.jpg",
    story:
      "The largest and most ambitious figurative work the artist has completed, and the flagship of this collection — a woman in a flowing gown standing in wordless communion with a black horse. Confidante was painted as a single unbroken gesture of trust, the two forms leaning toward each other without a shred of performance in it. There's no story being told here in the traditional sense, just a relationship the viewer is invited to witness rather than interpret. It's the piece the artist is proudest of, and the one he finds hardest to talk about.",
  },
  {
    id: 20,
    title: "Onyx",
    category: "Monochrome Oils",
    price: 5200,
    medium: "Oil on canvas",
    dimensions: '36" x 45"',
    year: 2025,
    sold: false,
    img: "/images/art20-img.jpg",
    detailImg1: "/images/art20-detailImg1.jpg",
    detailImg2: "/images/art20-detailImg2.jpg",
    story:
      "A companion study to Confidante, painted afterward, once the artist realized the horse deserved a canvas of its own. Onyx strips away every human presence and narrative device, leaving only the animal — its coat catching light the way polished stone does, its eye holding something the artist still describes as unreadable. It's a quieter piece than its companion, but no less demanding. Sometimes the most honest portrait is the one with no story attached at all.",
  },
  {
    id: 21,
    title: "Candescence",
    category: "Still Life & Interiors",
    price: 3200,
    medium: "Oil on canvas",
    dimensions: '24" x 30"',
    year: 2025,
    sold: false,
    img: "/images/art21-img.jpg",
    detailImg1: "/images/art21-detailImg1.jpg",
    detailImg2: "/images/art21-detailImg2.jpg",
    story:
      "The artist spent eighteen months personally restoring the chandelier in this painting before he ever thought to paint it — cleaning each crystal by hand, rewiring it piece by piece. Candescence marks the first time that kind of restoration work directly became a finished canvas, close enough to the candlelight to feel its heat. It's as much a record of labor as it is a picture of light. Few pieces in the collection carry that many hours of quiet, unphotographed work behind them.",
  },
  {
    id: 22,
    title: "Marque",
    category: "Still Life & Interiors",
    price: 4800,
    medium: "Oil on canvas",
    dimensions: '28" x 35"',
    year: 2025,
    sold: true,
    img: "/images/art22-img.jpg",
    detailImg1: "/images/art22-detailImg1.jpg",
    detailImg2: "/images/art22-detailImg2.jpg",
    story:
      "A study of chrome, leather, and lacquer on a vintage touring car, painted with the same reverence the artist usually reserves for a human portrait. Marque grew out of a growing interest in objects built to last — things made before disposability was the default, engineered by people who expected them to outlive their makers. There's real tenderness in how the light moves across the fender here. It's a love letter to permanence, disguised as a still life.",
  },
  {
    id: 23,
    title: "Undercurrent",
    category: "Still Life & Interiors",
    price: 5600,
    medium: "Oil and gold leaf on canvas",
    dimensions: '28" x 35"',
    year: 2025,
    sold: false,
    img: "/images/art23-img.jpg",
    detailImg1: "/images/art23-detailImg1.jpg",
    detailImg2: "/images/art23-detailImg2.jpg",
    story:
      "The most process-driven piece in the collection, built from raw gold leaf worked into dark pigment, applied and partially scraped back over several weeks of returning to the same canvas. Undercurrent isn't a fixed image so much as a record of the studio hours spent making it — every scrape and reapplication left visible rather than smoothed away. The artist says he doesn't fully know what it's for, only what it took to make. Sometimes the process is the subject.",
  },
];

const FILTERS = ["All Works", "Monochrome Oils", "Charcoal Studies", "Limited Prints", "Acrylic Paintings", "Still Life & Interiors", "Sold"];

const PROCESS_STEPS = [
  {
    n: "01",
    title: "Consultation",
    desc: "A conversation about your space, story, and vision — in person, by video, or over email.",
  },
  {
    n: "02",
    title: "Concept",
    desc: "Sketches, palette studies, and a fixed quote before any canvas is touched.",
  },
  {
    n: "03",
    title: "Creation",
    desc: "Weekly progress photos as the piece develops in the studio, with room for feedback.",
  },
  {
    n: "04",
    title: "Delivery",
    desc: "Professional packing and white-glove delivery or shipping, fully insured.",
  },
];

// Scroll-driven background artwork, keyed to each section id
const BG_IMAGES = {
  hero: { src: "/images/bg-hero.jpg", label: "Studio Wall, No. 1" },
  gallery: { src: "/images/bg-gallery.jpg", label: "Studio Wall, No. 2" },
  commission: { src: "/images/bg-commission.jpg", label: "Studio Wall, No. 3" },
  about: { src: "/images/bg-about.jpg", label: "Studio Wall, No. 4" },
  contact: { src: "/images/bg-contact.jpg", label: "Studio Wall, No. 5" },
};
const SECTION_IDS = ["hero", "gallery", "about", "contact"];

// Turns an artwork title into a clean, shareable URL slug, e.g.
// "Golden Hour Study No. 3" -> "golden-hour-study-no-3"
const slugify = (title) =>
  title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const artworkPath = (art) => `/painting/${slugify(art.title)}`;

const CONTACT_EMAIL = "jza@jzalistudio.com";

// Sorted strictly alphabetically by country name
const COUNTRY_CODES = [
  { code: "AF", flag: "🇦🇫", dial: "+93", label: "Afghanistan" },
  { code: "AL", flag: "🇦🇱", dial: "+355", label: "Albania" },
  { code: "DZ", flag: "🇩🇿", dial: "+213", label: "Algeria" },
  { code: "AD", flag: "🇦🇩", dial: "+376", label: "Andorra" },
  { code: "AO", flag: "🇦🇴", dial: "+244", label: "Angola" },
  { code: "AG", flag: "🇦🇬", dial: "+1268", label: "Antigua and Barbuda" },
  { code: "AR", flag: "🇦🇷", dial: "+54", label: "Argentina" },
  { code: "AM", flag: "🇦🇲", dial: "+374", label: "Armenia" },
  { code: "AU", flag: "🇦🇺", dial: "+61", label: "Australia" },
  { code: "AT", flag: "🇦🇹", dial: "+43", label: "Austria" },
  { code: "AZ", flag: "🇦🇿", dial: "+994", label: "Azerbaijan" },
  { code: "BS", flag: "🇧🇸", dial: "+1242", label: "Bahamas" },
  { code: "BH", flag: "🇧🇭", dial: "+973", label: "Bahrain" },
  { code: "BD", flag: "🇧🇩", dial: "+880", label: "Bangladesh" },
  { code: "BB", flag: "🇧🇧", dial: "+1246", label: "Barbados" },
  { code: "BY", flag: "🇧🇾", dial: "+375", label: "Belarus" },
  { code: "BE", flag: "🇧🇪", dial: "+32", label: "Belgium" },
  { code: "BZ", flag: "🇧🇿", dial: "+501", label: "Belize" },
  { code: "BJ", flag: "🇧🇯", dial: "+229", label: "Benin" },
  { code: "BT", flag: "🇧🇹", dial: "+975", label: "Bhutan" },
  { code: "BO", flag: "🇧🇴", dial: "+591", label: "Bolivia" },
  { code: "BA", flag: "🇧🇦", dial: "+387", label: "Bosnia and Herzegovina" },
  { code: "BW", flag: "🇧🇼", dial: "+267", label: "Botswana" },
  { code: "BR", flag: "🇧🇷", dial: "+55", label: "Brazil" },
  { code: "BN", flag: "🇧🇳", dial: "+673", label: "Brunei" },
  { code: "BG", flag: "🇧🇬", dial: "+359", label: "Bulgaria" },
  { code: "BF", flag: "🇧🇫", dial: "+226", label: "Burkina Faso" },
  { code: "BI", flag: "🇧🇮", dial: "+257", label: "Burundi" },
  { code: "KH", flag: "🇰🇭", dial: "+855", label: "Cambodia" },
  { code: "CM", flag: "🇨🇲", dial: "+237", label: "Cameroon" },
  { code: "CA", flag: "🇨🇦", dial: "+1", label: "Canada" },
  { code: "CV", flag: "🇨🇻", dial: "+238", label: "Cape Verde" },
  { code: "CF", flag: "🇨🇫", dial: "+236", label: "Central African Republic" },
  { code: "TD", flag: "🇹🇩", dial: "+235", label: "Chad" },
  { code: "CL", flag: "🇨🇱", dial: "+56", label: "Chile" },
  { code: "CN", flag: "🇨🇳", dial: "+86", label: "China" },
  { code: "CO", flag: "🇨🇴", dial: "+57", label: "Colombia" },
  { code: "KM", flag: "🇰🇲", dial: "+269", label: "Comoros" },
  { code: "CD", flag: "🇨🇩", dial: "+243", label: "Congo (DRC)" },
  { code: "CG", flag: "🇨🇬", dial: "+242", label: "Congo (Republic)" },
  { code: "CR", flag: "🇨🇷", dial: "+506", label: "Costa Rica" },
  { code: "HR", flag: "🇭🇷", dial: "+385", label: "Croatia" },
  { code: "CU", flag: "🇨🇺", dial: "+53", label: "Cuba" },
  { code: "CY", flag: "🇨🇾", dial: "+357", label: "Cyprus" },
  { code: "CZ", flag: "🇨🇿", dial: "+420", label: "Czech Republic" },
  { code: "DK", flag: "🇩🇰", dial: "+45", label: "Denmark" },
  { code: "DJ", flag: "🇩🇯", dial: "+253", label: "Djibouti" },
  { code: "DO", flag: "🇩🇴", dial: "+1", label: "Dominican Republic" },
  { code: "EC", flag: "🇪🇨", dial: "+593", label: "Ecuador" },
  { code: "EG", flag: "🇪🇬", dial: "+20", label: "Egypt" },
  { code: "SV", flag: "🇸🇻", dial: "+503", label: "El Salvador" },
  { code: "GQ", flag: "🇬🇶", dial: "+240", label: "Equatorial Guinea" },
  { code: "ER", flag: "🇪🇷", dial: "+291", label: "Eritrea" },
  { code: "EE", flag: "🇪🇪", dial: "+372", label: "Estonia" },
  { code: "SZ", flag: "🇸🇿", dial: "+268", label: "Eswatini" },
  { code: "ET", flag: "🇪🇹", dial: "+251", label: "Ethiopia" },
  { code: "FJ", flag: "🇫🇯", dial: "+679", label: "Fiji" },
  { code: "FI", flag: "🇫🇮", dial: "+358", label: "Finland" },
  { code: "FR", flag: "🇫🇷", dial: "+33", label: "France" },
  { code: "GA", flag: "🇬🇦", dial: "+241", label: "Gabon" },
  { code: "GM", flag: "🇬🇲", dial: "+220", label: "Gambia" },
  { code: "GE", flag: "🇬🇪", dial: "+995", label: "Georgia" },
  { code: "DE", flag: "🇩🇪", dial: "+49", label: "Germany" },
  { code: "GH", flag: "🇬🇭", dial: "+233", label: "Ghana" },
  { code: "GR", flag: "🇬🇷", dial: "+30", label: "Greece" },
  { code: "GT", flag: "🇬🇹", dial: "+502", label: "Guatemala" },
  { code: "GN", flag: "🇬🇳", dial: "+224", label: "Guinea" },
  { code: "GY", flag: "🇬🇾", dial: "+592", label: "Guyana" },
  { code: "HT", flag: "🇭🇹", dial: "+509", label: "Haiti" },
  { code: "HN", flag: "🇭🇳", dial: "+504", label: "Honduras" },
  { code: "HK", flag: "🇭🇰", dial: "+852", label: "Hong Kong" },
  { code: "HU", flag: "🇭🇺", dial: "+36", label: "Hungary" },
  { code: "IS", flag: "🇮🇸", dial: "+354", label: "Iceland" },
  { code: "IN", flag: "🇮🇳", dial: "+91", label: "India" },
  { code: "ID", flag: "🇮🇩", dial: "+62", label: "Indonesia" },
  { code: "IR", flag: "🇮🇷", dial: "+98", label: "Iran" },
  { code: "IQ", flag: "🇮🇶", dial: "+964", label: "Iraq" },
  { code: "IE", flag: "🇮🇪", dial: "+353", label: "Ireland" },
  { code: "IL", flag: "🇮🇱", dial: "+972", label: "Israel" },
  { code: "IT", flag: "🇮🇹", dial: "+39", label: "Italy" },
  { code: "CI", flag: "🇨🇮", dial: "+225", label: "Ivory Coast" },
  { code: "JM", flag: "🇯🇲", dial: "+1876", label: "Jamaica" },
  { code: "JP", flag: "🇯🇵", dial: "+81", label: "Japan" },
  { code: "JO", flag: "🇯🇴", dial: "+962", label: "Jordan" },
  { code: "KZ", flag: "🇰🇿", dial: "+7", label: "Kazakhstan" },
  { code: "KE", flag: "🇰🇪", dial: "+254", label: "Kenya" },
  { code: "KW", flag: "🇰🇼", dial: "+965", label: "Kuwait" },
  { code: "KG", flag: "🇰🇬", dial: "+996", label: "Kyrgyzstan" },
  { code: "LA", flag: "🇱🇦", dial: "+856", label: "Laos" },
  { code: "LV", flag: "🇱🇻", dial: "+371", label: "Latvia" },
  { code: "LB", flag: "🇱🇧", dial: "+961", label: "Lebanon" },
  { code: "LS", flag: "🇱🇸", dial: "+266", label: "Lesotho" },
  { code: "LR", flag: "🇱🇷", dial: "+231", label: "Liberia" },
  { code: "LY", flag: "🇱🇾", dial: "+218", label: "Libya" },
  { code: "LI", flag: "🇱🇮", dial: "+423", label: "Liechtenstein" },
  { code: "LT", flag: "🇱🇹", dial: "+370", label: "Lithuania" },
  { code: "LU", flag: "🇱🇺", dial: "+352", label: "Luxembourg" },
  { code: "MG", flag: "🇲🇬", dial: "+261", label: "Madagascar" },
  { code: "MW", flag: "🇲🇼", dial: "+265", label: "Malawi" },
  { code: "MY", flag: "🇲🇾", dial: "+60", label: "Malaysia" },
  { code: "MV", flag: "🇲🇻", dial: "+960", label: "Maldives" },
  { code: "ML", flag: "🇲🇱", dial: "+223", label: "Mali" },
  { code: "MT", flag: "🇲🇹", dial: "+356", label: "Malta" },
  { code: "MR", flag: "🇲🇷", dial: "+222", label: "Mauritania" },
  { code: "MU", flag: "🇲🇺", dial: "+230", label: "Mauritius" },
  { code: "MX", flag: "🇲🇽", dial: "+52", label: "Mexico" },
  { code: "MD", flag: "🇲🇩", dial: "+373", label: "Moldova" },
  { code: "MC", flag: "🇲🇨", dial: "+377", label: "Monaco" },
  { code: "MN", flag: "🇲🇳", dial: "+976", label: "Mongolia" },
  { code: "ME", flag: "🇲🇪", dial: "+382", label: "Montenegro" },
  { code: "MA", flag: "🇲🇦", dial: "+212", label: "Morocco" },
  { code: "MZ", flag: "🇲🇿", dial: "+258", label: "Mozambique" },
  { code: "MM", flag: "🇲🇲", dial: "+95", label: "Myanmar" },
  { code: "NA", flag: "🇳🇦", dial: "+264", label: "Namibia" },
  { code: "NP", flag: "🇳🇵", dial: "+977", label: "Nepal" },
  { code: "NL", flag: "🇳🇱", dial: "+31", label: "Netherlands" },
  { code: "NZ", flag: "🇳🇿", dial: "+64", label: "New Zealand" },
  { code: "NI", flag: "🇳🇮", dial: "+505", label: "Nicaragua" },
  { code: "NE", flag: "🇳🇪", dial: "+227", label: "Niger" },
  { code: "NG", flag: "🇳🇬", dial: "+234", label: "Nigeria" },
  { code: "KP", flag: "🇰🇵", dial: "+850", label: "North Korea" },
  { code: "MK", flag: "🇲🇰", dial: "+389", label: "North Macedonia" },
  { code: "NO", flag: "🇳🇴", dial: "+47", label: "Norway" },
  { code: "OM", flag: "🇴🇲", dial: "+968", label: "Oman" },
  { code: "PK", flag: "🇵🇰", dial: "+92", label: "Pakistan" },
  { code: "PS", flag: "🇵🇸", dial: "+970", label: "Palestine" },
  { code: "PA", flag: "🇵🇦", dial: "+507", label: "Panama" },
  { code: "PG", flag: "🇵🇬", dial: "+675", label: "Papua New Guinea" },
  { code: "PY", flag: "🇵🇾", dial: "+595", label: "Paraguay" },
  { code: "PE", flag: "🇵🇪", dial: "+51", label: "Peru" },
  { code: "PH", flag: "🇵🇭", dial: "+63", label: "Philippines" },
  { code: "PL", flag: "🇵🇱", dial: "+48", label: "Poland" },
  { code: "PT", flag: "🇵🇹", dial: "+351", label: "Portugal" },
  { code: "QA", flag: "🇶🇦", dial: "+974", label: "Qatar" },
  { code: "RO", flag: "🇷🇴", dial: "+40", label: "Romania" },
  { code: "RU", flag: "🇷🇺", dial: "+7", label: "Russia" },
  { code: "RW", flag: "🇷🇼", dial: "+250", label: "Rwanda" },
  { code: "SM", flag: "🇸🇲", dial: "+378", label: "San Marino" },
  { code: "ST", flag: "🇸🇹", dial: "+239", label: "Sao Tome and Principe" },
  { code: "SA", flag: "🇸🇦", dial: "+966", label: "Saudi Arabia" },
  { code: "SN", flag: "🇸🇳", dial: "+221", label: "Senegal" },
  { code: "RS", flag: "🇷🇸", dial: "+381", label: "Serbia" },
  { code: "SC", flag: "🇸🇨", dial: "+248", label: "Seychelles" },
  { code: "SL", flag: "🇸🇱", dial: "+232", label: "Sierra Leone" },
  { code: "SG", flag: "🇸🇬", dial: "+65", label: "Singapore" },
  { code: "SK", flag: "🇸🇰", dial: "+421", label: "Slovakia" },
  { code: "SI", flag: "🇸🇮", dial: "+386", label: "Slovenia" },
  { code: "SO", flag: "🇸🇴", dial: "+252", label: "Somalia" },
  { code: "ZA", flag: "🇿🇦", dial: "+27", label: "South Africa" },
  { code: "KR", flag: "🇰🇷", dial: "+82", label: "South Korea" },
  { code: "SS", flag: "🇸🇸", dial: "+211", label: "South Sudan" },
  { code: "ES", flag: "🇪🇸", dial: "+34", label: "Spain" },
  { code: "LK", flag: "🇱🇰", dial: "+94", label: "Sri Lanka" },
  { code: "SD", flag: "🇸🇩", dial: "+249", label: "Sudan" },
  { code: "SR", flag: "🇸🇷", dial: "+597", label: "Suriname" },
  { code: "SE", flag: "🇸🇪", dial: "+46", label: "Sweden" },
  { code: "CH", flag: "🇨🇭", dial: "+41", label: "Switzerland" },
  { code: "SY", flag: "🇸🇾", dial: "+963", label: "Syria" },
  { code: "TW", flag: "🇹🇼", dial: "+886", label: "Taiwan" },
  { code: "TJ", flag: "🇹🇯", dial: "+992", label: "Tajikistan" },
  { code: "TZ", flag: "🇹🇿", dial: "+255", label: "Tanzania" },
  { code: "TH", flag: "🇹🇭", dial: "+66", label: "Thailand" },
  { code: "TL", flag: "🇹🇱", dial: "+670", label: "Timor-Leste" },
  { code: "TG", flag: "🇹🇬", dial: "+228", label: "Togo" },
  { code: "TT", flag: "🇹🇹", dial: "+1868", label: "Trinidad and Tobago" },
  { code: "TN", flag: "🇹🇳", dial: "+216", label: "Tunisia" },
  { code: "TR", flag: "🇹🇷", dial: "+90", label: "Turkey" },
  { code: "TM", flag: "🇹🇲", dial: "+993", label: "Turkmenistan" },
  { code: "UG", flag: "🇺🇬", dial: "+256", label: "Uganda" },
  { code: "UA", flag: "🇺🇦", dial: "+380", label: "Ukraine" },
  { code: "AE", flag: "🇦🇪", dial: "+971", label: "United Arab Emirates" },
  { code: "GB", flag: "🇬🇧", dial: "+44", label: "United Kingdom" },
  { code: "US", flag: "🇺🇸", dial: "+1", label: "United States" },
  { code: "UY", flag: "🇺🇾", dial: "+598", label: "Uruguay" },
  { code: "UZ", flag: "🇺🇿", dial: "+998", label: "Uzbekistan" },
  { code: "VA", flag: "🇻🇦", dial: "+379", label: "Vatican City" },
  { code: "VE", flag: "🇻🇪", dial: "+58", label: "Venezuela" },
  { code: "VN", flag: "🇻🇳", dial: "+84", label: "Vietnam" },
  { code: "YE", flag: "🇾🇪", dial: "+967", label: "Yemen" },
  { code: "ZM", flag: "🇿🇲", dial: "+260", label: "Zambia" },
  { code: "ZW", flag: "🇿🇼", dial: "+263", label: "Zimbabwe" },
];

const STATS = [
  { value: 6, suffix: "", label: "Years of Practice", icon: Palette },
  { value: 2, suffix: "", label: "Solo Exhibitions", icon: Award },
  { value: 2, suffix: "", label: "Countries Exhibited", icon: Globe },
  { value: 50, suffix: "+", label: "Commissions Completed", icon: CheckCircle2 },
  { value: 100, suffix: "+", label: "Works in Private Collections", icon: Heart, flagship: true },
];

// Explicit Canadian Dollar formatting so international collectors see the currency at a glance
const currency = (n) => `$${n.toLocaleString("en-US")} CAD`;

// -----------------------------
// Fallback pattern + safe image primitives
// -----------------------------
function HatchPattern({ uid, opacity = 0.08 }) {
  return (
    <svg className="absolute inset-0 w-full h-full" style={{ opacity }} aria-hidden="true">
      <defs>
        <pattern id={`hatch-${uid}`} width="9" height="9" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
          <line x1="0" y1="0" x2="0" y2="9" stroke="white" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#hatch-${uid})`} />
    </svg>
  );
}

// Standard in-flow image (gallery cards, modal, portrait, cart thumb) with graceful fallback
function SafeImage({ src, alt, label, className = "", style }) {
  const [error, setError] = useState(false);
  const uid = useId();

  if (error || !src) {
    return (
      <div style={style} className={`${className} relative flex items-center justify-center bg-gradient-to-br from-[#1c1c1c] via-[#111111] to-black`}>
        <HatchPattern uid={uid} />
        <span className="relative z-10 text-white/35 text-[11px] tracking-[0.2em] uppercase text-center px-6 font-serif-lux italic leading-relaxed">
          [ {label || alt || "Artwork Placeholder"} ]
        </span>
      </div>
    );
  }

  return <img src={src} alt={alt} loading="lazy" onError={() => setError(true)} className={className} style={style} />;
}

// Absolutely-positioned crossfading background layer with the same fallback treatment
function BackgroundLayer({ src, label, active, scrollY, opacity = 0.5 }) {
  const [error, setError] = useState(false);
  const uid = useId();
  const style = {
    opacity: active ? opacity : 0,
    transform: `translateY(${scrollY * 0.15}px) scale(1.18)`,
  };

  if (error) {
    return (
      <div className="absolute inset-0 w-full h-full transition-opacity duration-[1400ms] ease-in-out bg-gradient-to-br from-[#171717] via-[#0c0c0c] to-black" style={style} aria-hidden="true">
        <HatchPattern uid={uid} opacity={0.06} />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-white/15 text-xs tracking-[0.35em] uppercase font-serif-lux italic">[ {label} ]</span>
        </div>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt=""
      aria-hidden="true"
      loading="lazy"
      onError={() => setError(true)}
      className="absolute inset-0 w-full h-full object-cover contrast-[1.05] transition-opacity duration-[1400ms] ease-in-out"
      style={style}
    />
  );
}

// -----------------------------
// Count-up number for the stat highlight band
// -----------------------------
function CountUp({ value, suffix = "", duration = 1400 }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setDisplay(Math.round(eased * value));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value, duration]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

// Fires once when the wrapped element scrolls into view — used to stagger-reveal the stat cards
function useRevealOnScroll() {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, shown];
}

// -----------------------------
// Career highlights — editorial split: one dominant flagship number set
// against a quiet typographic ledger of the rest. No icons, no grid boxes.
// -----------------------------
function StatBand() {
  const [ref, shown] = useRevealOnScroll();
  const flagship = STATS.find((s) => s.flagship);
  const rest = STATS.filter((s) => !s.flagship);

  return (
    <section ref={ref} className="relative z-10 border-y border-white/10 bg-black/50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
        <div
          className={`mb-16 lg:mb-20 text-center lg:text-left transition-all duration-700 ease-out ${
            shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <span className="text-white/50 text-xs tracking-[0.3em] uppercase">Career Highlights</span>
          <h2 className="serif-heading text-3xl sm:text-4xl text-white mt-3">In Numbers</h2>
        </div>

        <div className="grid lg:grid-cols-5 gap-14 lg:gap-20 items-center">
          <div
            className={`lg:col-span-2 text-center lg:text-left transition-all ease-out ${
              shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDuration: "900ms" }}
          >
            <p className="serif-heading text-white leading-none text-[5.5rem] sm:text-[7rem] lg:text-[8rem]">
              <CountUp value={flagship.value} suffix={flagship.suffix} />
            </p>
            <p className="text-xs tracking-[0.2em] uppercase text-white/50 mt-3">{flagship.label}</p>
            <div className="mt-6 h-px w-16 bg-white/30 mx-auto lg:mx-0" />
            <p className="text-white/50 text-sm font-light leading-relaxed mt-6 max-w-xs mx-auto lg:mx-0">
              Original paintings placed with collectors worldwide, built over six years of dedicated practice.
            </p>
          </div>

          <div className="lg:col-span-3 border-t border-white/10 divide-y divide-white/10">
            {rest.map((s, i) => (
              <div
                key={s.label}
                className={`flex items-baseline justify-between py-6 transition-all duration-700 ease-out hover:pl-2 hover:border-white/10 ${
                  shown ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
                }`}
                style={{ transitionDelay: shown ? `${250 + i * 150}ms` : "0ms" }}
              >
                <span className="text-xs tracking-[0.15em] uppercase text-white/50">{s.label}</span>
                <span className="serif-heading text-3xl sm:text-4xl text-white">
                  <CountUp value={s.value} suffix={s.suffix} />
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// -----------------------------
// Compact country-code selector for the phone field —
// closed state shows only flag + dial code, open list shows full country names
// -----------------------------
function CountryCodeSelect({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);
  const selected = COUNTRY_CODES.find((c) => c.code === value) || COUNTRY_CODES[0];

  useEffect(() => {
    const handleOutside = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("pointerdown", handleOutside);
    return () => document.removeEventListener("pointerdown", handleOutside);
  }, []);

  return (
    <div ref={wrapRef} className="relative shrink-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="lux-input w-[92px] flex items-center justify-between gap-1 cursor-pointer"
      >
        <span className="flex items-center gap-1.5 text-sm whitespace-nowrap">
          <span>{selected.flag}</span>
          <span>{selected.dial}</span>
        </span>
        <ChevronDown size={12} className={`text-white/40 shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div role="listbox" className="absolute z-30 mt-2 w-64 max-h-64 overflow-y-auto bg-black border border-white/30 shadow-2xl">
          {COUNTRY_CODES.map((c) => (
            <button
              key={c.code}
              type="button"
              role="option"
              aria-selected={c.code === value}
              onClick={() => {
                onChange(c.code);
                setOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 text-left text-sm transition-colors ${
                c.code === value ? "bg-white/15 text-white" : "text-white/95 hover:bg-white/10"
              }`}
            >
              <span className="text-base">{c.flag}</span>
              <span className="flex-1 truncate">{c.label}</span>
              <span className="text-white/40 text-xs font-mono">{c.dial}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// -----------------------------
// Gallery Card — 3D tilt + spotlight + reveal overlay
// -----------------------------
function GalleryCard({ art, height, fixedWidth, onOpen }) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [spot, setSpot] = useState({ x: 50, y: 50 });
  const [hovered, setHovered] = useState(false);

  const handleMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    setTilt({ rx: (0.5 - py) * 10, ry: (px - 0.5) * 10 });
    setSpot({ x: px * 100, y: py * 100 });
  };

  return (
    <div
      ref={cardRef}
      role="button"
      tabIndex={0}
      onMouseEnter={() => setHovered(true)}
      onMouseMove={handleMove}
      onMouseLeave={() => {
        setHovered(false);
        setTilt({ rx: 0, ry: 0 });
      }}
      onClick={() => onOpen(art)}
      onKeyDown={(e) => e.key === "Enter" && onOpen(art)}
      style={{
        height: height ? `${height}px` : undefined,
        width: fixedWidth ? `${fixedWidth}px` : undefined,
        transform: `perspective(1000px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) ${hovered ? "scale(1.02)" : "scale(1)"}`,
        transition: "transform 200ms ease-out, box-shadow 300ms ease",
        boxShadow: hovered ? "0 30px 55px -18px rgba(0,0,0,0.75)" : "0 0 0 rgba(0,0,0,0)",
      }}
      className="group relative overflow-hidden bg-white/5 border border-white/10 cursor-pointer w-full [transform-style:preserve-3d]"
    >
      <SafeImage
        src={art.img}
        alt={art.title}
        label={art.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
      />

      {/* cursor spotlight */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          opacity: hovered ? 1 : 0,
          background: `radial-gradient(220px circle at ${spot.x}% ${spot.y}%, rgba(255,255,255,0.16), transparent 65%)`,
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/25 to-transparent opacity-70 group-hover:opacity-95 transition-opacity duration-500" />

      {art.sold && (
        <span className="absolute top-4 left-4 bg-black/80 border border-white/40 text-white text-[10px] tracking-[0.2em] uppercase px-3 py-1.5">
          Sold
        </span>
      )}
      <span className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm text-white/70 text-[10px] tracking-[0.2em] uppercase px-3 py-1.5 border border-white/10">
        {art.category}
      </span>

      <div className="absolute inset-x-0 bottom-0 p-5 translate-y-3 group-hover:translate-y-0 transition-transform duration-500">
        <h3 className="serif-heading text-xl text-white mb-1">{art.title}</h3>
        <p className="text-white/50 text-xs mb-3">
          {art.medium} &middot; {art.dimensions}
        </p>
        <div className="flex items-center justify-between">
          <p className="text-white text-sm font-medium">{art.sold ? "Inquire" : currency(art.price)}</p>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpen(art);
            }}
            className="inline-flex items-center gap-1.5 border border-white/40 text-white text-[10px] tracking-[0.15em] uppercase px-3 py-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 hover:bg-white hover:text-black transition-all duration-300"
          >
            <Eye size={12} /> Quick View
          </button>
        </div>
      </div>
    </div>
  );
}

// -----------------------------
// Artwork Inspector — fullscreen lightbox w/ magnifier + nav
// -----------------------------

function ArtworkInspector({ art, onClose, onPrev, onNext, onAddToCart }) {
  const [zooming, setZooming] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const [activeImg, setActiveImg] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setZooming(false);
    setActiveImg(0);
    setCopied(false);
  }, [art?.id]);

  const copyLink = async () => {
    const url = `${window.location.origin}${artworkPath(art)}`;
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      window.prompt("Copy this link:", url);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, onNext, onPrev]);

  if (!art) return null;

  const images = [art.img, art.detailImg1, art.detailImg2].filter(Boolean);

  const handleImgMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setZoomPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-black/92 backdrop-blur-md" onClick={onClose}>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        className="hidden md:flex absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 items-center justify-center border border-white/20 bg-black/60 hover:bg-white hover:text-black transition-colors"
        aria-label="Previous artwork"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        className="hidden md:flex absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 items-center justify-center border border-white/20 bg-black/60 hover:bg-white hover:text-black transition-colors"
        aria-label="Next artwork"
      >
        <ChevronRight size={20} />
      </button>

      <div
        className="relative bg-[#0a0a0a] border border-white/15 max-w-6xl w-full max-h-[92vh] overflow-y-auto grid md:grid-cols-2"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-11 h-11 sm:w-9 sm:h-9 flex items-center justify-center bg-black/80 border border-white/20 hover:border-white transition-colors"
        >
          <X size={16} className="text-white" />
        </button>

        {/* image panel */}
        <div className="relative aspect-square md:aspect-auto bg-black overflow-hidden">
          <div
            className="relative w-full h-full cursor-none"
            onMouseEnter={(e) => {
              handleImgMove(e);
              setZooming(true);
            }}
            onMouseLeave={() => setZooming(false)}
            onMouseMove={handleImgMove}
          >
            <SafeImage src={images[activeImg]} alt={art.title} label={art.title} className="w-full h-full object-cover" />
            <div
              className="hidden sm:block absolute w-48 h-48 rounded-full border-2 border-white/80 shadow-2xl pointer-events-none transition-opacity duration-150 ease-out ring-1 ring-black/40"
              style={{
                left: `${zoomPos.x}%`,
                top: `${zoomPos.y}%`,
                transform: "translate(-50%, -50%)",
                opacity: zooming ? 1 : 0,
                backgroundImage: `url(${images[activeImg]})`,
                backgroundSize: "480%",
                backgroundPosition: `${zoomPos.x}% ${zoomPos.y}%`,
                backgroundRepeat: "no-repeat",
              }}
            />
            <span className="hidden sm:flex absolute top-4 right-4 text-white/40 text-[10px] tracking-[0.15em] uppercase items-center gap-1.5">
              <ZoomIn size={12} /> Hover to inspect
            </span>
          </div>

          {art.sold && (
            <span className="absolute top-4 left-4 bg-black/80 border border-white/40 text-white text-[10px] tracking-[0.2em] uppercase px-3 py-1.5">
              Sold
            </span>
          )}

          {images.length > 1 && (
            <div className="absolute bottom-0 left-0 right-0 z-10 flex items-center gap-2 px-4 py-3 bg-gradient-to-t from-black/85 via-black/40 to-transparent">
              {images.map((src, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveImg(idx);
                  }}
                  className={`w-12 h-12 sm:w-14 sm:h-14 border overflow-hidden shrink-0 transition-all ${
                    activeImg === idx ? "border-white" : "border-white/25 opacity-60 hover:opacity-100"
                  }`}
                  aria-label={`View image ${idx + 1}`}
                >
                  <img src={src} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* details */}
        <div className="p-6 sm:p-10 flex flex-col">
          <span className="text-white/50 text-xs tracking-[0.25em] uppercase mb-2">
            {art.category} &middot; {art.year}
          </span>
          <h3 className="serif-heading text-3xl sm:text-4xl text-white mb-4">{art.title}</h3>

          <div className="flex gap-8 mb-6 text-sm">
            <div>
              <p className="text-white/35 text-xs uppercase tracking-wide mb-1">Medium</p>
              <p className="text-white/85">{art.medium}</p>
            </div>
            <div>
              <p className="text-white/35 text-xs uppercase tracking-wide mb-1">Dimensions</p>
              <p className="text-white/85">{art.dimensions}</p>
            </div>
          </div>

          <p className="text-white/60 leading-relaxed font-light mb-8 flex-1">{art.story}</p>

          <div className="flex items-center justify-between pt-6 border-t border-white/10 mb-4">
            <p className="serif-heading text-2xl text-white">{art.sold ? "Sold" : currency(art.price)}</p>
            <button
              onClick={copyLink}
              className="inline-flex items-center gap-1.5 text-white/50 hover:text-white text-xs tracking-[0.12em] uppercase transition-colors"
            >
              <Link2 size={13} /> {copied ? "Link Copied" : "Copy Link"}
            </button>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`Inquiry — ${art.title}`)}`}
              className="flex-1 inline-flex items-center justify-center gap-2 border border-white/30 text-white px-6 py-3 text-xs tracking-[0.15em] uppercase hover:border-white hover:bg-white/5 transition-all"
            >
              Inquire for Original <ArrowUpRight size={14} />
            </a>
            {!art.sold && (
              <button
                onClick={() => onAddToCart(art)}
                className="flex-1 inline-flex items-center justify-center gap-2 bg-white text-black px-6 py-3 text-xs tracking-[0.15em] uppercase font-medium hover:bg-white/85 transition-all"
              >
                Add Print to Cart <ShoppingCart size={14} />
              </button>
            )}
          </div>

          <div className="flex md:hidden items-center justify-between mt-6 pt-4 border-t border-white/10">
            <button onClick={onPrev} className="flex items-center gap-1 text-white/60 text-xs uppercase tracking-wide">
              <ChevronLeft size={14} /> Prev
            </button>
            <button onClick={onNext} className="flex items-center gap-1 text-white/60 text-xs uppercase tracking-wide">
              Next <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// -----------------------------
// Root Component
// -----------------------------
// -----------------------------
// Reveal-on-scroll wrapper — fades + rises each gallery item into place,
// staggered by its position in the grid
// -----------------------------
function RevealItem({ children, index = 0 }) {
  const [ref, shown] = useRevealOnScroll();
  const delay = Math.min((index % 9) * 90, 640);
  return (
    <div
      ref={ref}
      className={`transition-all ease-out duration-700 ${shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      style={{ transitionDelay: shown ? `${delay}ms` : "0ms" }}
    >
      {children}
    </div>
  );
}

// -----------------------------
// Dedicated full gallery page — the complete collection, masonry-style,
// with staggered reveal animation and filterable by category
// -----------------------------
const GALLERY_CARD_HEIGHTS = [420, 500, 460, 540, 400, 480];

function GalleryPage({ artworks, filter, setFilter, onOpen, onBack, onCommission }) {
  const [headerRef, headerShown] = useRevealOnScroll();

  useEffect(() => {
    document.title = "The Collection | JZ Ali";
    return () => {
      document.title = "JZ Ali | Original Paintings";
    };
  }, []);

  return (
    <div className="relative z-10 min-h-screen bg-black animate-fadeUp">
      <div className="fixed inset-0 z-0 overflow-hidden bg-black pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0e0e0e] via-black to-black" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, rgba(255,255,255,0.4) 0, rgba(255,255,255,0.4) 1px, transparent 1px, transparent 10px)",
          }}
        />
      </div>

        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 lg:px-10 pt-24 sm:pt-36 pb-20 sm:pb-28">
          <button
            onClick={onBack}
          className="inline-flex items-center gap-2 text-white/50 hover:text-white text-xs tracking-[0.2em] uppercase mb-8 sm:mb-12 transition-colors duration-300 group py-1 -my-1"
        >
          <ArrowRight size={13} className="rotate-180 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </button>

        <div
          ref={headerRef}
          className={`text-center max-w-2xl mx-auto mb-10 sm:mb-16 transition-all duration-700 ease-out ${
            headerShown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <span className="text-white/50 text-xs tracking-[0.3em] uppercase">The Complete Collection</span>
          <h1 className="serif-heading text-4xl sm:text-6xl lg:text-7xl text-white mt-4 leading-[1.05]">The Gallery</h1>
          <p className="text-white/50 font-light leading-relaxed mt-5 sm:mt-6 max-w-lg mx-auto text-sm sm:text-base px-2 sm:px-0">
            Every original painting and limited-edition print, in one place — from monochrome figure studies to
            gold-leaf still lifes. Click a piece to inspect it closely.
          </p>
        </div>

        <div className="flex sm:flex-wrap sm:justify-center gap-2 mb-10 sm:mb-16 overflow-x-auto sm:overflow-visible -mx-5 px-5 sm:mx-0 sm:px-0 pb-1 sm:pb-0 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`shrink-0 px-4 sm:px-5 py-2.5 sm:py-2 text-xs tracking-[0.15em] uppercase rounded-full border transition-all duration-300 ${
                filter === f ? "bg-white text-black border-white" : "border-white/20 text-white/60 hover:border-white/60 hover:text-white"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {artworks.length === 0 ? (
          <p className="text-center text-white/50 py-24">No pieces match this filter yet.</p>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 sm:gap-6 [column-fill:_balance]">
            {artworks.map((art, i) => (
              <RevealItem key={art.id} index={i}>
                <div className="mb-4 sm:mb-6 break-inside-avoid">
                  <GalleryCard art={art} onOpen={onOpen} height={GALLERY_CARD_HEIGHTS[i % GALLERY_CARD_HEIGHTS.length]} />
                </div>
              </RevealItem>
            ))}
          </div>
        )}

        <div className="mt-16 sm:mt-24 pt-10 border-t border-white/10 flex flex-col items-center gap-4 text-center">
          <p className="text-white/40 text-sm font-light">Looking for something made just for you?</p>
          <button
            onClick={onCommission}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-white/40 text-white px-8 py-3.5 text-xs tracking-[0.2em] uppercase font-medium hover:border-white hover:bg-white/5 transition-all duration-300"
          >
            Enquire About a Commission
          </button>
        </div>
      </div>
    </div>
  );
}

export default function PortfolioSite() {
  const [filter, setFilter] = useState("All Works");
  const [galleryView, setGalleryView] = useState("slide"); // "slide" | "grid"
  const [selectedId, setSelectedId] = useState(() => {
    const m = window.location.pathname.match(new RegExp("^/painting/([^/]+)$"));
    if (!m) return null;
    const art = ARTWORKS.find((a) => slugify(a.title) === m[1]);
    return art ? art.id : null;
  });
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [commissionOpen, setCommissionOpen] = useState(false);
  const [view, setView] = useState(() => (window.location.pathname.startsWith("/gallery") ? "gallery" : "home"));
  const pendingScrollRef = useRef(null);

  const navigate = (path, nextView, scrollTarget) => {
    window.history.pushState({}, "", path);
    setView(nextView);
    setMenuOpen(false);
    if (scrollTarget) {
      pendingScrollRef.current = scrollTarget;
    } else {
      window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
    }
  };

  useEffect(() => {
    const onPopState = () => {
      setView(window.location.pathname.startsWith("/gallery") ? "gallery" : "home");
      const m = window.location.pathname.match(new RegExp("^/painting/([^/]+)$"));
      if (m) {
        const art = ARTWORKS.find((a) => slugify(a.title) === m[1]);
        setSelectedId(art ? art.id : null);
      } else {
        setSelectedId(null);
      }
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  // After navigating back to the home view, honor any pending scroll target
  // (e.g. "About" clicked while on the Gallery page)
  useEffect(() => {
    if (view === "home" && pendingScrollRef.current) {
      const id = pendingScrollRef.current;
      pendingScrollRef.current = null;
      requestAnimationFrame(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      });
    }
  }, [view]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState("hero");
  const [toast, setToast] = useState(null);
  const [formStatus, setFormStatus] = useState("idle"); // idle | submitting | done
  const [phoneCountry, setPhoneCountry] = useState("CA");
  const sliderRef = useRef(null);
  const dragState = useRef({ isDown: false, startX: 0, startScroll: 0 });
  const isPausedRef = useRef(false);
  const rafRef = useRef(null);
  const galleryViewRef = useRef("slide");
  useEffect(() => {
    galleryViewRef.current = galleryView;
  }, [galleryView]);

  // Scroll position (drives parallax drift + navbar state)
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          setScrolled(window.scrollY > 24);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Which section is in view (drives background artwork crossfade)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.35, rootMargin: "-10% 0px -10% 0px" }
    );
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [view]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2600);
    return () => clearTimeout(t);
  }, [toast]);

  const filteredArt = useMemo(() => {
    if (filter === "All Works") return ARTWORKS;
    if (filter === "Sold") return ARTWORKS.filter((a) => a.sold);
    return ARTWORKS.filter((a) => a.category === filter && !a.sold);
  }, [filter]);

  // Duplicate the row so the auto-scroll can loop seamlessly
  const streamArt = useMemo(() => [...filteredArt, ...filteredArt], [filteredArt]);

  // Reset scroll position whenever the collection being streamed changes
  useEffect(() => {
    if (sliderRef.current) sliderRef.current.scrollLeft = 0;
  }, [filter]);

  // Continuous auto-scroll — pauses on hover/drag, loops seamlessly via the duplicated list
  useEffect(() => {
    const speed = 0.55; // px per frame
    const step = () => {
      const el = sliderRef.current;
      if (galleryViewRef.current === "slide" && el && !isPausedRef.current && !dragState.current.isDown && el.scrollWidth > 0) {
        el.scrollLeft += speed;
        const loopPoint = el.scrollWidth / 2;
        if (el.scrollLeft >= loopPoint) {
          el.scrollLeft -= loopPoint;
        }
      }
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [streamArt]);

  const selectedIndex = useMemo(() => filteredArt.findIndex((a) => a.id === selectedId), [filteredArt, selectedId]);
  const selectedArt = selectedIndex >= 0 ? filteredArt[selectedIndex] : null;

  // Give every painting its own shareable URL, e.g. /painting/undercurrent.
  // Opening pushes a new history entry (so Back closes it and returns to the
  // page underneath); stepping through Next/Prev swaps the URL in place;
  // closing pushes back to the underlying page.
  const openLightbox = (art) => {
    setSelectedId(art.id);
    window.history.pushState({}, "", artworkPath(art));
  };
  const closeLightbox = () => {
    setSelectedId(null);
    window.history.pushState({}, "", view === "gallery" ? "/gallery" : "/");
  };
  const goNext = () => {
    if (filteredArt.length === 0) return;
    const next = (selectedIndex + 1 + filteredArt.length) % filteredArt.length;
    const art = filteredArt[next];
    setSelectedId(art.id);
    window.history.replaceState({}, "", artworkPath(art));
  };
  const goPrev = () => {
    if (filteredArt.length === 0) return;
    const prev = (selectedIndex - 1 + filteredArt.length) % filteredArt.length;
    const art = filteredArt[prev];
    setSelectedId(art.id);
    window.history.replaceState({}, "", artworkPath(art));
  };

  // Keep the browser tab title in sync with whatever painting is open
  useEffect(() => {
    if (selectedArt) {
      document.title = `${selectedArt.title} | JZ Ali`;
    } else if (view === "gallery") {
      document.title = "The Collection | JZ Ali";
    } else {
      document.title = "JZ Ali | Original Paintings";
    }
  }, [selectedArt, view]);

  const addToCart = (art) => {
    if (art.sold) return;
    setCart((prev) => {
      const existing = prev.find((i) => i.id === art.id);
      if (existing) {
        return prev.map((i) => (i.id === art.id ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...prev, { ...art, qty: 1 }];
    });
    setToast(`${art.title} added to cart`);
  };

  const updateQty = (id, delta) => {
    setCart((prev) =>
      prev.map((i) => (i.id === id ? { ...i, qty: Math.max(0, i.qty + delta) } : i)).filter((i) => i.qty > 0)
    );
  };

  const removeFromCart = (id) => setCart((prev) => prev.filter((i) => i.id !== id));

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const cartTotal = cart.reduce((s, i) => s + i.qty * i.price, 0);

  const scrollTo = (id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleCommissionSubmit = (e) => {
    e.preventDefault();
    setFormStatus("submitting");
    setTimeout(() => setFormStatus("done"), 1200);
  };

  const scrollSlider = (dir) => sliderRef.current?.scrollBy({ left: dir * 380, behavior: "smooth" });
  const pauseStream = () => {
    isPausedRef.current = true;
  };
  const resumeStream = () => {
    isPausedRef.current = false;
  };
  const onPointerDown = (e) => {
    dragState.current = { isDown: true, startX: e.clientX, startScroll: sliderRef.current.scrollLeft };
  };
  const onPointerMove = (e) => {
    if (!dragState.current.isDown) return;
    const dx = e.clientX - dragState.current.startX;
    sliderRef.current.scrollLeft = dragState.current.startScroll - dx;
  };
  const onPointerUp = () => {
    dragState.current.isDown = false;
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans antialiased selection:bg-white selection:text-black">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,500&family=Inter:wght@300;400;500;600&display=swap');
        .font-serif-lux { font-family: 'Playfair Display', serif; }
        * { font-family: 'Inter', sans-serif; }
        .font-serif-lux, .serif-heading { font-family: 'Playfair Display', serif; }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #000; }
        ::-webkit-scrollbar-thumb { background: #3a3a3a; border-radius: 4px; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeUp { animation: fadeUp 0.7s ease forwards; }
      `}</style>

      {view === "home" && (
        <div className="fixed inset-0 z-0 overflow-hidden bg-black">
          {/* ---------------- SCROLL-DRIVEN PARALLAX BACKGROUND ---------------- */}
          {SECTION_IDS.map((id) => (
            <BackgroundLayer
              key={id}
              src={BG_IMAGES[id].src}
              label={BG_IMAGES[id].label}
              active={activeSection === id}
              scrollY={scrollY}
              opacity={id === "hero" ? 0.8 : 0.5}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60" />
          <div className="absolute inset-0 backdrop-blur-[1px]" />
        </div>
      )}

      {/* ---------------- NAVBAR ---------------- */}
      <header
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-500 ${
          scrolled ? "bg-black/80 backdrop-blur-md border-b border-white/10 py-3" : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between">
          <button
            onClick={() => (view !== "home" ? navigate("/", "home") : scrollTo("hero"))}
            className="serif-heading text-xl md:text-2xl tracking-wide text-white"
          >
            JZ Ali
          </button>

          <nav className="hidden md:flex items-center gap-10 text-sm tracking-[0.15em] uppercase text-white/60">
            {["Gallery", "Commission", "About", "Contact"].map((label) => (
              <button
                key={label}
                onClick={() => {
                  if (label === "Commission") return setCommissionOpen(true);
                  if (label === "Gallery") return navigate("/gallery", "gallery");
                  if (view !== "home") return navigate("/", "home", label.toLowerCase());
                  return scrollTo(label.toLowerCase());
                }}
                className="relative py-1 hover:text-white transition-colors duration-300 group"
              >
                {label}
                <span className="absolute left-0 -bottom-0.5 h-px w-0 bg-white transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setCartOpen(true)}
              className="relative p-2 rounded-full border border-white/25 hover:border-white/70 hover:bg-white/5 transition-all duration-300"
              aria-label="Open cart"
            >
              <ShoppingCart size={18} className="text-white" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-white text-black text-[10px] font-semibold w-4.5 h-4.5 min-w-[18px] min-h-[18px] rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <button className="md:hidden p-2 text-white" onClick={() => setMenuOpen((v) => !v)} aria-label="Toggle menu">
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        <div className={`md:hidden overflow-hidden transition-all duration-300 ${menuOpen ? "max-h-64 opacity-100 mt-4" : "max-h-0 opacity-0"}`}>
          <div className="px-6 pb-4 flex flex-col gap-4 text-sm tracking-[0.15em] uppercase text-white/60 border-t border-white/10 pt-4">
            {["Gallery", "Commission", "About", "Contact"].map((label) => (
              <button
                key={label}
                onClick={() => {
                  setMenuOpen(false);
                  if (label === "Commission") return setCommissionOpen(true);
                  if (label === "Gallery") return navigate("/gallery", "gallery");
                  if (view !== "home") return navigate("/", "home", label.toLowerCase());
                  return scrollTo(label.toLowerCase());
                }}
                className="text-left hover:text-white transition-colors"
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {view === "home" && (
      <>
      {/* ---------------- HERO ---------------- */}
      <section id="hero" className="relative z-10 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-24 pb-16 w-full">
          <div className="max-w-2xl animate-fadeUp">
            <h1 className="serif-heading text-5xl sm:text-6xl lg:text-7xl leading-[1.05] text-white mb-6">
              Art that lives
              <br />
              in the <span className="italic text-white/70">quiet</span> moments.
            </h1>
            <p className="text-white/60 text-base sm:text-lg leading-relaxed max-w-lg mb-10 font-light">
              Original paintings and limited-edition prints of solitary figures and horses in motion — handcrafted in a Toronto studio, shipped worldwide.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => navigate("/gallery", "gallery")}
                className="group inline-flex items-center justify-center gap-2 bg-white text-black px-8 py-4 text-sm tracking-[0.15em] uppercase font-medium hover:bg-white/85 transition-all duration-300"
              >
                View Gallery
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => setCommissionOpen(true)}
                className="inline-flex items-center justify-center gap-2 border border-white/40 text-white px-8 py-4 text-sm tracking-[0.15em] uppercase font-medium hover:border-white hover:bg-white/5 transition-all duration-300"
              >
                Commission Artwork
              </button>
            </div>
          </div>
        </div>

        <button
          onClick={() => scrollTo("gallery")}
          className="hidden sm:flex absolute bottom-10 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-white/50 hover:text-white transition-colors"
        >
          <span className="text-[10px] tracking-[0.25em] uppercase">Scroll</span>
          <ChevronDown size={16} className="animate-bounce" />
        </button>
      </section>

      {/* ---------------- GALLERY ---------------- */}
      <section id="gallery" className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 py-24 lg:py-32">
        <div className="flex flex-col gap-8 mb-12">
          <div>
            <span className="text-white/50 text-xs tracking-[0.3em] uppercase">Showcase & Shop</span>
            <h2 className="serif-heading text-4xl sm:text-5xl text-white mt-3">The Gallery</h2>
            <div className="flex flex-wrap items-center gap-3 mt-3">
              <span className="inline-flex items-center gap-1.5 border border-white/15 rounded-full px-3 py-1 text-[10px] tracking-[0.15em] uppercase text-white/50">
                <Globe size={11} /> Worldwide Express Shipping Available
              </span>
            </div>
          </div>

          {/* view mode toggle: Slide (auto-moving) vs Grid (static) */}
          <div className="flex justify-end">
            <div className="flex items-center border border-white/20 rounded-full p-1 gap-1">
              <button
                onClick={() => setGalleryView("slide")}
                className={`px-4 py-1.5 text-[10px] tracking-[0.15em] uppercase rounded-full transition-all duration-300 ${
                  galleryView === "slide" ? "bg-white text-black" : "text-white/60 hover:text-white"
                }`}
              >
                Slide
              </button>
              <button
                onClick={() => setGalleryView("grid")}
                className={`px-4 py-1.5 text-[10px] tracking-[0.15em] uppercase rounded-full transition-all duration-300 ${
                  galleryView === "grid" ? "bg-white text-black" : "text-white/60 hover:text-white"
                }`}
              >
                Grid
              </button>
            </div>
          </div>
        </div>

        {filteredArt.length === 0 ? (
          <p className="text-center text-white/50 py-20">No pieces match this filter yet.</p>
        ) : galleryView === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArt.map((art) => (
              <GalleryCard key={art.id} art={art} height={420} onOpen={openLightbox} />
            ))}
          </div>
        ) : (
          <div className="relative" onMouseEnter={pauseStream} onMouseLeave={resumeStream}>
            <button
              onClick={() => scrollSlider(-1)}
              className="hidden md:flex absolute -left-4 lg:-left-14 top-[45%] -translate-y-1/2 z-10 w-11 h-11 items-center justify-center bg-black/70 border border-white/20 hover:bg-white hover:text-black transition-colors"
              aria-label="Scroll left"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => scrollSlider(1)}
              className="hidden md:flex absolute -right-4 lg:-right-14 top-[45%] -translate-y-1/2 z-10 w-11 h-11 items-center justify-center bg-black/70 border border-white/20 hover:bg-white hover:text-black transition-colors"
              aria-label="Scroll right"
            >
              <ChevronRight size={18} />
            </button>

            {/* edge fade so the auto-scroll loop reads as an endless stream */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-28 z-[5] bg-gradient-to-r from-black to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-28 z-[5] bg-gradient-to-l from-black to-transparent" />

            <div
              ref={sliderRef}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerLeave={onPointerUp}
              style={{ touchAction: "pan-y" }}
              className="flex gap-6 overflow-x-auto pb-4 cursor-grab active:cursor-grabbing select-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            >
              {streamArt.map((art, idx) => (
                <div key={`${art.id}-${idx}`} className="flex-shrink-0">
                  <GalleryCard art={art} fixedWidth={320} height={460} onOpen={openLightbox} />
                </div>
              ))}
            </div>
            <p className="text-center text-white/30 text-[11px] tracking-[0.2em] uppercase mt-2">
              <span className="sm:hidden">Swipe to browse</span>
              <span className="hidden sm:inline">Hover to pause &middot; Drag to browse</span>
            </p>
          </div>
        )}
      </section>

      {/* ---------------- COMMISSION ---------------- */}
      {/* ---------------- ABOUT ---------------- */}
      <section id="about" className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative order-2 lg:order-1">
            <div className="absolute -inset-4 border border-white/20" />
            <SafeImage
              src="/images/about-photo.jpg"
              alt="The artist in his studio"
              label="Artist Portrait"
              className="relative w-full aspect-[4/5] object-cover"
            />
            <div className="absolute -bottom-6 -right-6 bg-black border border-white/25 px-6 py-4 hidden sm:block">
              <p className="serif-heading text-3xl text-white">6</p>
              <p className="text-xs tracking-[0.15em] uppercase text-white/60">Years of Practice</p>
            </div>
          </div>

          <div className="order-1 lg:order-2 bg-black/40 backdrop-blur-sm p-2 sm:p-0">
            <span className="text-white/50 text-xs tracking-[0.3em] uppercase">About the Artist</span>
            <h2 className="serif-heading text-4xl sm:text-5xl text-white mt-3 mb-6">JZ Ali</h2>
            <p className="text-white/60 leading-relaxed font-light mb-5">
              JZ Ali is a self-taught painter based in Toronto, Canada, working primarily in oil, acrylic, and charcoal, known for his atmospheric studies of the human figure and horses in motion. Over six years of practice, his work has been exhibited across two countries and held in over 100 private collections worldwide.
            </p>
            <p className="text-white/60 leading-relaxed font-light mb-8">
              "I'm drawn to the moments between things — the pause before a wave breaks, the hush after a room empties. My work is an attempt to hold those moments still, just for a while."
            </p>
          </div>
        </div>
      </section>

      {/* ---------------- STAT HIGHLIGHT BAND ---------------- */}
      <StatBand />

      {/* ---------------- CONTACT / FOOTER ---------------- */}
      <footer id="contact" className="relative z-10 border-t border-white/10 bg-black/70 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20">
          <div className="grid md:grid-cols-3 gap-12 mb-16">
            <div className="md:col-span-2">
              <h3 className="serif-heading text-2xl text-white mb-4">JZ Ali</h3>
              <p className="text-white/50 text-sm leading-relaxed font-light max-w-sm">
                Original paintings, limited-edition prints, and bespoke commissions from a private studio.
              </p>
            </div>

            <div className="flex md:justify-end items-start">
              <div className="flex items-center gap-3">
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="inline-flex items-center gap-2 border border-white/25 text-white px-5 py-2.5 text-xs tracking-[0.15em] uppercase hover:border-white hover:bg-white hover:text-black transition-all duration-300"
                >
                  <Mail size={14} /> Inquire
                </a>
                <a
                  href="https://instagram.com/jzali.art"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 border border-white/25 text-white px-5 py-2.5 text-xs tracking-[0.15em] uppercase hover:border-white hover:bg-white hover:text-black transition-all duration-300"
                >
                  <Instagram size={14} /> Follow
                </a>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 flex items-center justify-center gap-4 text-xs text-white/35">
            <p>&copy; {new Date().getFullYear()} JZ Ali. All rights reserved.</p>
          </div>
        </div>
      </footer>
      </>
      )}

      {view === "gallery" && (
        <GalleryPage
          artworks={filteredArt}
          filter={filter}
          setFilter={setFilter}
          onOpen={openLightbox}
          onBack={() => navigate("/", "home")}
          onCommission={() => setCommissionOpen(true)}
        />
      )}

      {/* ---------------- LIGHTBOX / ARTWORK INSPECTOR ---------------- */}
      {selectedArt && (
        <ArtworkInspector art={selectedArt} onClose={closeLightbox} onPrev={goPrev} onNext={goNext} onAddToCart={addToCart} />
      )}

      {/* ---------------- COMMISSION MODAL ---------------- */}
      {commissionOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="absolute inset-0 bg-black/85 backdrop-blur-sm" onClick={() => setCommissionOpen(false)} />
          <div className="relative min-h-full flex items-start sm:items-center justify-center p-4 sm:p-8">
            <div className="relative w-full max-w-3xl bg-[#0a0a0a] border border-white/15 my-8 animate-fadeUp">
              <button
                onClick={() => setCommissionOpen(false)}
                aria-label="Close"
                className="absolute top-4 right-4 z-10 w-11 h-11 sm:w-9 sm:h-9 flex items-center justify-center bg-black/80 border border-white/20 hover:border-white transition-colors"
              >
                <X size={18} className="text-white" />
              </button>

              <div className="p-6 sm:p-10 pt-14 sm:pt-16">
                <div className="text-center max-w-2xl mx-auto mb-12">
                  <span className="text-white/50 text-xs tracking-[0.3em] uppercase">Bespoke Work</span>
                  <h2 className="serif-heading text-4xl sm:text-5xl text-white mt-3 mb-5">Commission a Piece</h2>
                  <p className="text-white/60 font-light leading-relaxed mb-6">
                    Every commission is a collaboration — a piece made for your space, your story, and no one else's.
                  </p>
                  <span className="inline-flex items-center gap-2 border border-white/20 rounded-full px-4 py-1.5 text-[10px] tracking-[0.2em] uppercase text-white/60">
                    <Globe size={12} /> Ships Worldwide from Toronto, Canada
                  </span>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 mb-16">
                  {PROCESS_STEPS.map((step, idx) => (
                    <div key={step.n} className="relative">
                      <span className="serif-heading text-5xl text-white/15">{step.n}</span>
                      <h3 className="serif-heading text-xl text-white mt-2 mb-2">{step.title}</h3>
                      <p className="text-white/50 text-sm leading-relaxed font-light">{step.desc}</p>
                      {idx < PROCESS_STEPS.length - 1 && <div className="hidden lg:block absolute top-6 -right-3 w-6 h-px bg-white/15" />}
                    </div>
                  ))}
                </div>

                {formStatus === "done" ? (
                  <div className="text-center py-10">
                    <div className="w-14 h-14 mx-auto mb-5 rounded-full border border-white/30 flex items-center justify-center">
                      <Sparkles size={22} className="text-white" />
                    </div>
                    <h3 className="serif-heading text-2xl text-white mb-2">Request received</h3>
                    <p className="text-white/60 font-light">Thank you — expect a reply within two business days to discuss your vision.</p>
                    <button
                      onClick={() => setFormStatus("idle")}
                      className="mt-6 text-xs tracking-[0.15em] uppercase text-white border-b border-white/40 pb-1 hover:border-white"
                    >
                      Submit another request
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleCommissionSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <Field label="Full Name" required>
                        <input type="text" required placeholder="Jane Whitfield" className="lux-input" />
                      </Field>
                      <Field label="Email Address" required>
                        <input type="email" required placeholder="jane@email.com" className="lux-input" />
                      </Field>
                    </div>

                    <Field label="Phone Number" required>
                      <div className="flex items-stretch gap-2">
                        <CountryCodeSelect value={phoneCountry} onChange={setPhoneCountry} />
                        <input type="tel" required placeholder="416 555 0192" className="lux-input flex-1" />
                      </div>
                    </Field>

                    <div className="grid sm:grid-cols-2 gap-6">
                      <Field label="Budget Range">
                        <select className="lux-input" defaultValue="">
                          <option value="" disabled>
                            Select a range
                          </option>
                          <option>Up to $1,000 CAD</option>
                          <option>$1,000 – $2,500 CAD</option>
                          <option>$2,500 – $5,000 CAD</option>
                          <option>$5,000+ CAD</option>
                        </select>
                      </Field>
                      <Field label="Size / Medium Preference">
                        <input type="text" placeholder='e.g. 36" x 48", oil on canvas' className="lux-input" />
                      </Field>
                    </div>

                    <Field label="Project Vision">
                      <textarea
                        rows={4}
                        placeholder="Tell me about the space, mood, colors, or story you'd like the piece to capture..."
                        className="lux-input resize-none"
                      />
                    </Field>

                    <div>
                      <label className="block text-xs tracking-[0.15em] uppercase text-white/60 mb-2">Reference Images (optional)</label>
                      <div className="border border-dashed border-white/25 hover:border-white/60 transition-colors duration-300 rounded-sm p-6 sm:p-8 text-center cursor-pointer">
                        <Upload size={20} className="mx-auto mb-3 text-white/70" />
                        <p className="text-sm text-white/60">
                          <span className="sm:hidden">Tap to add photos</span>
                          <span className="hidden sm:inline">Drag files here or click to browse</span>
                        </p>
                        <p className="text-xs text-white/30 mt-1">PNG, JPG up to 10MB</p>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={formStatus === "submitting"}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-black px-10 py-4 text-sm tracking-[0.15em] uppercase font-medium hover:bg-white/85 transition-all duration-300 disabled:opacity-60"
                    >
                      {formStatus === "submitting" ? "Sending..." : "Submit Request"}
                      {formStatus !== "submitting" && <ArrowRight size={16} />}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ---------------- CART DRAWER ---------------- */}
      <div className={`fixed inset-0 z-50 transition-visibility ${cartOpen ? "visible" : "invisible delay-500"}`}>
        <div
          className={`absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-500 ${cartOpen ? "opacity-100" : "opacity-0"}`}
          onClick={() => setCartOpen(false)}
        />
        <div
          className={`absolute right-0 top-0 h-full w-full max-w-md bg-[#0a0a0a] border-l border-white/15 flex flex-col transition-transform duration-500 ease-out ${
            cartOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
            <h3 className="serif-heading text-xl text-white">Your Cart ({cartCount})</h3>
            <button onClick={() => setCartOpen(false)} className="w-9 h-9 flex items-center justify-center hover:bg-white/10 transition-colors">
              <X size={18} className="text-white" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center text-white/35 gap-3">
                <ShoppingCart size={32} className="opacity-30" />
                <p className="text-sm">Your cart is empty</p>
                <button
                  onClick={() => {
                    setCartOpen(false);
                    scrollTo("gallery");
                  }}
                  className="text-xs tracking-[0.15em] uppercase text-white border-b border-white/30 pb-1 hover:border-white mt-2"
                >
                  Browse the Gallery
                </button>
              </div>
            ) : (
              <div className="space-y-5">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <SafeImage src={item.img} alt={item.title} label={item.title} className="w-20 h-20 object-cover flex-shrink-0 border border-white/10" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="serif-heading text-base text-white truncate">{item.title}</h4>
                        <button onClick={() => removeFromCart(item.id)} className="text-white/35 hover:text-white transition-colors flex-shrink-0">
                          <Trash2 size={14} />
                        </button>
                      </div>
                      <p className="text-xs text-white/40 mb-2">{item.medium}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center border border-white/20">
                          <button onClick={() => updateQty(item.id, -1)} className="w-8 h-8 flex items-center justify-center hover:bg-white/10 text-white/70">
                            <Minus size={12} />
                          </button>
                          <span className="w-8 text-center text-sm text-white">{item.qty}</span>
                          <button onClick={() => updateQty(item.id, 1)} className="w-8 h-8 flex items-center justify-center hover:bg-white/10 text-white/70">
                            <Plus size={12} />
                          </button>
                        </div>
                        <p className="text-white text-sm font-medium">{currency(item.price * item.qty)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {cart.length > 0 && (
            <div className="border-t border-white/10 px-6 py-6 space-y-4">
              <div className="flex items-center justify-between text-sm text-white/60">
                <span>Subtotal</span>
                <span className="text-white serif-heading text-lg">{currency(cartTotal)}</span>
              </div>
              <p className="text-xs text-white/35">Shipping and insurance calculated at checkout.</p>
              <p className="flex items-center gap-1.5 text-[10px] tracking-[0.15em] uppercase text-white/40">
                <Globe size={11} /> Worldwide Express Shipping Available
              </p>
              <button className="w-full bg-white text-black py-4 text-sm tracking-[0.15em] uppercase font-medium hover:bg-white/85 transition-all duration-300">
                Proceed to Checkout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ---------------- TOAST ---------------- */}
      <div
        className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] transition-all duration-300 ${
          toast ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <div className="bg-[#0a0a0a] border border-white/25 text-white text-sm px-6 py-3 shadow-xl flex items-center gap-2">
          <Sparkles size={14} className="text-white" />
          {toast}
        </div>
      </div>

      <style>{`
        .lux-input {
          width: 100%;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.18);
          color: #FFFFFF;
          padding: 12px 14px;
          font-size: 14px;
          transition: border-color 0.3s ease, background 0.3s ease;
          outline: none;
        }
        .lux-input:focus {
          border-color: rgba(255,255,255,0.7);
          background: rgba(255,255,255,0.06);
        }
        .lux-input::placeholder {
          color: rgba(255,255,255,0.3);
        }
      `}</style>
    </div>
  );
}

function Field({ label, required, children }) {
  return (
    <label className="block">
      <span className="block text-xs tracking-[0.15em] uppercase text-white/60 mb-2">
        {label} {required && <span className="text-white">*</span>}
      </span>
      {children}
    </label>
  );
}
