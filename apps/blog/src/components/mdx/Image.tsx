interface Props {
  src: string;
  alt?: string;
  width?: number | string;
  height?: number | string;
}

export default function Image({ src, alt = '', width, height }: Props) {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
      style={{
        maxWidth: '100%',
        borderRadius: '0.5rem',
        margin: '1.5rem auto',
        display: 'block',
      }}
    />
  );
}
