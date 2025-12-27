import { FeatureBadge } from './featureBadge/featureBadge';

const featDataSet = [
  {
    tagline: 'Appearance',
    image: '',
    description: 'Tweak colors, fonts, themes to match the vibe of your event',
  },
  {
    tagline: 'Logistics',
    image: '',
    description:
      'Include everything your guests need: Location, attire, even an itinerary',
  },
  {
    tagline: 'Modular and custom pages',
    image: '',
    description:
      'Add and edit layout to curate exactly the experience you want guests to have navigating your site',
  },
];

export function Features() {
  return (
    <section className="features">
      <header className="features__header">
        <h2>Focus on the Creativity</h2>
      </header>

      <div className="features__list">
        {featDataSet.map((item) => (
          <FeatureBadge
            key={item.tagline}
            data={item}
          />
        ))}
      </div>

      <div className="features__extras">
        <h3>You Were the Life of the Party, Relive the Best Moments</h3>

        <div className="features__extras-grid">
          <article className="feature-extra">
            <img src="" alt="Chat with your guests" />
            <h4>Chat with your guests</h4>
          </article>

          <article className="feature-extra">
            <img src="" alt="Upload pictures" />
            <h4>Upload pictures</h4>
          </article>
        </div>
      </div>
    </section>
  );
}
