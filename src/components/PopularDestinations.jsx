import DestinationCard from "./DestinationCard"

function PopularDestinations() {

  const destinations = [
    {
      title: "Jolotundo Glamping",
      location: "Loceret, Nganjuk",
      category: "Wisata Alam",
      image:
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200"
    },
    {
      title: "Air Terjun Sedudo",
      location: "Sawahan, Nganjuk",
      category: "Wisata Alam",
      image:
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1200"
    },
    {
      title: "Candi Ngetos",
      location: "Ngetos, Nganjuk",
      category: "Wisata Budaya",
      image:
        "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?q=80&w=1200"
    },
    {
      title: "Bukit Surga",
      location: "Ngluyu, Nganjuk",
      category: "Hidden Gem",
      image:
        "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200"
    }
  ]

  return (
    <section className="py-20 bg-white">

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-12">

          <h2 className="text-4xl font-bold text-green-900">
            Destinasi Populer
          </h2>

          <p className="text-gray-600 mt-3">
            Temukan tempat wisata favorit yang banyak dikunjungi wisatawan.
          </p>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {destinations.map((item, index) => (
            <DestinationCard
              key={index}
              image={item.image}
              title={item.title}
              location={item.location}
              category={item.category}
            />
          ))}

        </div>

      </div>

    </section>
  )
}

export default PopularDestinations