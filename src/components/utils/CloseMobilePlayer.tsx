const BackButton: React.FC = () => {
  const handleBackClick = () => {
    window.history.back();
  };

  return (
    <button
      id="backButton"
      className="hover:text-zinc-400 text-white"
      onClick={handleBackClick}
    >
      <span
        aria-hidden="true"
        className="IconWrapper__Wrapper-sc-16usrgb-0 hYdsxw"
      >
        <svg
          role="img"
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="Svg-sc-ytk21e-0 bneLcE"
          fill="currentColor"
          height="24"
          width="24"
        >
          <path d="M2.793 8.043a1 1 0 0 1 1.414 0L12 15.836l7.793-7.793a1 1 0 1 1 1.414 1.414L12 18.664 2.793 9.457a1 1 0 0 1 0-1.414z"></path>
        </svg>
      </span>
    </button>
  );
};

export default BackButton;
