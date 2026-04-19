import keychain from '../assets/img/keychain.jpg';
import emblem from '../assets/img/nu_emblem_tshirt.png';
import lanyard from '../assets/img/nu_lanyard.png';
import varsity from '../assets/img/nu_varsity_jacket.png';
import shirt from '../assets/img/shirt.jpg';
import shirtv3 from '../assets/img/shirtv3.png';
import sweater from '../assets/img/sweater.jpg';
import scarf from '../assets/img/nu_v1_scarf.png';

{/* Enhancement 1: Develop an original product catalog with appropriate product names, descriptions, prices, categories, and images. */}
const products = [
  {
    name: 'nu-keychain',
    title: 'NU Keychain',
    image: keychain,
    category: 'Accessories',
    price: 'PHP 99',
    stock: 'In stock',
    content: [
      'Compact keychain with a clean NU-inspired design.',
      'Lightweight and durable for daily use with keys or bags.',
      'A simple accessory that reflects everyday campus identity.',
    ],
  },
  {
    name: 'nu-emblem-shirt',
    title: 'NU Emblem T-Shirt',
    image: emblem,
    category: 'Apparel',
    price: 'PHP 499',
    stock: 'In stock',
    content: [
      'Classic t-shirt featuring the NU emblem at the front.',
      'Breathable fabric designed for all-day campus comfort.',
      'Easy to pair with jeans, joggers, or casual outfits.',
    ],
  },
  {
    name: 'nu-lanyard',
    title: 'NU Lanyard',
    image: lanyard,
    category: 'Accessories',
    price: 'PHP 149',
    stock: 'In stock',
    content: [
      'Durable lanyard for IDs, keys, and access cards.',
      'Built for daily school use with a secure clasp.',
      'Lightweight design that stays comfortable all day.',
    ],
  },
  {
    name: 'nu-varsity-jacket',
    title: 'NU Varsity Jacket',
    image: varsity,
    category: 'Apparel',
    price: 'PHP 1,999',
    stock: 'Preorder',
    content: [
      'Premium varsity jacket with a structured, stylish fit.',
      'Designed for comfort while maintaining a bold look.',
      'Perfect for cooler days and showing school pride.',
    ],
  },
  {
    name: 'classic-shirt',
    title: 'Classic Shirt',
    image: shirt,
    category: 'Apparel',
    price: 'PHP 399',
    stock: 'In stock',
    content: [
      'Simple everyday shirt built for comfort and versatility.',
      'Soft fabric suitable for classes or casual wear.',
      'A staple piece that fits easily into any wardrobe.',
    ],
  },
  {
    name: 'graphic-shirt-v3',
    title: 'Graphic Shirt V3',
    image: shirtv3,
    category: 'Apparel',
    price: 'PHP 549',
    stock: 'In stock',
    content: [
      'Modern graphic shirt with a bold updated design.',
      'Comfortable fit with a slightly elevated street style.',
      'Ideal for casual outfits or standout everyday looks.',
    ],
  },
  {
    name: 'cozy-sweater',
    title: 'Cozy Sweater',
    image: sweater,
    category: 'Apparel',
    price: 'PHP 799',
    stock: 'In stock',
    content: [
      'Warm sweater designed for comfort in cooler weather.',
      'Soft interior lining with a relaxed everyday fit.',
      'Great for classes, study sessions, or downtime.',
    ],
  },
  {
    name: 'nu-scarf',
    title: 'NU Scarf',
    image: scarf,
    category: 'Accessories',
    price: 'PHP 299',
    stock: 'In stock',
    content: [
      'Lightweight scarf featuring NU-inspired colors.',
      'Adds warmth while elevating everyday outfits.',
      'Perfect for layering during cool or breezy days.',
    ],
  },
];

export default products;