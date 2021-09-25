/**
 * Form validators
 */
const nameRules = [(v) => !!v || "Veuillez saisir un nom/prénom"];
const emailRules = [
  (v) => !!v || "Veuillez saisir votre mail",
  (v) => /.+@.+\..+/.test(v) || "Le mail n'est pas correct",
];
const numberRules = [
  //(v) => !!v || "Veuillez saisir votre numéro",
  (v) => v.length == 10 || "Le numéro n'est pas correct",
  (v) => !isNaN(v) || "Seuls les chiffres sont autorisés",
];

const messageRules = [(v) => v.length < 100 || "Le message est très long"];
const subjectRules = [(v) => !!v || "Veuillez choisir un sujét"]
const requiredRules = [(v) => !!v || "Champ obligatoire"]
const passwordRules = [(v) => v.length > 5 || "Au moins 6 caractères"]
/**
 * Towns
 */
const towns = [
  { name: "Valenciennes", code: "59300" },
  { name: "Raismes", code: "59590" },
  { name: "Bruay-sur-l'Escaut", code: "59860" },
  { name: "Beuvrages", code: "59192" },
  { name: "Anzin", code: "59410" },
  { name: "Petite Forêt", code: "59494" },
  { name: "Escaupont", code: "59278" },
  { name: "Fresnes-sur-l'Escaut", code: "59970" },
];

/**
 * Categories
 */
const categories = [
  //"Tout",
  "Garde d'Animaux",
  "Aide en cuisine",
  "Aide au jardinage",
  "Coup de main ménager",
  //"OTHER",
];

/**
 * Sort options
 */
const sortOptions = [
  { title: "Le plus récent", value: "desc" },
  { title: "Le plus ancien", value: "asc" },
  /* No default order for now
    { title: "Par défaut", value: "" } */
];

export {
  // rules
  requiredRules,
  passwordRules,
  nameRules,
  emailRules,
  numberRules,
  messageRules,
  subjectRules,
  // lists
  towns,
  categories,
  sortOptions,
};