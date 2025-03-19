// Selectors.ts
export const selectors = {
  // Login page
  username: 'input[name="username"]', // Retourne une chaîne de caractères
  password: 'input[name="password"]', // Retourne une chaîne de caractères
  //username: (page) => page.getByRole("textbox", { name: "Username" }),
  //password: (page) => page.getByRole("textbox", { name: "Password" }),

  loginButton: 'button[type="submit"]', // Retourne une chaîne de caractères
  recrutementLink: '//*[@id="app"]//aside//li[5]/a', // Exemple de sélecteur pour un lien
  Time_at_Work_label: "#app", // Exemple de sélecteur pour un label
  //errorLogin: '//*[@id="app"]//div[1]/p',
  errorLogin: (page) => page.getByText("Invalid credentials"),

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
  //vacancyOption: 'text="Senior QA Lead',
  vacancyOption: (page) => page.getByText("Senior QA Lead"),

  email: 'input[placeholder="Type here"]',
  phoneNumber: 'input[placeholder="Type here"]',
  browseButton: 'input[type="file"]',
  saveButton: 'button:has-text("Save")',
  fullNameCheck: (page) => page.getByText("djamel yousfi", { exact: true }),
  RequiredFirstName:
    '//*[@id="app"]/div[1]/div[2]/div[2]/div/div/form/div[1]/div/div/div/div[2]/div[1]/span',
  RequiredLastName:
    '//*[@id="app"]/div[1]/div[2]/div[2]/div/div/form/div[1]/div/div/div/div[2]/div[3]/span',
  RequiredEmail:
    '//*[@id="app"]/div[1]/div[2]/div[2]/div/div/form/div[3]/div/div[1]/div/span',

  //-----------------------------------------

  PimLink: '//*[@id="app"]/div[1]/div[1]/aside/nav/div[2]/ul/li[2]/a',
  // PimLink: (page) => page.getByRole("link", { name: "PIM" }),
  AddButtonPim: (page) => page.getByRole("button", { name: " Add" }),
  First_name: (page) => page.getByRole("textbox", { name: "First Name" }),
  Middle_name: (page) => page.getByRole("textbox", { name: "Middle Name" }),
  Last_name: (page) => page.getByRole("textbox", { name: "Last Name" }),
  Employee_Id: (page) => page.locator("form").getByRole("textbox"),
  Save_button: (page) => page.getByRole("button", { name: "Save" }),
  FullEmployeenamecheck: (page) =>
    page.getByRole("heading", { name: "djamel mail@mail.com" }),

  //logout
  accountNameImg: (page) =>
    page.getByRole("banner").getByRole("img", { name: "profile picture" }),
  accountName: '//*[@id="app"]//header//ul//p',
  Logout: '//*[@id="app"]//header//ul/li/ul/li[4]/a',
};
