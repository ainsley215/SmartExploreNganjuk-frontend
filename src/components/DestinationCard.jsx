function DestinationCard({ image, title, location, category }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition">

      <img
        src={image}
        alt={title}
        className="w-full h-56 object-cover"
      />

      <div className="p-5">
        <h3 className="text-xl font-semibold">
          {title}
        </h3>

        <p className="text-gray-500 mt-1">
          📍 {location}
        </p>

        <span className="inline-block mt-3 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
          {category}
        </span>
      </div>

    </div>
  )
}


export default DestinationCard