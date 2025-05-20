export default function Contact() {
  return (
    <div className="p-8 max-w-2xl">
      <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
      <p className="text-gray-600 mb-4">
        I'm always open to new opportunities and collaborations.
      </p>
      <div className="space-y-2">
        <p className="flex items-center">
          <span className="font-medium mr-2">Email:</span>
          <a
            href="mailto:ajschnello@gmail.com"
            className="text-blue-600 hover:underline"
          >
            ajschnello@gmail.com
          </a>
        </p>
        <p className="flex items-center">
          <span className="font-medium mr-2">LinkedIn:</span>
          <a
            href="https://www.linkedin.com/in/augie-schnell-067980342/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            linkedin.com/in/augie-schnell-067980342/
          </a>

        </p>
        <p className="flex items-center">
          <span className="font-medium mr-2">Github:</span>
          <a
            href="https://github.com/AugieAud"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            github.com/AugieAud
          </a>
        </p>
      </div>
    </div>
  );
}
