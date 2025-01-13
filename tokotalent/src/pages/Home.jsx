import { TfiTimer } from "react-icons/tfi";

function Home() {
  const foodImages = [
    "https://d2vuyvo9qdtgo9.cloudfront.net/foods/October2023/PYlJyb4lmSQcFsXktwmC.webp", // Egg McMuffin
    "https://d2vuyvo9qdtgo9.cloudfront.net/foods/October2023/9hn3Gu6SwCg8TNBMaXFr.webp", // Sausage McMuffin with Egg
    "https://d2vuyvo9qdtgo9.cloudfront.net/foods/October2023/l47DeJBbY77Th47JfIAn.webp", // Sausage Wrap
    "https://d2vuyvo9qdtgo9.cloudfront.net/foods/November2023/moYXCc5o7XBlsQhLAoxr.webp", // Big Breakfast
  ];

  return (
    <>
      <div className="w-full h-screen flex flex-col justify-center items-center text-center text-red-800 px-10 animate-slidein">
        <div className="flex flex-col justify-center items-center text-center w-full max-w-3xl mb-8 ">
          <h1 className="text-4xl font-bold leading-tight flex gap-2 opacity-80">
            Madura24Jam
            <TfiTimer />
          </h1>
          <p className="text-lg pr-5 max-w-xl mx-auto text-opacity-80">
            tau sendiri toko yang ga pernah tutup toko apa, ya bener{" "}
            <strong>MADURA</strong>
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-4 w-full max-w-3xl">
          {foodImages.map((image, index) => (
            <div
              key={index}
              className="flex justify-center items-center bg-gray-100 rounded-lg shadow-lg overflow-hidden w-40 h-40"
            >
              <img
                src={image}
                alt={`food-${index}`}
                className="object-cover w-full h-full"
              />
            </div>
          ))}
        </div>
        <div className="mt-8">
          <a href="/Menu">
            <button className="bg-red-800 text-white px-6 py-2 rounded-md">
              Masuk
            </button>
          </a>
        </div>
      </div>
    </>
  );
}

export default Home;
