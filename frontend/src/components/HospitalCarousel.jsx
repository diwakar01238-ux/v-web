import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react'; // Added useEffect
import SectionHeading from "../components/home/SectionHeading";
import url_prefix from "../data/variable";
import { useLanguage } from '../hooks/useLanguage';
import HospitalCard from './HospitalCard';

const HospitalCarousel = () => { // Removed hospitals prop
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [language] = useLanguage();
  const [headings, setHeadings] = useState({
    'title': 'Not Available For Selected Language',
    'sub': '',
    'desc': ''
  });

  // Fetch hospitals data from API
  useEffect(() => {
    if (!language) {
      console.log('Language not yet available, skipping fetch');
      return;
    }

    const fetchHospitals = async () => {
      try {
        const response = await fetch(url_prefix + '/api/hospitals/all');

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();

        if (result.success) {
          let dataToSet;
          if (Array.isArray(result.data)) {
            dataToSet = result.data.filter(
              item => item.language?.toLowerCase() === language?.toLowerCase()
            );
          } else {
            dataToSet =
              result.data.language?.toLowerCase() === language?.toLowerCase()
                ? [result.data]
                : [];
          }

          if (dataToSet.length > 0) {
            console.log('Setting aboutData:', dataToSet);
            setHospitals(dataToSet);
            setError(null);
            setHeadings({
              title: dataToSet[0].htitle,
              sub: dataToSet[0].hsubtitle,
              desc: dataToSet[0].hdesc
            })
          }
        }
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err.message);
        setHospitals([]);
      } finally {
        setLoading(false);
      }
    };
    console.log('Language from hook:', language);
    fetchHospitals();
  }, [language]);

  // Group hospitals by country
  const countryGroups = hospitals.reduce((acc, hospital) => {
    acc[hospital.country] = acc[hospital.country] || [];
    acc[hospital.country].push(hospital);
    return acc;
  }, {});

  const countryNames = Object.keys(countryGroups);
  const [currentCountryIndex, setCurrentCountryIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const selectCountry = (index) => {
    setDirection(index > currentCountryIndex ? 1 : -1);
    setCurrentCountryIndex(index);
  };

  // Animation variants
  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0.5,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
    exit: (direction) => ({
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0.5,
      transition: { duration: 0.5 },
    }),
  };

  // Loading state
  if (loading) {
    return (
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <SectionHeading
            center={true}
            // title="Partner Hospitals"
            // subtitle="World-Class Healthcare Facilities"
            // description="We collaborate with accredited hospitals that offer state-of-the-art technology and expert medical staff"
            // title={headings.title}
            // subtitle={headings.sub}
            // description={headings.desc}
            title='hospital'

          />
          <div className="flex justify-center mb-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-600"></div>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <SectionHeading
            center={true}
            title="Partner Hospitals"
            subtitle="World-Class Healthcare Facilities"
          />
          <div className="text-center text-red-600 py-8">
            <p>Error loading hospitals: {error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-teal-600 text-white rounded-md"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  // No hospitals found
  if (hospitals.length === 0) {
    return (
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <SectionHeading
            center={true}
            title={headings.title}
            subtitle={headings.sub}
          // description={headings.desc}

          />
          <div className="text-center text-gray-500 py-8">
            <p>No hospitals found.</p>
          </div>
        </div>
      </section>
    );
  }

  const currentCountry = countryNames[currentCountryIndex];
  const currentHospitals = countryGroups[currentCountry] || [];

  return (
    <section className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <SectionHeading
          center={true}
          // title="Partner Hospitals"
          // subtitle="World-Class Healthcare Facilities"
          // // description="We collaborate with accredited hospitals that offer state-of-the-art technology and expert medical staff"
          title={'hospital'}
        />

        {/* Country tabs */}
        <div className="flex justify-center mb-8 border-b border-gray-200">
          <div className="flex space-x-1">
            {countryNames.map((country, index) => (
              <button
                key={country}
                onClick={() => selectCountry(index)}
                className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${index === currentCountryIndex
                  ? 'bg-[#008080] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                {country}
              </button>
            ))}
          </div>
        </div>


        {/* Animated hospital cards */}
        <div className="relative bg-sectiondiv p-10 rounded-lg min-h-[400px]">
          <AnimatePresence custom={direction} initial={false}>
            <motion.div
              key={currentCountryIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {currentHospitals.map((hospital) => (
                <HospitalCard key={hospital._id} hospital={hospital} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default HospitalCarousel;
