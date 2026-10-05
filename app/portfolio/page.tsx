import Link from 'next/link';

export default function PortfolioPage() {
  const portfolioItems = [
    {
      title: 'Zodiac Signs in Tableau',
      description:
        'A radial chart visualization showing the distribution of zodiac signs born between 1994 and 2014.',
      tags: ['Tableau', 'Data Visualization'],
      link: '#',
    },
    {
      title: '2,650-Mile Virtual Journey',
      description:
        'An interactive visualization project exploring travel data through a map-based narrative experience.',
      tags: ['Tableau', 'Geography', 'Interactive'],
      link: '#',
    },
    {
      title: 'Accessibility in Tableau',
      description:
        'Comprehensive guide on designing screen reader-friendly data visualizations in Tableau.',
      tags: ['Accessibility', 'Design', 'Tutorial'],
      link: '#',
    },
  ];

  return (
    <>
      <section className="section-hero bg-cream">
        <div className="container-max">
          <h1 className="text-teal mb-4">Portfolio</h1>
          <p className="text-lg text-charcoal">
            A selection of data visualization projects and case studies
          </p>
          <div className="w-16 h-1 bg-coral mt-6"></div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-max">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioItems.map((item, index) => (
              <a
                key={index}
                href={item.link}
                className="no-underline group"
              >
                <div
                  className={`card h-full group-hover:border-${
                    index === 0 ? 'coral' : index === 1 ? 'coral' : 'gold'
                  } transition-all`}
                  style={{
                    borderLeftColor: index === 0 ? '#E56B52' : index === 1 ? '#E56B52' : '#D6a84B',
                  }}
                >
                  <div className="flex flex-col h-full">
                    <h3 className="text-teal group-hover:text-coral transition-colors mb-3 flex-grow">
                      {item.title}
                    </h3>
                    <p className="text-charcoal mb-4 flex-grow">{item.description}</p>
                    {item.tags && (
                      <div className="flex flex-wrap gap-2 mb-4 pt-4 border-t border-gray-200">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs bg-teal bg-opacity-10 text-teal px-2 py-1"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    <span className="text-sm text-coral font-bold group-hover:text-charcoal transition-colors">
                      View Case Study →
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-cream">
        <div className="container-max text-center">
          <h2 className="text-teal mb-6">Want to collaborate?</h2>
          <p className="text-lg text-charcoal mb-8">
            I'm always interested in discussing data visualization, accessibility, and creative projects.
          </p>
          <a href="mailto:hello@rbgdata.com" className="btn btn-primary">
            Get in Touch
          </a>
        </div>
      </section>
    </>
  );
}
