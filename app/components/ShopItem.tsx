import Link from 'next/link';

interface ShopItemProps {
  id: number;
  title: string;
  link: string;
  price: number;
  salePrice?: number | null;
  image: string;
  store: string;
  description: string;
  category: string;
}

export default function ShopItem({
  id,
  title,
  link,
  price,
  salePrice,
  image,
  store,
  description,
  category,
}: ShopItemProps) {
  const hasSale = salePrice !== null && salePrice !== undefined && salePrice < price;
  const savings = hasSale ? Math.round(((price - salePrice) / price) * 100) : 0;
  
  // Ensure image path has the /rbgdata prefix for GitHub Pages
  const imagePath = image.startsWith('/rbgdata') ? image : `/rbgdata${image}`;

  return (
    <div className="shop-item">
      <div className="shop-item-image">
        <img src={imagePath} alt={title} />
        {hasSale && <div className="sale-badge">{savings}% OFF</div>}
      </div>

      <div className="shop-item-content">
        <div className="shop-item-header">
          <h3 className="shop-item-title">{title}</h3>
          <span className="shop-item-store">{store}</span>
        </div>

        <p className="shop-item-description">{description}</p>

        <div className="shop-item-pricing">
          {hasSale ? (
            <>
              <span className="price-original">${price.toFixed(2)}</span>
              <span className="price-sale">${salePrice.toFixed(2)}</span>
            </>
          ) : (
            <span className="price">{price === 0 ? 'Free' : `$${price.toFixed(2)}`}</span>
          )}
        </div>

        <div className="shop-item-footer">
          <span className="shop-item-category">{category}</span>
          <a href={link} target="_blank" rel="noopener noreferrer" className="shop-item-link">
            View {store === 'Amazon' ? 'on Amazon' : price === 0 ? 'Access' : 'Buy'}
          </a>
        </div>
      </div>
    </div>
  );
}
