import { members } from "./members";
import { deductibles } from "./deductibles";
import { companies } from "./companies";

const config = {
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
  members,
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
  companies,
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
      type: "checkbox",
      options: [
        {
          code: "room_rent_charges",
          display_name: "No Room rent limit",
          description:
            "Room Rent means the amount charged by a Hospital towards Room and Boarding expenses and shall include the associated medical expenses\n                        ",
          operator: "equals",
          value_to_compare: "No sub-limit",
          visible_on_sections: ["health", "top_up"],
        },
        {
          code: "co_payment",
          display_name: "No Copay",
          description:
            "Co-payment means a cost sharing requirement that the Policy holder will bear a specified percentage of the admissible claims amount\n                        ",
          operator: "equals",
          value_to_compare: "No",
          visible_on_sections: ["health", "top_up"],
        },
        {
          code: "single_private_room",
          display_name: "Single Private Room",
          description:
            "Single Private Room means a basic (most economical of all accommodation) category of single room in a Hospital with or without air-conditioning facility where a single patient is accommodated and which has an attached toilet.\n                        ",
          operator: "in_array",
          value_to_compare: [
            "Single Private Room",
            "Single Private Room upgradable",
            "Single Private A/C Room",
            "Single Private A/C Room (Upgradable)",
          ],
          visible_on_sections: ["health", "top_up"],
        },
        {
          code: "no_pre_policy_check_up",
          display_name: "No Pre-policy Check up",
          description:
            "The pre-policy medical checkup refers to the medical examination that is required before issuing the policy.\n                        ",
          visible_on_sections: ["health", "top_up"],
        },
      ],
    },
    {
      group_name: "Pre existing Ailments",
      code: "pre_existing_ailments",
      type: "radio",
      options: [
        {
          code: "pre_existing_disease_cover_1",
          display_name: "Covered after 1 year",
          description:
            "Pre-Existing ailment means any condition, injury or disease that is diagnosed or for which medical advice or treatment was recommended by, or received from, a physician prior to the effective date of the policy or its reinstatement. Medical Expesnes are covered after a waiting period of 1 year.\n                        ",
          operator: "equals",
          value_to_compare: "1 Year",
          visible_on_sections: ["health", "top_up"],
        },
        {
          code: "pre_existing_disease_cover_2",
          display_name: "Covered after 2 years",
          description:
            "Pre-Existing ailment means any condition, injury or disease that is diagnosed or for which medical advice or treatment was recommended by, or received from, a physician prior to the effective date of the policy or its reinstatement. Medical Expesnes are covered after a waiting period of 2 years.\n                        ",
          operator: "equals",
          value_to_compare: "2 Years",
          visible_on_sections: ["health", "top_up"],
        },
        {
          code: "pre_existing_disease_cover_3",
          display_name: "Covered after 3 years",
          description:
            "Pre-Existing ailment means any condition, injury or disease that is diagnosed or for which medical advice or treatment was recommended by, or received from, a physician prior to the effective date of the policy or its reinstatement. Medical Expesnes are covered after a waiting period of 3 years.\n                        ",
          operator: "equals",
          value_to_compare: "3 Years",
          visible_on_sections: ["health", "top_up"],
        },
        {
          code: "pre_existing_disease_cover_4",
          display_name: "Covered after 4 years",
          description:
            "Pre-Existing ailment means any condition, injury or disease that is diagnosed or for which medical advice or treatment was recommended by, or received from, a physician prior to the effective date of the policy or its reinstatement. Medical Expesnes are covered after a waiting period of 4 years.\n                        ",
          operator: "equals",
          value_to_compare: "4 Years",
          visible_on_sections: ["health", "top_up"],
        },
      ],
    },
    {
      group_name: "No Claim Bonus",
      code: "no_claim_bonus",
      type: "radio",
      options: [
        {
          code: "no_claim_bonus_50",
          display_name: "Upto 50%",
          description:
            "Increase or addition in the Sum Insured, maxium up to 50%  without any associated increase in premium in a claim free year.\n                        ",
          operator: "equals",
          value_to_compare: "Increase in Sum Insured maximum up to 50%",
          visible_on_sections: ["health"],
        },
        {
          code: "no_claim_bonus_100",
          display_name: "Upto 100%",
          description:
            "Increase or addition in the Sum Insured, maxium up to 100%  without any associated increase in premium in a claim free year.\n                        ",
          operator: "equals",
          value_to_compare: "Increase in Sum Insured maximum up to 100%",
          visible_on_sections: ["health"],
        },
        {
          code: "no_claim_bonus_150",
          display_name: "Upto 150%",
          description:
            "Increase or addition in the Sum Insured, maxium up to 150%  without any associated increase in premium in a claim free year.\n                        ",
          operator: "equals",
          value_to_compare: "Increase in Sum Insured maximum up to 150%",
          visible_on_sections: ["health"],
        },
        {
          code: "no_claim_bonus_200",
          display_name: "Upto 200%",
          description:
            "Increase or addition in the Sum Insured, maxium up to 200%  without any associated increase in premium in a claim free year.\n                        ",
          operator: "equals",
          value_to_compare: "Increase in Sum Insured maximum up to 200%",
          visible_on_sections: ["health"],
        },
      ],
    },
    {
      group_name: "Others",
      code: "others",
      type: "checkbox",
      options: [
        {
          code: "disease_wise_cover",
          display_name: "No limit on treatments",
          description:
            "No specific amount of claim amount is to be paid by the insured person for specific diseases/treatments/procedures.\n                        ",
          operator: "equals",
          value_to_compare: "No sub-limit",
          visible_on_sections: ["health"],
        },
        {
          code: "worldwide_coverage",
          display_name: "Worldwide Cover",
          description:
            "Worldwide coverage is a benefit that offers coverage all over the world.\n                        ",
          operator: "not_equals",
          value_to_compare: "Not Covered",
          visible_on_sections: ["health"],
        },
        {
          code: "free_health_check_up",
          display_name: "Free-health check up",
          description:
            "If You Renew Your Policy without a break, then at every Policy renewal Insurer will pay the expenses incurred towards cost of health check-up up to the Limits Per Policy (excluding any cumulative bonus) .\n                        ",
          operator: "equals",
          value_to_compare: "Yes",
          visible_on_sections: ["health"],
        },
        {
          code: "maternity_cover",
          display_name: "Maternity cover",
          description:
            "Maternity Cover Means Medical Expenses for a delivery (including complicated deliveries and caesarean sections) incurred during Hospitalization; The lawful medical  termination of pregnancy during the Policy Period;\n                        Pre-natal and post-natal Medical Expenses for delivery or termination.",
          operator: "not_equals",
          value_to_compare: "Not Covered",
          visible_on_sections: ["health", "top_up"],
        },
        {
          code: "no_claim_bonus_2",
          display_name: "No Claim Bonus",
          description:
            "No Claim Bonus means any increase or addition in the Sum Insured granted by the Insurer without any associated increase in premium in a claim free year.",
          operator: "equals",
          value_to_compare: "Not Covered",
          visible_on_sections: ["health", "top_up"],
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
  // settings: {
  //   journey_type: "cross_sell",
  //   mobile: "",
  //   email: "",
  //   license: "",
  //   logo: "",
  //   primary_color: "#0a87ff",
  //   secondary_color: "#2cd44a",
  //   primary_shade: "#ecf6ff",
  //   secondary_shade: "#eef1f4",
  //   addons_visibilty: "1",
  //   riders_visibilty: "1",
  //   footer: "",
  //   multiindividual_visibilty: "1",
  //   top_up_flow: ["Single_Top_Up_Journey"],
  // },
  tenant: {
    id: 3,
    name: "Fyntune",
    alias: "fyntune",
    email: "health@gmail.com",
    term_frontend_domain:
      "termdemo-gbk1bfj4vz7bg2mxwhgvlaws2uebzxb4.fynity.in/",
    topup_frontend_domain:
      "https://topupdemo-gbk1bfj4vz7bg2mxwhgvlaws2uebzxb4.fynity.in",
  },
  deductibles,
};

export default config;
