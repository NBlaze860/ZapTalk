import { assets } from "../assets/assets.js";
import { useThemeStore } from "../store/useThemeStore.js";

const AuthImagePattern = () => {
  const {theme} = useThemeStore(); 
  return (
    <div className=" justify-center w-full items-center gap-4 flex flex-col bg-base-200">
      <img
        src={assets.messenger}
        className={`size-24 opacity-80 flex mt-10 ${
          ["dark", "synthwave", "halloween", "forest", "black", "luxury", "dracula", "business", "night", "coffee", "sunset"].includes(theme) 
            ? "invert" 
            : ""
        }`}
        alt=""
      />
      <div className="text-zinc-300 text-2xl tracking-wide">ZapTalk</div>
      <div className="justify-center items-center flex flex-col tracking-wide text-lg mb-10">
        <div>Seamless chats, anytime, anywhere.</div>
        <div>Stay connected across all your devices.</div>
      </div>
    </div>
  );
};

export default AuthImagePattern;
