import Link from 'next/link';
import ShopItem from '@/app/components/ShopItem';
import shopItems from '@/data/shop-items.json';

const categories = ['All', ...Array.from(new Set(shopItems.map((item) => item.category)))];

export default function ShopPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="section-hero bg-cream border-b-4 border-coral">
        <div className="container-max">
          <h1 className="text-teal mb-4">Shop</h1>
          <p className="text-lg text-charcoal max-w-2xl">
            Curated tools, books, and resources to help you create better data visualizations and dashboards.
          </p>
        </div>
      </section>

      {/* Shop Grid */}
      <section className="section bg-white">
        <div className="container-max">
          <div className="shop-grid">
            {shopItems.map((item) => (
              <ShopItem key={item.id} {...item} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-cream border-t-4 border-teal">
        <div className="container-max text-center">
          <h2 className="text-teal mb-6">More Recommendations Coming Soon</h2>
          <p className="text-charcoal mb-8 max-w-2xl mx-auto">
            Have a tool or resource you think belongs here? Feel free to reach out—I'm always looking for quality
            products that help with data visualization and accessibility.
          </p>
          <Link href="/about" className="btn btn-primary">
            Get In Touch
          </Link>
        </div>
      </section>

      <style>{`
        .shop-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 2rem;
          margin-bottom: 2rem;
        }

        .shop-item {
          display: flex;
          flex-direction: column;
          height: 100%;
          background: white;
          border: 1px solid #e0e0e0;
          border-radius: 4px;
          overflow: hidden;
          transition: all 0.3s ease;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        }

        .shop-item:hover {
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.12);
          transform: translateY(-2px);
        }

        .shop-item-image {
          position: relative;
          width: 100%;
          height: 200px;
          background: #f5f5f5;
          overflow: hidden;
        }

        .shop-item-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border: none;
          margin: 0;
        }

        .sale-badge {
          position: absolute;
          top: 0.75rem;
          right: 0.75rem;
          background: #e56b52;
          color: white;
          padding: 0.5rem 0.75rem;
          border-radius: 3px;
          font-size: 0.85rem;
          font-weight: 700;
        }

        .shop-item-content {
          display: flex;
          flex-direction: column;
          flex-grow: 1;
          padding: 1.5rem;
        }

        .shop-item-header {
          margin-bottom: 1rem;
        }

        .shop-item-title {
          font-size: 1.1rem;
          font-weight: 700;
          color: #174f5b;
          margin: 0 0 0.5rem 0;
          line-height: 1.3;
        }

        .shop-item-store {
          display: inline-block;
          background: #174f5b;
          color: white;
          padding: 0.25rem 0.5rem;
          border-radius: 3px;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
        }

        .shop-item-description {
          color: #666;
          font-size: 0.95rem;
          line-height: 1.5;
          margin-bottom: 1rem;
          flex-grow: 1;
        }

        .shop-item-pricing {
          display: flex;
          gap: 0.75rem;
          align-items: center;
          margin-bottom: 1.5rem;
          font-weight: 700;
        }

        .price {
          color: #174f5b;
          font-size: 1.3rem;
        }

        .price-original {
          color: #999;
          text-decoration: line-through;
          font-size: 0.95rem;
        }

        .price-sale {
          color: #e56b52;
          font-size: 1.3rem;
        }

        .shop-item-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
        }

        .shop-item-category {
          background: white;
          color: #174f5b;
          border: 1px solid #174f5b;
          padding: 0.5rem 0.75rem;
          border-radius: 3px;
          font-size: 0.8rem;
          font-weight: 600;
        }

        .shop-item-link {
          display: inline-block;
          background: #d6a84b;
          color: white;
          text-decoration: none;
          padding: 0.6rem 1rem;
          border-radius: 3px;
          font-size: 0.9rem;
          font-weight: 600;
          transition: all 0.2s ease;
        }

        .shop-item-link:hover {
          background: #174f5b;
          transform: translateY(-1px);
        }

        @media (max-width: 768px) {
          .shop-grid {
            grid-template-columns: 1fr;
          }

          .shop-item-footer {
            flex-direction: column;
            align-items: flex-start;
          }

          .shop-item-link {
            width: 100%;
            text-align: center;
          }
        }
      `}</style>
    </>
  );
}
