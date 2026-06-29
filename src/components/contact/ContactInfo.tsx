import {
  FaEnvelope,
  FaPhone,
  FaLocationDot,
} from "react-icons/fa6";

export default function ContactInfo() {
  return (
    <div>
      <h2 className="text-4xl font-bold mb-10">
        Get In Touch
      </h2>

      <div className="space-y-8">
        <div className="flex gap-5">
          <FaEnvelope className="text-2xl text-blue-600" />

          <div>
            <h3 className="font-semibold">
              Email
            </h3>

            <p className="text-gray-600">
              info@rgis.org
            </p>
          </div>
        </div>

        <div className="flex gap-5">
          <FaPhone className="text-2xl text-blue-600" />

          <div>
            <h3 className="font-semibold">
              Phone
            </h3>

            <p className="text-gray-600">
              +92 300 1234567
            </p>
          </div>
        </div>

        <div className="flex gap-5">
          <FaLocationDot className="text-2xl text-blue-600" />

          <div>
            <h3 className="font-semibold">
              Address
            </h3>

            <p className="text-gray-600">
              Research Grant Intelligence System
              (RGIS)
              <br />
              Karachi, Pakistan
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
