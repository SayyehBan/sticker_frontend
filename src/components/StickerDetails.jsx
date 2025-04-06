import { Link, useParams } from "react-router-dom";
import { Server_URL } from "../utilities/constants/contactValue";
import CustomNumeralNumericFormat from "./Price";
import { Helmet } from "react-helmet";
import { FaArrowLeft } from "react-icons/fa";
import StickerForm from "./StickerForm";
import { useStickersFindByIDQuery } from "../slices/stickerApi";

const StickerDetails = () => {
  const { stickerID } = useParams();
  const { data: sticker, isSuccess } = useStickersFindByIDQuery(
    parseInt(stickerID)
  );
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl mx-auto flex flex-col md:flex-row gap-6 md:gap-8">
        {isSuccess ? (
          <>
            <Helmet>
              <title>{sticker.title}</title>
            </Helmet>

            {/* Image Section */}
            <div className="w-full md:w-1/2 flex justify-center">
              <div className="relative w-full max-w-md overflow-hidden rounded-xl shadow-lg bg-white border border-gray-200">
                <img
                  src={`${Server_URL}${sticker.sticker}`}
                  alt={sticker.title}
                  className="w-full h-96 object-cover transition-transform duration-500 ease-in-out hover:scale-105"
                />
              </div>
            </div>

            {/* Details Section */}
            <div className="w-full md:w-1/2 flex flex-col gap-6">
              {/* Back Button */}
              <Link
                to="/"
                className="group flex items-center justify-center gap-2 w-full max-w-xs mx-auto py-2.5 px-4 text-lg font-semibold text-indigo-600 border-2 border-indigo-600 rounded-md hover:bg-indigo-50 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:ring-offset-2 transition-colors duration-200"
              >
                <FaArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                برگشت به صفحه محصولات
              </Link>

              {/* Sticker Info */}
              <div className="space-y-4">
                <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl leading-tight">
                  {sticker.title}
                </h1>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {sticker.description}
                </p>
                <div className="text-xl font-semibold text-indigo-600">
                  <CustomNumeralNumericFormat
                    value={sticker.price}
                    thousandSeparator=","
                    prefix="قیمت: "
                    suffix=" تومان"
                  />
                </div>
              </div>
              <StickerForm sticker={sticker} />
            </div>
          </>
        ) : (
          <p className="text-center text-gray-500 text-lg">بارگذاری محصول...</p>
        )}
      </div>
    </div>
  );
};

export default StickerDetails;
