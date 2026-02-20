interface Props {
  src: string;
}

export default function Video({ src }: Props) {
  return (
    <video
      src={src}
      controls
      style={{
        maxWidth: '100%',
        maxHeight: '400px',
        display: 'block',
        margin: '1.5rem auto',
        borderRadius: '0.5rem',
      }}
    />
  );
}
