export function FeatureBadge({ data }) {
  return (
    <article>
      <h4>{data.tagline}</h4>
      <div>
        <img src={data.image} alt={data.image} />
      </div>
      <div>{data.description}</div>
    </article>
  );
}
