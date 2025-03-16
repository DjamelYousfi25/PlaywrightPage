// Selectors.ts
export const selectors = {
  // Login page
  username: 'input[name="username"]', // Retourne une chaîne de caractères
  password: 'input[name="password"]', // Retourne une chaîne de caractères
  loginButton: 'button[type="submit"]', // Retourne une chaîne de caractères
  recrutementLink: '//*[@id="app"]//aside//li[5]/a', // Exemple de sélecteur pour un lien
  Time_at_Work_label: "#app", // Exemple de sélecteur pour un label

  // Search Candidate page (view candidate)
  FullnameSearch: 'input[placeholder="Type for hints..."]',
  //ListBoxSelect: ".oxd-select-dropdown",
  ListBoxSelect: (page) => page.getByRole("listbox"),
  SearchButton: 'button[type="submit"]',
  ActuelFullNameResult: ".oxd-table",

  // Creation candidate page
  addButton: 'button:has-text("Add")',
  firstName: 'input[name="firstName"]',
  lastName: 'input[name="lastName"]',
  vacancyDropdownIcon: ".oxd-select-text--arrow",
  vacancyOption: 'text="Junior Account Assistant"',
  email: 'input[placeholder="Type here"]',
  phoneNumber: 'input[placeholder="Type here"]',
  browseButton: 'input[type="file"]',
  saveButton: 'button:has-text("Save")',
  fullNameCheck: "#app",

  //logout
  accountName: '//*[@id="app"]//header//ul//p',
  Logout: '//*[@id="app"]//header//ul/li/ul/li[4]/a'
};
