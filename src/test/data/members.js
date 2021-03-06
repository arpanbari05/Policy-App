export const membersList = [
  {
    code: "self",
    display_name: "Self",
    min_age: "18",
    max_age: "150",
    is_primary: true,
    multiple: false,
    isSelected: true,
    age: { code: 27, display_name: "27 Years" },
  },
  {
    code: "spouse",
    display_name: "Spouse",
    min_age: "18",
    max_age: "150",
    is_primary: true,
    multiple: false,
  },
  {
    code: "son1",
    display_name: "Son 1",
    min_age: "0.3",
    max_age: "30",
    is_primary: true,
    multiple: true,
    base: { code: "son", display_name: "Son" },
    isSelected: true,
  },
  {
    code: "daughter1",
    display_name: "Daughter 1",
    min_age: "0.3",
    max_age: "30",
    is_primary: true,
    multiple: true,
    base: { code: "daughter", display_name: "Daughter" },
    isSelected: true,
    age: { code: 2, display_name: "2 Years" },
  },
  {
    code: "father",
    display_name: "Father",
    min_age: "40",
    max_age: "150",
    is_primary: true,
    multiple: false,
    isSelected: true,
    age: { code: 97, display_name: "97 Years" },
  },
  {
    code: "mother",
    display_name: "Mother",
    min_age: "40",
    max_age: "150",
    is_primary: true,
    multiple: false,
  },
  {
    code: "grand_father",
    display_name: "Grand Father",
    min_age: "54",
    max_age: "150",
    is_primary: false,
    multiple: false,
  },
  {
    code: "grand_mother",
    display_name: "Grand Mother",
    min_age: "54",
    max_age: "150",
    is_primary: false,
    multiple: false,
  },
  {
    code: "father_in_law",
    display_name: "Father-in-law",
    min_age: "40",
    max_age: "150",
    is_primary: false,
    multiple: false,
  },
  {
    code: "mother_in_law",
    display_name: "Mother-in-law",
    min_age: "40",
    max_age: "150",
    is_primary: false,
    multiple: false,
  },
];
