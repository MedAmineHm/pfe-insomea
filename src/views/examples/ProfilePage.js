import React from "react";
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import Footer from "components/Footer/Footer.js";

export default function ProfilePage() {
  React.useEffect(() => {
    document.body.classList.toggle("landing-page");
    return function cleanup() {
      document.body.classList.toggle("landing-page");
    };
  }, []);

  return (
    <>
      <ExamplesNavbar />
      <div className="wrapper">
        <div className="page-header">
          {/* Your existing code for images and shapes */}
        </div>

        {/* Sections with images */}
        <section className="section section-lg">
          {/* Your existing code for images */}
        </section>

        {/* Additional sections with images */}

        <Footer />
      </div>
    </>
  );
}
