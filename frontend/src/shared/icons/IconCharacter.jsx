import "./IconCharacter.css";

function BaseIcon({ src, alt }) {
  return (
    <img
      src={src}
      alt={alt}
      className="icon-character-image"
    />
  );
}

function HelloIcon() {
  return (
    <BaseIcon
      src={import.meta.env.VITE_CHARACTER_IMAGE}
      alt="hello"
    />
  );
}


const IconCharacter = {
  Hello: HelloIcon,
};

export default IconCharacter;
