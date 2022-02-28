export const frontendBootResponse = {
  genders: [
    { code: "M", display_name: "Male" },
    { code: "F", display_name: "Female" },
  ],
  plantypes: [
    { code: "I", display_name: "Individual", description: "" },
    {
      code: "F",
      display_name: "Family Floater",
      description:
        "Family floater plan covers your entire family under one single plan. The total sum insured is shared amongst each family members",
    },
    {
      code: "M",
      display_name: "Multi Individual",
      description:
        "Multi-individual plan covers each family member under separate sum insured. You get discount if you cover 2 or more family members under multi-individual plan.",
    },
  ],
  members: [
    {
      code: "self",
      display_name: "Self",
      min_age: "18",
      max_age: "99",
      is_primary: true,
    },
    {
      code: "spouse",
      display_name: "Spouse",
      min_age: "18",
      max_age: "99",
      is_primary: true,
    },
    {
      code: "son",
      display_name: "Son",
      min_age: "0.3",
      max_age: "25",
      is_primary: true,
    },
    {
      code: "daughter",
      display_name: "Daughter",
      min_age: "0.3",
      max_age: "25",
      is_primary: true,
    },
    {
      code: "father",
      display_name: "Father",
      min_age: "40",
      max_age: "99",
      is_primary: true,
    },
    {
      code: "mother",
      display_name: "Mother",
      min_age: "40",
      max_age: "99",
      is_primary: true,
    },
  ],
  popularcities: [
    { name: "Delhi", pincode: 110001 },
    { name: "Pune", pincode: 410301 },
    { name: "Bengaluru", pincode: 560001 },
    { name: "Mumbai", pincode: 400002 },
    { name: "Gurgaon", pincode: 122001 },
    { name: "Ahmedabad", pincode: 380001 },
    { name: "Thane", pincode: 400601 },
  ],
  existingdiseases: [
    { code: "diabetes", display_name: "Diabetes" },
    { code: "hypertension", display_name: "Hypertension" },
    { code: "heart_disease", display_name: "Heart Disease" },
    { code: "other_diseases", display_name: "Other Diseases" },
  ],
  companies: {
    care_health: {
      id: 1,
      name: "Care Health Insurance",
      short_name: "Care Health",
      alias: "care_health",
      logo: "https://healthadmin.fynity.in/storage/Company_logo/care_health_insurance_logo.png",
      insurance_types: [
        "health",
        "top_up",
        "personal_accident",
        "critical_illness",
        "cancer",
      ],
      csr: 92.4,
    },
    manipal_cigna: {
      id: 11,
      name: "Manipal Cigna Health Insurance",
      short_name: "Manipal Cigna Health",
      alias: "manipal_cigna",
      logo: "https://healthadmin.fynity.in/storage/Company_logo/manipal.png",
      insurance_types: ["health", "top_up"],
      csr: 86.67,
    },
  },
  premiums: [
    { code: "<5000", display_name: "< \u20b95,000" },
    { code: "5000-10000", display_name: "\u20b95,000 - \u20b910,000" },
    { code: "10000-15000", display_name: "\u20b910,000 - \u20b915,000" },
    { code: "15000-20000", display_name: "\u20b915,000 - \u20b920,000" },
    { code: ">20000", display_name: "> \u20b920,000" },
  ],
  covers: [
    { code: "100000-300000", display_name: "1 to 3 Lacs" },
    { code: "300000-500000", display_name: "3 to 5 Lacs" },
    { code: "500000-1000000", display_name: "5 to 10 Lacs" },
    { code: "1000000-1500000", display_name: "10 to 15 Lacs" },
    { code: "1500000-2500000", display_name: "15 to 25 Lacs" },
    { code: "2500001-100000000", display_name: "More than 25 Lacs" },
  ],
  morefilters: [
    {
      group_name: "Popular Filters",
      code: "popular_filters",
      options: [
        {
          code: "room_rent_charges",
          display_name: "No Room rent limit",
          description:
            "Room Rent means the amount charged by a Hospital towards Room and Boarding expenses and shall include the associated medical expenses\n                        ",
          operator: "equals",
          value_to_compare: "No sub-limit",
        },
        {
          code: "co_payment",
          display_name: "No Copay",
          description:
            "Co-payment means a cost sharing requirement that the Policy holder will bear a specified percentage of the admissible claims amount\n                        ",
          operator: "equals",
          value_to_compare: "No",
        },
        {
          code: "room_rent_charges",
          display_name: "Single Private Room",
          description:
            "Single Private Room means a basic (most economical of all accommodation) category of single room in a Hospital with or without air-conditioning facility where a single patient is accommodated and which has an attached toilet. \n                        ",
          operator: "in_array",
          value_to_compare: [
            "Single Private Room",
            "Single Private Room upgradable",
            "Single Private A/C Room",
            "Single Private A/C Room (Upgradable)",
          ],
        },
        {
          code: "no pre policy check up",
          display_name: "No Pre-policy Check up",
          description:
            "The pre-policy medical checkup refers to the medical examination that is required before issuing the policy.\n                        ",
        },
      ],
    },
    {
      group_name: "Pre existing Ailments",
      code: "pre_existing_ailments",
      options: [
        {
          code: "pre_existing_disease_cover",
          display_name: "Covered after 1 year",
          description:
            "Pre-Existing ailment means any condition, injury or disease that is diagnosed or for which medical advice or treatment was recommended by, or received from, a physician prior to the effective date of the policy or its reinstatement. Medical Expesnes are covered after a waiting period of 1 year.\n                        ",
          operator: "equals",
          value_to_compare: "1 Year",
        },
        {
          code: "pre_existing_disease_cover",
          display_name: "Covered after 2 years",
          description:
            "Pre-Existing ailment means any condition, injury or disease that is diagnosed or for which medical advice or treatment was recommended by, or received from, a physician prior to the effective date of the policy or its reinstatement. Medical Expesnes are covered after a waiting period of 2 years.\n                        ",
          operator: "equals",
          value_to_compare: "2 Years",
        },
        {
          code: "pre_existing_disease_cover",
          display_name: "Covered after 3 years",
          description:
            "Pre-Existing ailment means any condition, injury or disease that is diagnosed or for which medical advice or treatment was recommended by, or received from, a physician prior to the effective date of the policy or its reinstatement. Medical Expesnes are covered after a waiting period of 3 years.\n                        ",
          operator: "equals",
          value_to_compare: "3 Years",
        },
        {
          code: "pre_existing_disease_cover",
          display_name: "Covered after 4 years",
          description:
            "Pre-Existing ailment means any condition, injury or disease that is diagnosed or for which medical advice or treatment was recommended by, or received from, a physician prior to the effective date of the policy or its reinstatement. Medical Expesnes are covered after a waiting period of 4 years.\n                        ",
          operator: "equals",
          value_to_compare: "4 Years",
        },
      ],
    },
    {
      group_name: "No Claim Bonus",
      code: "no_claim_bonus",
      options: [
        {
          code: "no_claim_bonus",
          display_name: "Upto 50%",
          description:
            "Increase or addition in the Sum Insured, maxium up to 50%  without any associated increase in premium in a claim free year. \n                        ",
          operator: "equals",
          value_to_compare: "Increase in Sum Insured maximum up to 50%",
        },
        {
          code: "no_claim_bonus",
          display_name: "Upto 100%",
          description:
            "Increase or addition in the Sum Insured, maxium up to 100%  without any associated increase in premium in a claim free year. \n                        ",
          operator: "equals",
          value_to_compare: "Increase in Sum Insured maximum up to 100%",
        },
        {
          code: "no_claim_bonus",
          display_name: "Upto 150%",
          description:
            "Increase or addition in the Sum Insured, maxium up to 150%  without any associated increase in premium in a claim free year. \n                        ",
          operator: "equals",
          value_to_compare: "Increase in Sum Insured maximum up to 150%",
        },
        {
          code: "no_claim_bonus",
          display_name: "Upto 200%",
          description:
            "Increase or addition in the Sum Insured, maxium up to 200%  without any associated increase in premium in a claim free year. \n                        ",
          operator: "equals",
          value_to_compare: "Increase in Sum Insured maximum up to 200%",
        },
      ],
    },
    {
      group_name: "Others",
      code: "others",
      options: [
        {
          code: "disease_wise_cover",
          display_name: "No limit on treatments",
          description:
            "No specific amount of claim amount is to be paid by the insured person for specific diseases/treatments/procedures.\n                        ",
          operator: "equals",
          value_to_compare: "No sub-limit",
        },
        {
          code: "worldwide_coverage",
          display_name: "Worldwide Cover",
          description:
            "Worldwide coverage is a benefit that offers coverage all over the world.\n                        ",
          operator: "not_equals",
          value_to_compare: "Not Covered",
        },
        {
          code: "free_health_check_up",
          display_name: "Free-health check up",
          description:
            "If You Renew Your Policy without a break, then at every Policy renewal Insurer will pay the expenses incurred towards cost of health check-up up to the Limits Per Policy (excluding any cumulative bonus) .\n                        ",
          operator: "equals",
          value_to_compare: "Yes",
        },
        {
          code: "maternity_cover",
          display_name: "Maternity cover",
          description:
            "Maternity Cover Means Medical Expenses for a delivery (including complicated deliveries and caesarean sections) incurred during Hospitalization; The lawful medical  termination of pregnancy during the Policy Period;\n                        Pre-natal and post-natal Medical Expenses for delivery or termination.",
          operator: "not_equals",
          value_to_compare: "Not Covered",
        },
      ],
    },
  ],
  baseplantypes: [
    { code: "arogya_sanjeevani", display_name: "Arogya Sanjeevani" },
    { code: "global_plans", display_name: "Global Plans" },
    { code: "base_health", display_name: "Base health" },
    { code: "1_crore_plan", display_name: "1 crore plan" },
  ],
  defaultfilters: { cover: "300000-500000", tenure: "1", plan_type: "F" },
  settings: {
    journey_type: "single",
    mobile: "8655986559",
    email: "abc@gmail.com",
    license: "https://www.oneinsure.com/irdai-license",
    logo: "https://healthadmin.fynity.in/storage/tenant_logos/oneInsure.png",
    primary_color: "#f59511",
    secondary_color: "#00afff",
    primary_shade: "#eef1f4",
    secondary_shade: "#ffe8c7",
    addons_visibilty: "0",
    riders_visibilty: "1",
    footer: "",
    multiindividual_visibilty: "0",
    top_up_flow: [""],
  },
  tenant: {
    id: 6,
    name: "Robinhood Insurance Broker Private Limited",
    alias: "robinhood",
    email: "support@oneinsure.com",
    term_frontend_domain: "robinhood-term.fynity.in",
  },
  deductibles: [
    { code: 10000, display_name: 10000 },
    { code: 25000, display_name: 25000 },
    { code: 50000, display_name: 50000 },
    { code: 200000, display_name: 200000 },
    { code: 300000, display_name: 300000 },
    { code: 400000, display_name: 400000 },
    { code: 500000, display_name: 500000 },
    { code: 600000, display_name: 600000 },
    { code: 700000, display_name: 700000 },
    { code: 800000, display_name: 800000 },
    { code: 900000, display_name: 900000 },
    { code: 1000000, display_name: 1000000 },
    { code: 1500000, display_name: 1500000 },
    { code: 2000000, display_name: 2000000 },
    { code: 2500000, display_name: 2500000 },
  ],
};
