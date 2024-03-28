import React from "react";
import { CFooter } from "@coreui/react";

const AppFooter = () => {
  return (
    <CFooter>
      {/* <div>
        <a href="https://coreui.io" target="_blank" rel="noopener noreferrer">
          CoreUI
        </a>
        <span className="ms-1">&copy; 2023 creativeLabs.</span>
      </div> */}
      {/* <div className="ms-auto">
        <span className="me-1">Powered by</span>
        <a href="https://coreui.io/react" target="_blank" rel="noopener noreferrer">
          CoreUI React Admin &amp; Dashboard Template
        </a>
      </div> */}
      {/* <a href="#"> */}
      <div className="text-center" style={{ textAlign: "center" }}>
        &copy; Groupe-6-Seydina Mouhamadou Alhamine Ndiaye - Abdoulaye Gaye -
        Souleymane Diagne
      </div>
      {/* </a> */}
    </CFooter>
  );
};

export default React.memo(AppFooter);