import { FaGithub, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-4 w-full fixed bottom-0">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center px-4">
        {/* Text */}
        <p className="mb-2 md:mb-0">Made with ❤️ by Azmi Nailal Hadi</p>

        {/* Social Media Icons */}
        <div className="flex space-x-4">
          <a
            href="https://github.com/MoccaGod"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-white transition-colors"
          >
            <FaGithub size={24} />
          </a>
          <a
            href="https://twitter.com/moccagod"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-white transition-colors"
          >
            <FaTwitter size={24} />
          </a>
          <a
            href="https://instagram.com/azminailalhadi"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-white transition-colors"
          >
            <FaInstagram size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
