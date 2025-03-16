export const selectors = {

  FullnameSearch: (page) =>page.getByRole("textbox", { name: "Type for hints..." }),
  ListBoxSelect: (page) => page.getByRole("listbox"),
  SearchButton: (page) => page.getByRole("button",{ name: "Search" }),
  ActuelFullNameResult: (page) => page.getByRole( "table" ),
};


  