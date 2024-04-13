import React from "react";
import PropTypes from "prop-types";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function extractDateOnly(dateTimeString) {
  if (!dateTimeString) {
    return null;
  }
  return dateTimeString.substring(0, 10);
}
// npx jsdoc chemin/vers/votre/fichier.js

/**
 * Fonction pour extraire uniquement la date à partir d'une chaîne de date/heure.
 * @param {string} dateStr - Chaîne de date/heure au format ISO.
 * @returns {string|null} La date extraite ou null si la chaîne est vide.
 */
function convertirDateFrancais(dateStr) {
  // Créer un objet Date à partir de la chaîne ISO
  var dateObj = new Date(dateStr);

  // Options pour le formatage de la date
  var options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };

  // Formater la date en français
  var dateFrancaise = dateObj.toLocaleString("fr-FR", options);

  return dateFrancaise;
}

const PDFComponent = ({ rapportSelected }) => {
  const doc = new jsPDF({
    orientation: "landscape",
    unit: "pt",
    format: [842, 595],
  });

  const entete = `Rapport du ${extractDateOnly(rapportSelected.date)} => ${
    rapportSelected?.nbApplication
  } applications , ${
    rapportSelected?.nbApplicationGratuite
  } application(s) gratuite(s) et ${rapportSelected.nbDeploiement} deploiement(s)`;
  doc.text(entete, 50, 30);

  const generateApplicationContent = () => {
    let content = [];

    rapportSelected.applications.forEach((application) => {
      content.push([
        application.nom,
        application.editeur,
        application.version,
        application.fonctionnalite,
        application.categorie,
        convertirDateFrancais(application.dateInstallation),
        `${application.coutInstallation} francs cfa`,
        application.utilisateur,
      ]);
    });

    return content;
  };

  const generateLicenseContent = () => {
    let content = [];

    rapportSelected.licences.forEach((licence) => {
      content.push([
        licence.type,
        licence.nbre_Utilisateur,
        `${licence.cout_Licence} francs cfa ${licence.methode_Paiement}`,
        `${licence.application.nom} ${licence.application.version}`,
        licence.application.utilisateur,
        convertirDateFrancais(licence.date_Expiration),
      ]);
    });

    return content;
  };

  const generateDeploymentContent = () => {
    let content = [];

    rapportSelected.deploiements.forEach((deploiement) => {
      content.push([
        deploiement.serveur,
        convertirDateFrancais(deploiement.date_deploiement),
        `${deploiement.application.nom} ${deploiement.application.version}`,
        deploiement.utilisateur,
      ]);
    });

    return content;
  };

  const applicationTableData = generateApplicationContent();
  const licenseTableData = generateLicenseContent();
  const deploymentTableData = generateDeploymentContent();

  // Create separate tables for each section
  autoTable(doc, {
    head: [
      [
        {
          content: "Tableau des Applications",
          colSpan: 8,
          styles: { halign: "center" },
        },
      ],
      [
        "Nom",
        "Editeur",
        "Version",
        "Fonctionnalité",
        "Catégorie",
        "Date d'installation",
        "Coût d'installation",
        "Enregistrée par",
      ],
    ],
    body: applicationTableData,
    startY: 60,
  });

  // Add a page break after the first table
  doc.addPage();

  autoTable(doc, {
    head: [
      [
        {
          content: "Tableau des Licences",
          colSpan: 6,
          styles: { halign: "center" },
        },
      ],
      [
        "Type",
        "Nb. Utilisateurs",
        "Coût Licence (Francs CFA, Paiement)",
        "Application (Version)",
        "Utilisateur",
        "Date d'expiration",
      ],
    ],
    body: licenseTableData,
    startY: 30,
  });

  // Add another page break after the second table
  doc.addPage();

  autoTable(doc, {
    head: [
      [
        {
          content: "Tableau des Déploiements",
          colSpan: 4,
          styles: { halign: "center" },
        },
      ],
      [
        "Serveur",
        "Date de déploiement",
        "Application (Version)",
        "Utilisateur",
      ],
    ],
    body: deploymentTableData,
    startY: 30,
  });

  doc.save(`Rapport du ${extractDateOnly(rapportSelected.date)}.pdf`);
};

PDFComponent.propTypes = {
  rapportSelected: PropTypes.object.isRequired,
};

export default PDFComponent;
