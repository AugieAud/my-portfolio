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
          <a href="mailto:your.email@example.com" className="text-blue-600 hover:underline">
            your.email@example.com
          </a>
        </p>
        <p className="flex items-center">
          <span className="font-medium mr-2">LinkedIn:</span>
          <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
            linkedin.com/in/yourprofile
          </a>
        </p>
      </div>
    </div>
  );
}
