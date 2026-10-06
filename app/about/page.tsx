import Link from 'next/link';

interface Recognition {
  year: number;
  title: string;
  link?: string;
}

const recognitions: Recognition[] = [
  {year: 2026, title: "Tableau Ambassador"},
  {year: 2026, title: "Tableau Data Analyst Certified"},
  {year: 2025, title: "Lead author on 'Driving Change: Motivations and Barriers to Electric Vehicle Adoption'", link: "https://bmrajournal.columbiasouthern.edu/index.php/bmra/article/view/10215/9303"},
  {year: 2022, title: "Instructional Assistant Award", link: "https://www.pce.uw.edu/news-features/articles/2022-instructional-excellence-awards"},
  {year: 2017, title: "CASE Circle of Excellence GOLD Award"},
];

export default function AboutPage() {
  return (
    <>
      <section className="section-hero bg-cream">
        <div className="container-max">
          <h1 className="text-teal mb-4">About</h1>
          <p className="text-lg text-charcoal">
            Learn more about RBG Data and the mission behind the work
          </p>
          <div className="w-16 h-1 bg-coral mt-6"></div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-max max-w-3xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            <div className="md:col-span-2">
              <h2 className="text-teal mb-6">Who I Am</h2>
              <p className="mb-4">
                I'm Rebecca Bergh, a business intelligence analyst passionate about making data accessible,
                understandable, and beautiful. With a focus on Tableau and interactive design, I help teams
                tell compelling stories with their data.
              </p>
              <p className="mb-4">
                My approach follows three simple principles: <span className="text-coral font-bold">Frame</span> the
                problem, <span className="text-coral font-bold">Build</span> the solution, and{' '}
                <span className="text-coral font-bold">Validate</span> the result.
              </p>
              <p className="mb-4">
                I believe that good data visualization is more than just making charts look nice — it's about
                making information accessible to everyone. I'm not an expert on all things data viz, there's 
                still much for me to learn. I would argue we are all still learning and there's always 
                something new to explore in the world of data visualization.
              </p>
              <p className="mb-4">My other hobbies include backpacking, photography, plant-keeping, graphic design 
                and trying most crafty things. 
              </p>
              <p className="mb-4">
                I hope to share my knowledge and passion for data through tutorials, tips, and resources.
              </p>
              
            </div>

            <div className="bg-cream p-8 border-l-4 border-coral">
              <h3 className="text-coral font-black mb-4">Core Values</h3>
              <ul className="space-y-3">
                <li className="flex gap-3">
                  <span className="text-teal font-bold">▪</span>
                  <span>Accessibility First</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-teal font-bold">▪</span>
                  <span>Clear Communication</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-teal font-bold">▪</span>
                  <span>Thoughtful Design</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-teal font-bold">▪</span>
                  <span>Continuous Learning</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="methodology-section">
            <h2 className="methodology-title">Methodology</h2>
            <div className="methodology-grid">
              <div className="methodology-card">
                <h3 className="methodology-card-title text-coral">Frame the Problem</h3>
                <p>
                  Start with clear questions: What decision needs to be made? Who is the audience? What data
                  tells the story? A well-framed problem is half solved.
                </p>
              </div>
              <div className="methodology-card">
                <h3 className="methodology-card-title text-gold">Build the Solution</h3>
                <p>
                  Design and develop visualizations with intention. Consider accessibility from the start,
                  use clean design principles, and prioritize user experience.
                </p>
              </div>
              <div className="methodology-card">
                <h3 className="methodology-card-title text-coral">Validate the Result</h3>
                <p>
                  Test with real users. Does the visualization answer the question? Is it accessible? Can
                  different audiences understand the insight? Iterate based on feedback.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-cream">
        <div className="container-max max-w-3xl">
          <div className="recognition-section">
            <h2 className="recognition-title">Noteworthy recognition</h2>
            {recognitions.length > 0 ? (
              <div className="recognition-list">
                {recognitions.map((recognition, index) => (
                  <div key={index} className="recognition-item">
                    <div className="recognition-year">{recognition.year}</div>
                    <div className="recognition-content">
                      {recognition.link ? (
                        <a href={recognition.link} target="_blank" rel="noopener noreferrer" className="recognition-title-link">
                          {recognition.title}
                        </a>
                      ) : (
                        <span className="recognition-title-text">{recognition.title}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-charcoal italic">Awards and recognitions will be featured here.</p>
            )}
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-max text-center">
          <h2 className="text-teal mb-6">Let's Connect</h2>
          <p className="text-lg text-charcoal mb-8 max-w-2xl mx-auto">
            Whether you're looking for data visualization expertise, accessibility guidance, or just want to
            chat about data stories, I'd love to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="mailto:hello@rbgdata.com" className="btn btn-primary">
              Email Me
            </a>
            <a
              href="https://www.youtube.com/@rbgdata"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              Subscribe on YouTube
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
