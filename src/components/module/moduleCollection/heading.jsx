export default function Heading({size, text}) {
  const Tag = `h${size}`;
  return <Tag>{text}</Tag>;
}
