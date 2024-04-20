export default function Reviews() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-10 px-12 py-10 bg-gray-100 rounded-lg shadow-md">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-2 text-purple-500">10K+</h1>
        <p className="text-gray-600">Happy Clients</p>
      </div>

      <div className="text-center">
        <h1 className="text-4xl font-bold mb-2 text-purple-500">100+</h1>
        <p className="text-gray-600">Team Members</p>
      </div>

      <div className="text-center">
        <h1 className="text-4xl font-bold mb-2 text-purple-500">500+</h1>
        <p className="text-gray-600">Positive Reviews</p>
      </div>

      <div className="text-center">
        <h1 className="text-4xl font-bold mb-2 text-purple-500">20+</h1>
        <p className="text-gray-600">Towns Served</p>
      </div>
    </div>
  );
}
