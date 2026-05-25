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
      src={import.meta.env.VITE_CHARACTER_IMAGE_HELLO}
      alt="hello"
    />
  );
}

function WelcomeIcon() {
  return (
    <BaseIcon
      src={import.meta.env.VITE_CHARACTER_IMAGE_WELCOME}
      alt="welcome"
    />
  );
}

function ComebackIcon() {
  return (
    <BaseIcon
      src={import.meta.env.VITE_CHARACTER_IMAGE_COMEBACK}
      alt="comeback"
    />
  );
}


const IconCharacter = {
  Hello: HelloIcon,
  Welcome: WelcomeIcon,
  Comeback: ComebackIcon,
};

export default IconCharacter;
