import keychain from '../assets/img/keychain.jpg';
import emblem from '../assets/img/nu_emblem_tshirt.png';
import lanyard from '../assets/img/nu_lanyard.png';
import varsity from '../assets/img/nu_varsity_jacket.png';
import shirt from '../assets/img/shirt.jpg';
import shirtv3 from '../assets/img/shirtv3.png';
import sweater from '../assets/img/sweater.jpg';
import scarf from '../assets/img/nu_v1_scarf.png';

const products = [
  {
    name: 'nu-keychain',
    title: 'NU Keychain',
    image: keychain,
    category: 'Accessories',
    price: 'PHP 99',
    stock: 'In stock',
    content: [
      'A compact keychain featuring a clean NU-inspired design.',
      'Lightweight and durable for everyday use with keys or bags.',
      'A simple way to carry a small piece of campus identity.',
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
      'A classic t-shirt featuring the NU emblem front and center.',
      'Made with breathable fabric for all-day comfort on campus.',
      'Easy to pair with jeans, joggers, or school fits.',
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
      'A durable lanyard for IDs, keys, or access cards.',
      'Designed for daily school use with a secure clasp.',
      'Lightweight and easy to wear throughout the day.',
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
      'A premium varsity jacket with a structured and stylish fit.',
      'Designed for both comfort and standout campus style.',
      'Perfect for cooler days and representing school pride.',
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
      'A simple everyday shirt designed for comfort and versatility.',
      'Soft fabric that works well for classes or casual wear.',
      'A staple piece that fits into any wardrobe.',
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
      'A modern graphic shirt with a bold updated design.',
      'Comfortable fit with a slightly elevated streetwear style.',
      'Great for casual outfits or statement looks.',
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
      'A warm sweater built for comfort during cooler days.',
      'Soft interior lining with a relaxed fit.',
      'Ideal for classrooms, study sessions, or downtime.',
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
      'A lightweight scarf featuring NU-inspired colors.',
      'Adds both warmth and style to everyday outfits.',
      'Perfect for layering during breezy weather.',
    ],
  },
];

export default products;