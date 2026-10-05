import Link from 'next/link';

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
                I'm Rebecca Gourley, a data visualization specialist passionate about making data accessible,
                understandable, and beautiful. With a focus on Tableau and interactive design, I help teams
                tell compelling stories with their data.
              </p>
              <p className="mb-4">
                My approach follows three simple principles: <span className="text-coral font-bold">Frame</span> the
                problem, <span className="text-coral font-bold">Build</span> the solution, and{' '}
                <span className="text-coral font-bold">Validate</span> the result.
              </p>
              <p className="mb-4">
                I believe that good data visualization is more than just making charts look nice—it's about
                making information accessible to everyone, including people using assistive technologies.
              </p>
            </div>

            <div className="bg-cream p-8 border-l-4 border-coral">
              <h3 className="text-coral font-black mb-4">Core Values</h3>
              <ul className="space-y-3">
                <li className="flex gap-3">
                  <span className="text-coral font-bold">▪</span>
                  <span>Accessibility First</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-teal font-bold">▪</span>
                  <span>Clear Communication</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-gold font-bold">▪</span>
                  <span>Thoughtful Design</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-coral font-bold">▪</span>
                  <span>Continuous Learning</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t-2 border-coral pt-12 mb-12">
            <h2 className="text-teal mb-6">Expertise</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-coral font-bold mb-3">Technical Skills</h3>
                <ul className="space-y-2 text-charcoal">
                  <li>✓ Tableau visualization & design</li>
                  <li>✓ Data analysis & storytelling</li>
                  <li>✓ Accessibility (WCAG, screen readers)</li>
                  <li>✓ Interactive design patterns</li>
                </ul>
              </div>
              <div>
                <h3 className="text-teal font-bold mb-3">Specialties</h3>
                <ul className="space-y-2 text-charcoal">
                  <li>✓ Dashboard design & usability</li>
                  <li>✓ Data visualization tutorials</li>
                  <li>✓ Accessibility audits</li>
                  <li>✓ Creative data stories</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-charcoal text-cream p-12 rounded-none">
            <h2 className="text-coral mb-4">The Frame → Build → Validate Methodology</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-coral font-bold mb-2">🎯 Frame the Problem</h3>
                <p>
                  Start with clear questions: What decision needs to be made? Who is the audience? What data
                  tells the story? A well-framed problem is half solved.
                </p>
              </div>
              <div>
                <h3 className="text-gold font-bold mb-2">🔨 Build the Solution</h3>
                <p>
                  Design and develop visualizations with intention. Consider accessibility from the start,
                  use clean design principles, and prioritize user experience.
                </p>
              </div>
              <div>
                <h3 className="text-coral font-bold mb-2">✓ Validate the Result</h3>
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
