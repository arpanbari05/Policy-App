export const TEST_QUOTES = {
  data: [
    {
      product: {
        id: 1,
        name: "Care",
        company: {
          id: 1,
          name: "Care Health Insurance",
          alias: "care_health",
          csr: [92.4],
        },
        insurance_type: { id: 1, name: "Health Insurance", alias: "health" },
      },
      sum_insured: "300000",
      deductible: null,
      premium: 4520,
      total_premium: 5334,
      is_arogya_sanjeevani: 0,
      tenure: 1,
      tax_amount: 814,
      features: [
        {
          name: "Cashless Hospitals",
          code: "cashless_hospitals",
          icon: "https://prod-health-admin-bucket.s3.ap-south-1.amazonaws.com/Feature_icons/cashless%20hospitals.png",
          is_featured_on_card: 0,
          value: "7800+",
          short_description: "Number of Hospitals we are connected with.",
          description:
            "Cashless Hospitals means hospitals or health care providers enlisted by an Insurer to provide medical services to an Insured by a cashless facility",
        },
        {
          name: "Unique Feature",
          code: "unique_feature",
          icon: "",
          is_featured_on_card: 0,
          value:
            "\u2022 Free health Check up\n\u2022 AYUSH benefit\n\u2022 Automatic recharge of sum Insured\n\u2022 Daily Cash Allowance ",
          short_description: "Following are the key benefits of this policy.",
          description:
            "Your health cover will have the above unqiue selling propositions",
        },
        {
          name: "Room Rent",
          code: "room_rent_charges",
          icon: "https://prod-health-admin-bucket.s3.ap-south-1.amazonaws.com/Feature_icons/room%20rent.png",
          is_featured_on_card: 1,
          value: "1% of Sum Insured",
          short_description:
            "Expenses incurred for room & boarding of a Hospital room are covered up to 1% of Sum Insured per day.",
          description:
            "Room Rent means the amount charged by a Hospital towards Room and Boarding expenses and shall include the associated medical expenses",
        },
        {
          name: "Pre Hospitalisation",
          code: "pre_hospitalisation",
          icon: "https://prod-health-admin-bucket.s3.ap-south-1.amazonaws.com/Feature_icons/pre.png",
          is_featured_on_card: 0,
          value: "30 Days",
          short_description:
            "Medical expenses incurred for covered Hospitalisation expenses, related and prior to 30 Days of Hospitalization.",
          description:
            "Pre-hospitalization Medical Expenses means Medical Expenses incurred during pre-defined number of days before the Hospitalization of the Insured Person",
        },
        {
          name: "Post Hospitalisation",
          code: "post_hospitalisation",
          icon: "https://prod-health-admin-bucket.s3.ap-south-1.amazonaws.com/Feature_icons/post.png",
          is_featured_on_card: 0,
          value: "60 Days",
          short_description:
            "Medical expenses incurred for covered Hospitalisation expenses, related and post 60 Days of Hospitalization.",
          description:
            "Post-hospitalization Medical Expenses means Medical Expenses incurred during pre-defined number of days immediately after the Insured Person is discharged from the hospital",
        },
        {
          name: "Road Ambulance",
          code: "road_ambulance",
          icon: "https://prod-health-admin-bucket.s3.ap-south-1.amazonaws.com/Feature_icons/ambulance.png",
          is_featured_on_card: 0,
          value: "Covered",
          short_description:
            "Covered up to a sum of \u20b9 1,500 per hospitalisation.",
          description:
            "Expenses incurred for utilizing ambulance service for transporting Insured person to hospital.",
        },
        {
          name: "Hospitalization Cover",
          code: "hospitalization_cover",
          icon: "https://prod-health-admin-bucket.s3.ap-south-1.amazonaws.com/Feature_icons/hospitali.png",
          is_featured_on_card: 0,
          value: "Covered",
          short_description:
            "Covers medical expenses for more than 24 hours of hospitalisation.",
          description:
            "Hospitalization Cover means treatment for which the Insured Person has to stay in a hospital for more than 24 hours for a covered event",
        },
        {
          name: "Organ Donor Cover",
          code: "organ_donor_cover",
          icon: "https://prod-health-admin-bucket.s3.ap-south-1.amazonaws.com/Feature_icons/organ.png",
          is_featured_on_card: 0,
          value: "Covered",
          short_description: "Expenses up to \u20b9 50,000  is covered.",
          description:
            "Organ Donor Cover means Medical Expenses towards  organ donor\u2019s Hospitalization for harvesting of the donated organ  where an Insured Person is the recipient",
        },
        {
          name: "Day Care Treatments",
          code: "day_care_treatments",
          icon: "https://prod-health-admin-bucket.s3.ap-south-1.amazonaws.com/Feature_icons/day_care.png",
          is_featured_on_card: 0,
          value: "Covered",
          short_description:
            "This policy covers more than 540+ Day Care procedures.",
          description:
            "Day care treatment means treatment and / or procedures that require hospitalisation for less than 24-hours due to technological advancements.",
        },
        {
          name: "Ayush Treatment",
          code: "ayush_treatment",
          icon: "https://prod-health-admin-bucket.s3.ap-south-1.amazonaws.com/Feature_icons/aayush.png",
          is_featured_on_card: 0,
          value: "Covered",
          short_description: " Covered upto \u20b9 15,000.",
          description:
            "Ayush Treatment refers to the medical and / or hospitalization treatments given under \u2018Ayurveda, Yoga and Naturopathy, Unani,  Siddha and Homeopathy systems",
        },
        {
          name: "No Claim Bonus",
          code: "no_claim_bonus",
          icon: "https://prod-health-admin-bucket.s3.ap-south-1.amazonaws.com/Feature_icons/Renewal.png",
          is_featured_on_card: 1,
          value: "Up to 150%",
          short_description:
            "Increase in Sum Inured by 50% for every claim free year for a maximum of 100% without increase in premium. The increased Sum Insured shall be decreased by 50% in event of claim but Sum Insured shall not be reduced.In addition to this, you also get a 10% increase in the sum insured, up to maximum of 50%, as per the regular No Claims Bonus feature.",
          description:
            "No Claim Bonus means any increase or addition in the Sum Insured granted by the Insurer without any associated increase in premium in a claim free year",
        },
        {
          name: "Pre Existing Disease",
          code: "pre_existing_disease_cover",
          icon: "https://prod-health-admin-bucket.s3.ap-south-1.amazonaws.com/Feature_icons/waiting%20period.png",
          is_featured_on_card: 1,
          value: "4 Years",
          short_description:
            "Waiting period of 4 years is required for this plan.",
          description:
            "Pre-Existing disease means any condition, ailment, injury or disease that is diagnosed or for which medical advice or treatment was recommended by, or received from, a physician prior to the effective date of the policy or its reinstatemen ",
        },
        {
          name: "Hospital Daily Cash",
          code: "hospital_daily_cash",
          icon: "",
          is_featured_on_card: 0,
          value: "Covered",
          short_description:
            "Covered up to \u20b9 500 per day, maximum up to 5 consecutive days. ",
          description:
            "A lump sum amount is provided daily in case of hospitalization and this amount can be used per the insured's need such as additional expenses that are not covered by health insurance.",
        },
        {
          name: "Air Ambulance Cover",
          code: "air_ambulance_cover",
          icon: "",
          is_featured_on_card: 0,
          value: "Not Covered",
          short_description: "This benefit is not covered in this plan.",
          description:
            "Expenses incurred for evacuation in an Emergency condition through an Ambulance, which includes Air Ambulance or any other transportation and evacuation services to the nearest Hospital",
        },
        {
          name: "Outpatient Expenses",
          code: "outpatient_expenses",
          icon: "",
          is_featured_on_card: 0,
          value: "Not Covered",
          short_description:
            "Expenses incurred for out-patient treatments are not covered in this plan.",
          description:
            "Out patient treatment means the one in which the Insured visits a clinic / hospital or associated facility like a consultation room for diagnosis and treatment based on the advice of a Medical Practitioner",
        },
        {
          name: "Maternity Cover",
          code: "maternity_cover",
          icon: "",
          is_featured_on_card: 0,
          value: "Not Covered",
          short_description: "This benefit is not covered in this plan.",
          description:
            "Maternity Cover Means Medical Expenses for a delivery (including complicated deliveries and caesarean sections) incurred during Hospitalization; The lawful medical  termination of pregnancy during the Policy Period; Pre-natal and post-natal Medical Expenses for delivery or termination",
        },
        {
          name: "New Born Baby Cover",
          code: "new_born_baby_cover",
          icon: "",
          is_featured_on_card: 0,
          value: "Not Covered",
          short_description: "This benefit is not covered in this plan.",
          description:
            "Newborn baby means baby born during the Policy Period and is aged between 1 day and 90 days, both days inclusive. ",
        },
        {
          name: "Bariatric Surgery",
          code: "bariatric_surgery",
          icon: "",
          is_featured_on_card: 0,
          value: "Not Covered",
          short_description: "This benefit is not covered in this plan.",
          description:
            "Bariatric Surgery Means Surgery on the stomach and/or intestines to help a person with extreme obesity to lose weight",
        },
        {
          name: "Free Health Check Up",
          code: "free_health_check_up",
          icon: "",
          is_featured_on_card: 0,
          value: "Yes",
          short_description:
            "Annual health check-up for insured members in our empanelled hospitals/diagnostic centre,regardless of claims history.",
          description:
            "If You Renew Your Policy with Insurance company without a break, then at every Policy  Renewal Insurance company will pay the expenses incurred towards cost of health check-up  up to the Limits Per Policy (excluding any cumulative bonus) mentioned in Your Policy Schedule",
        },
        {
          name: "Worldwide Coverage",
          code: "worldwide_coverage",
          icon: "https://prod-health-admin-bucket.s3.ap-south-1.amazonaws.com/Feature_icons/Worldwide%20cover.png",
          is_featured_on_card: 0,
          value: "Covered",
          short_description:
            "Medical Expenses of the Insured Person incurred outside India(exclusing USA), covered upto Sum Insured for 12 Critical Illness; Deductible of \u20b9 5000/- per claim.",
          description:
            "Worldwide coverage is a benefit that offers coverage all over the world.",
        },
        {
          name: "Disease Wise Cover",
          code: "disease_wise_cover",
          icon: "",
          is_featured_on_card: 0,
          value: "No Sub-Limit",
          short_description:
            "No specific sub-limit of Sum Insured is applicable for this plan. ",
          description:
            "Disease wise is a cost sharing requirement that provides that the Policyholder shall bear a specified percentage of the admissible claims amount for mentioned specific disease.",
        },
        {
          name: "2 Year Waiting Period",
          code: "2_year_waiting_period",
          icon: "",
          is_featured_on_card: 0,
          value: "Applicable",
          short_description:
            "The following specific diseases require a waiting period of 2 years to for a claim to be made. Cataract Benign Prostatic Hypertrophy Dilation and curettage Hernia, hydrocele, fistula in anus, sinusitis Skin and all internal tumors / cysts Dialysis required for chronic renal failure Gastric and Duodenal ulcers (Please refer policy wording for full list)",
          description:
            "No claim shall be accepted before 2 years for mentioned specific dieases.",
        },
        {
          name: "4 Year Waiting Period",
          code: "4_year_waiting_period",
          icon: "",
          is_featured_on_card: 0,
          value: "Applicable",
          short_description:
            "All Pre-Existing diseases require a waiting period of 4 years to for a claim to be made.",
          description:
            "No claim shall be accepted before 4 years for mentioned specific dieases.",
        },
        {
          name: "Permanent Exclusions",
          code: "permanent_exclusions",
          icon: "https://prod-health-admin-bucket.s3.ap-south-1.amazonaws.com/Feature_icons/Group%207492.png",
          is_featured_on_card: 0,
          value:
            "Any pre existing injury that was diagnosed within 48 months prior to issuance of first policy\nAny diseases contracted during first 30 days of policy start\nExpenses attributable to self injury\nExpenses attributable to self injury to alcohol/drug use/misuse/abuse\nCost of spectacles\nExternal congenital diseases",
          short_description:
            "The given diseases are excluded from the Sum Insured covered in this policy.",
          description:
            "Insurer shall not be liable to make any payment for any claim directly or indirectly caused by, based on, arising out of or attributable to any of the mentioned conditions.",
        },
        {
          name: "Pre Policy Medical Screening",
          code: "pre_policy_medical_screening",
          icon: "",
          is_featured_on_card: 0,
          value: "Required",
          short_description:
            "A medical checkup is required for a specific age of 61 years and above before one takes the policy.",
          description:
            "The pre-policy medical checkup refers to the medical examination that is required before issuing the policy. This checkup is mandatory for applicants above a certain age and is done to determine the applicant's current medical fitness",
        },
        {
          name: "Co-Payment",
          code: "co_payment",
          icon: "https://prod-health-admin-bucket.s3.ap-south-1.amazonaws.com/Feature_icons/copay.png",
          is_featured_on_card: 1,
          value: "Age based",
          short_description:
            "A specific percent of 20 % of claim amount is paid by the Insured person if the age is 61 years and above.",
          description:
            "Co-payment means a cost sharing requirement that the Policy holder will bear a specified percentage of the admissible claims amount. A specific percent of 20 % of claim amount is paid by the Insured person if the age is 61 years and above.",
        },
      ],
      company_alias: "care_health",
      available_tenures: [1, 2, 3],
      mandatory_riders: [
        {
          id: 48,
          name: "No Claim Bonus",
          alias: "CAREWITHNCB",
          description:
            "Maximum up to 150% increase in the Sum Insured is granted by the Insurer without any associated increase in premium for every claim free year.",
          sum_insured: 300000,
          premium: 1067,
          total_premium: 1067,
          tax_amount: 163,
          available_only_with: null,
          affects_other_riders: null,
        },
      ],
    },
    {
      product: {
        id: 1,
        name: "Care",
        company: {
          id: 1,
          name: "Care Health Insurance",
          alias: "care_health",
          csr: [92.4],
        },
        insurance_type: { id: 1, name: "Health Insurance", alias: "health" },
      },
      sum_insured: "400000",
      deductible: null,
      premium: 5062,
      total_premium: 5973,
      is_arogya_sanjeevani: 0,
      tenure: 1,
      tax_amount: 911,
      features: [
        {
          name: "Cashless Hospitals",
          code: "cashless_hospitals",
          icon: "https://prod-health-admin-bucket.s3.ap-south-1.amazonaws.com/Feature_icons/cashless%20hospitals.png",
          is_featured_on_card: 0,
          value: "7800+",
          short_description: "Number of Hospitals we are connected with.",
          description:
            "Cashless Hospitals means hospitals or health care providers enlisted by an Insurer to provide medical services to an Insured by a cashless facility",
        },
        {
          name: "Unique Feature",
          code: "unique_feature",
          icon: "",
          is_featured_on_card: 0,
          value:
            "\u2022 Free health Check up\n\u2022 AYUSH benefit\n\u2022 Automatic recharge of sum Insured\n\u2022 Daily Cash Allowance ",
          short_description: "Following are the key benefits of this policy.",
          description:
            "Your health cover will have the above unqiue selling propositions",
        },
        {
          name: "Room Rent",
          code: "room_rent_charges",
          icon: "https://prod-health-admin-bucket.s3.ap-south-1.amazonaws.com/Feature_icons/room%20rent.png",
          is_featured_on_card: 1,
          value: "1% of Sum Insured",
          short_description:
            "Expenses incurred for room & boarding of a Hospital room are covered up to 1% of Sum Insured per day.",
          description:
            "Room Rent means the amount charged by a Hospital towards Room and Boarding expenses and shall include the associated medical expenses",
        },
        {
          name: "Pre Hospitalisation",
          code: "pre_hospitalisation",
          icon: "https://prod-health-admin-bucket.s3.ap-south-1.amazonaws.com/Feature_icons/pre.png",
          is_featured_on_card: 0,
          value: "30 Days",
          short_description:
            "Medical expenses incurred for covered Hospitalisation expenses, related and prior to 30 Days of Hospitalization.",
          description:
            "Pre-hospitalization Medical Expenses means Medical Expenses incurred during pre-defined number of days before the Hospitalization of the Insured Person",
        },
        {
          name: "Post Hospitalisation",
          code: "post_hospitalisation",
          icon: "https://prod-health-admin-bucket.s3.ap-south-1.amazonaws.com/Feature_icons/post.png",
          is_featured_on_card: 0,
          value: "60 Days",
          short_description:
            "Medical expenses incurred for covered Hospitalisation expenses, related and post 60 Days of Hospitalization.",
          description:
            "Post-hospitalization Medical Expenses means Medical Expenses incurred during pre-defined number of days immediately after the Insured Person is discharged from the hospital",
        },
        {
          name: "Road Ambulance",
          code: "road_ambulance",
          icon: "https://prod-health-admin-bucket.s3.ap-south-1.amazonaws.com/Feature_icons/ambulance.png",
          is_featured_on_card: 0,
          value: "Covered",
          short_description:
            "Covered up to a sum of \u20b9 1,500 per hospitalisation.",
          description:
            "Expenses incurred for utilizing ambulance service for transporting Insured person to hospital.",
        },
        {
          name: "Hospitalization Cover",
          code: "hospitalization_cover",
          icon: "https://prod-health-admin-bucket.s3.ap-south-1.amazonaws.com/Feature_icons/hospitali.png",
          is_featured_on_card: 0,
          value: "Covered",
          short_description:
            "Covers medical expenses for more than 24 hours of hospitalisation.",
          description:
            "Hospitalization Cover means treatment for which the Insured Person has to stay in a hospital for more than 24 hours for a covered event",
        },
        {
          name: "Organ Donor Cover",
          code: "organ_donor_cover",
          icon: "https://prod-health-admin-bucket.s3.ap-south-1.amazonaws.com/Feature_icons/organ.png",
          is_featured_on_card: 0,
          value: "Covered",
          short_description: "Expenses up to \u20b9 50,000  is covered.",
          description:
            "Organ Donor Cover means Medical Expenses towards  organ donor\u2019s Hospitalization for harvesting of the donated organ  where an Insured Person is the recipient",
        },
        {
          name: "Day Care Treatments",
          code: "day_care_treatments",
          icon: "https://prod-health-admin-bucket.s3.ap-south-1.amazonaws.com/Feature_icons/day_care.png",
          is_featured_on_card: 0,
          value: "Covered",
          short_description:
            "This policy covers more than 540+ Day Care procedures.",
          description:
            "Day care treatment means treatment and / or procedures that require hospitalisation for less than 24-hours due to technological advancements.",
        },
        {
          name: "Ayush Treatment",
          code: "ayush_treatment",
          icon: "https://prod-health-admin-bucket.s3.ap-south-1.amazonaws.com/Feature_icons/aayush.png",
          is_featured_on_card: 0,
          value: "Covered",
          short_description: " Covered upto \u20b9 15,000.",
          description:
            "Ayush Treatment refers to the medical and / or hospitalization treatments given under \u2018Ayurveda, Yoga and Naturopathy, Unani,  Siddha and Homeopathy systems",
        },
        {
          name: "No Claim Bonus",
          code: "no_claim_bonus",
          icon: "https://prod-health-admin-bucket.s3.ap-south-1.amazonaws.com/Feature_icons/Renewal.png",
          is_featured_on_card: 1,
          value: "Up to 150%",
          short_description:
            "Increase in Sum Inured by 50% for every claim free year for a maximum of 100% without increase in premium. The increased Sum Insured shall be decreased by 50% in event of claim but Sum Insured shall not be reduced.In addition to this, you also get a 10% increase in the sum insured, up to maximum of 50%, as per the regular No Claims Bonus feature.",
          description:
            "No Claim Bonus means any increase or addition in the Sum Insured granted by the Insurer without any associated increase in premium in a claim free year",
        },
        {
          name: "Pre Existing Disease",
          code: "pre_existing_disease_cover",
          icon: "https://prod-health-admin-bucket.s3.ap-south-1.amazonaws.com/Feature_icons/waiting%20period.png",
          is_featured_on_card: 1,
          value: "4 Years",
          short_description:
            "Waiting period of 4 years is required for this plan.",
          description:
            "Pre-Existing disease means any condition, ailment, injury or disease that is diagnosed or for which medical advice or treatment was recommended by, or received from, a physician prior to the effective date of the policy or its reinstatemen ",
        },
        {
          name: "Hospital Daily Cash",
          code: "hospital_daily_cash",
          icon: "",
          is_featured_on_card: 0,
          value: "Covered",
          short_description:
            "Covered up to \u20b9 500 per day, maximum up to 5 consecutive days. ",
          description:
            "A lump sum amount is provided daily in case of hospitalization and this amount can be used per the insured's need such as additional expenses that are not covered by health insurance.",
        },
        {
          name: "Air Ambulance Cover",
          code: "air_ambulance_cover",
          icon: "",
          is_featured_on_card: 0,
          value: "Not Covered",
          short_description: "This benefit is not covered in this plan.",
          description:
            "Expenses incurred for evacuation in an Emergency condition through an Ambulance, which includes Air Ambulance or any other transportation and evacuation services to the nearest Hospital",
        },
        {
          name: "Outpatient Expenses",
          code: "outpatient_expenses",
          icon: "",
          is_featured_on_card: 0,
          value: "Not Covered",
          short_description:
            "Expenses incurred for out-patient treatments are not covered in this plan.",
          description:
            "Out patient treatment means the one in which the Insured visits a clinic / hospital or associated facility like a consultation room for diagnosis and treatment based on the advice of a Medical Practitioner",
        },
        {
          name: "Maternity Cover",
          code: "maternity_cover",
          icon: "",
          is_featured_on_card: 0,
          value: "Not Covered",
          short_description: "This benefit is not covered in this plan.",
          description:
            "Maternity Cover Means Medical Expenses for a delivery (including complicated deliveries and caesarean sections) incurred during Hospitalization; The lawful medical  termination of pregnancy during the Policy Period; Pre-natal and post-natal Medical Expenses for delivery or termination",
        },
        {
          name: "New Born Baby Cover",
          code: "new_born_baby_cover",
          icon: "",
          is_featured_on_card: 0,
          value: "Not Covered",
          short_description: "This benefit is not covered in this plan.",
          description:
            "Newborn baby means baby born during the Policy Period and is aged between 1 day and 90 days, both days inclusive. ",
        },
        {
          name: "Bariatric Surgery",
          code: "bariatric_surgery",
          icon: "",
          is_featured_on_card: 0,
          value: "Not Covered",
          short_description: "This benefit is not covered in this plan.",
          description:
            "Bariatric Surgery Means Surgery on the stomach and/or intestines to help a person with extreme obesity to lose weight",
        },
        {
          name: "Free Health Check Up",
          code: "free_health_check_up",
          icon: "",
          is_featured_on_card: 0,
          value: "Yes",
          short_description:
            "Annual health check-up for insured members in our empanelled hospitals/diagnostic centre,regardless of claims history.",
          description:
            "If You Renew Your Policy with Insurance company without a break, then at every Policy  Renewal Insurance company will pay the expenses incurred towards cost of health check-up  up to the Limits Per Policy (excluding any cumulative bonus) mentioned in Your Policy Schedule",
        },
        {
          name: "Worldwide Coverage",
          code: "worldwide_coverage",
          icon: "https://prod-health-admin-bucket.s3.ap-south-1.amazonaws.com/Feature_icons/Worldwide%20cover.png",
          is_featured_on_card: 0,
          value: "Covered",
          short_description:
            "Medical Expenses of the Insured Person incurred outside India(exclusing USA), covered upto Sum Insured for 12 Critical Illness; Deductible of \u20b9 5000/- per claim.",
          description:
            "Worldwide coverage is a benefit that offers coverage all over the world.",
        },
        {
          name: "Disease Wise Cover",
          code: "disease_wise_cover",
          icon: "",
          is_featured_on_card: 0,
          value: "No Sub-Limit",
          short_description:
            "No specific sub-limit of Sum Insured is applicable for this plan. ",
          description:
            "Disease wise is a cost sharing requirement that provides that the Policyholder shall bear a specified percentage of the admissible claims amount for mentioned specific disease.",
        },
        {
          name: "2 Year Waiting Period",
          code: "2_year_waiting_period",
          icon: "",
          is_featured_on_card: 0,
          value: "Applicable",
          short_description:
            "The following specific diseases require a waiting period of 2 years to for a claim to be made. Cataract Benign Prostatic Hypertrophy Dilation and curettage Hernia, hydrocele, fistula in anus, sinusitis Skin and all internal tumors / cysts Dialysis required for chronic renal failure Gastric and Duodenal ulcers (Please refer policy wording for full list)",
          description:
            "No claim shall be accepted before 2 years for mentioned specific dieases.",
        },
        {
          name: "4 Year Waiting Period",
          code: "4_year_waiting_period",
          icon: "",
          is_featured_on_card: 0,
          value: "Applicable",
          short_description:
            "All Pre-Existing diseases require a waiting period of 4 years to for a claim to be made.",
          description:
            "No claim shall be accepted before 4 years for mentioned specific dieases.",
        },
        {
          name: "Permanent Exclusions",
          code: "permanent_exclusions",
          icon: "https://prod-health-admin-bucket.s3.ap-south-1.amazonaws.com/Feature_icons/Group%207492.png",
          is_featured_on_card: 0,
          value:
            "Any pre existing injury that was diagnosed within 48 months prior to issuance of first policy\nAny diseases contracted during first 30 days of policy start\nExpenses attributable to self injury\nExpenses attributable to self injury to alcohol/drug use/misuse/abuse\nCost of spectacles\nExternal congenital diseases",
          short_description:
            "The given diseases are excluded from the Sum Insured covered in this policy.",
          description:
            "Insurer shall not be liable to make any payment for any claim directly or indirectly caused by, based on, arising out of or attributable to any of the mentioned conditions.",
        },
        {
          name: "Pre Policy Medical Screening",
          code: "pre_policy_medical_screening",
          icon: "",
          is_featured_on_card: 0,
          value: "Required",
          short_description:
            "A medical checkup is required for a specific age of 61 years and above before one takes the policy.",
          description:
            "The pre-policy medical checkup refers to the medical examination that is required before issuing the policy. This checkup is mandatory for applicants above a certain age and is done to determine the applicant's current medical fitness",
        },
        {
          name: "Co-Payment",
          code: "co_payment",
          icon: "https://prod-health-admin-bucket.s3.ap-south-1.amazonaws.com/Feature_icons/copay.png",
          is_featured_on_card: 1,
          value: "Age based",
          short_description:
            "A specific percent of 20 % of claim amount is paid by the Insured person if the age is 61 years and above.",
          description:
            "Co-payment means a cost sharing requirement that the Policy holder will bear a specified percentage of the admissible claims amount. A specific percent of 20 % of claim amount is paid by the Insured person if the age is 61 years and above.",
        },
      ],
      company_alias: "care_health",
      available_tenures: [1, 2, 3],
      mandatory_riders: [
        {
          id: 48,
          name: "No Claim Bonus",
          alias: "CAREWITHNCB",
          description:
            "Maximum up to 150% increase in the Sum Insured is granted by the Insurer without any associated increase in premium for every claim free year.",
          sum_insured: 400000,
          premium: 1195,
          total_premium: 1195,
          tax_amount: 183,
          available_only_with: null,
          affects_other_riders: null,
        },
      ],
    },
    {
      product: {
        id: 1,
        name: "Care",
        company: {
          id: 1,
          name: "Care Health Insurance",
          alias: "care_health",
          csr: [92.4],
        },
        insurance_type: { id: 1, name: "Health Insurance", alias: "health" },
      },
      sum_insured: "500000",
      deductible: null,
      premium: 6214,
      total_premium: 7333,
      is_arogya_sanjeevani: 0,
      tenure: 1,
      tax_amount: 1119,
      features: [
        {
          name: "Cashless Hospitals",
          code: "cashless_hospitals",
          icon: "https://prod-health-admin-bucket.s3.ap-south-1.amazonaws.com/Feature_icons/cashless%20hospitals.png",
          is_featured_on_card: 0,
          value: "7800+",
          short_description: "Number of Hospitals we are connected with.",
          description:
            "Cashless Hospitals means hospitals or health care providers enlisted by an Insurer to provide medical services to an Insured by a cashless facility",
        },
        {
          name: "Unique Feature",
          code: "unique_feature",
          icon: "",
          is_featured_on_card: 0,
          value:
            "\u2022 Free health Check up\n\u2022 AYUSH benefit\n\u2022 Automatic recharge of sum Insured\n\u2022 Daily Cash Allowance ",
          short_description: "Following are the key benefits of this policy.",
          description:
            "Your health cover will have the above unqiue selling propositions",
        },
        {
          name: "Room Rent",
          code: "room_rent_charges",
          icon: "https://prod-health-admin-bucket.s3.ap-south-1.amazonaws.com/Feature_icons/room%20rent.png",
          is_featured_on_card: 1,
          value: "Single Private Room",
          short_description:
            "Expenses incurred for room & boarding of a Hospital room are covered up to Single Private Room.",
          description:
            "Room Rent means the amount charged by a Hospital towards Room and Boarding expenses and shall include the associated medical expenses",
        },
        {
          name: "Pre Hospitalisation",
          code: "pre_hospitalisation",
          icon: "https://prod-health-admin-bucket.s3.ap-south-1.amazonaws.com/Feature_icons/pre.png",
          is_featured_on_card: 0,
          value: "30 Days",
          short_description:
            "Medical expenses incurred for covered Hospitalisation expenses, related and prior to 30 Days of Hospitalization.",
          description:
            "Pre-hospitalization Medical Expenses means Medical Expenses incurred during pre-defined number of days before the Hospitalization of the Insured Person",
        },
        {
          name: "Post Hospitalisation",
          code: "post_hospitalisation",
          icon: "https://prod-health-admin-bucket.s3.ap-south-1.amazonaws.com/Feature_icons/post.png",
          is_featured_on_card: 0,
          value: "60 Days",
          short_description:
            "Medical expenses incurred for covered Hospitalisation expenses, related and post 60 Days of Hospitalization.",
          description:
            "Post-hospitalization Medical Expenses means Medical Expenses incurred during pre-defined number of days immediately after the Insured Person is discharged from the hospital",
        },
        {
          name: "Road Ambulance",
          code: "road_ambulance",
          icon: "https://prod-health-admin-bucket.s3.ap-south-1.amazonaws.com/Feature_icons/ambulance.png",
          is_featured_on_card: 0,
          value: "Covered",
          short_description:
            "Covered up to a sum of \u20b9 2,000 per hospitalisation.",
          description:
            "Expenses incurred for utilizing ambulance service for transporting Insured person to hospital.",
        },
        {
          name: "Hospitalization Cover",
          code: "hospitalization_cover",
          icon: "https://prod-health-admin-bucket.s3.ap-south-1.amazonaws.com/Feature_icons/hospitali.png",
          is_featured_on_card: 0,
          value: "Covered",
          short_description:
            "Covers medical expenses for more than 24 hours of hospitalisation.",
          description:
            "Hospitalization Cover means treatment for which the Insured Person has to stay in a hospital for more than 24 hours for a covered event",
        },
        {
          name: "Organ Donor Cover",
          code: "organ_donor_cover",
          icon: "https://prod-health-admin-bucket.s3.ap-south-1.amazonaws.com/Feature_icons/organ.png",
          is_featured_on_card: 0,
          value: "Covered",
          short_description: "Expenses up to \u20b9 1,00,000  is covered.",
          description:
            "Organ Donor Cover means Medical Expenses towards  organ donor\u2019s Hospitalization for harvesting of the donated organ  where an Insured Person is the recipient",
        },
        {
          name: "Day Care Treatments",
          code: "day_care_treatments",
          icon: "https://prod-health-admin-bucket.s3.ap-south-1.amazonaws.com/Feature_icons/day_care.png",
          is_featured_on_card: 0,
          value: "Covered",
          short_description:
            "This policy covers more than 540+ Day Care procedures.",
          description:
            "Day care treatment means treatment and / or procedures that require hospitalisation for less than 24-hours due to technological advancements.",
        },
        {
          name: "Ayush Treatment",
          code: "ayush_treatment",
          icon: "https://prod-health-admin-bucket.s3.ap-south-1.amazonaws.com/Feature_icons/aayush.png",
          is_featured_on_card: 0,
          value: "Covered",
          short_description: " Covered upto \u20b9 20,000.",
          description:
            "Ayush Treatment refers to the medical and / or hospitalization treatments given under \u2018Ayurveda, Yoga and Naturopathy, Unani,  Siddha and Homeopathy systems",
        },
        {
          name: "No Claim Bonus",
          code: "no_claim_bonus",
          icon: "https://prod-health-admin-bucket.s3.ap-south-1.amazonaws.com/Feature_icons/Renewal.png",
          is_featured_on_card: 1,
          value: "Up to 150%",
          short_description:
            "Increase in Sum Inured by 50% for every claim free year for a maximum of 100% without increase in premium. The increased Sum Insured shall be decreased by 50% in event of claim but Sum Insured shall not be reduced.In addition to this, you also get a 10% increase in the sum insured, up to maximum of 50%, as per the regular No Claims Bonus feature.",
          description:
            "No Claim Bonus means any increase or addition in the Sum Insured granted by the Insurer without any associated increase in premium in a claim free year",
        },
        {
          name: "Pre Existing Disease",
          code: "pre_existing_disease_cover",
          icon: "https://prod-health-admin-bucket.s3.ap-south-1.amazonaws.com/Feature_icons/waiting%20period.png",
          is_featured_on_card: 1,
          value: "4 Years",
          short_description:
            "Waiting period of 4 years is required for this plan.",
          description:
            "Pre-Existing disease means any condition, ailment, injury or disease that is diagnosed or for which medical advice or treatment was recommended by, or received from, a physician prior to the effective date of the policy or its reinstatemen ",
        },
        {
          name: "Hospital Daily Cash",
          code: "hospital_daily_cash",
          icon: "",
          is_featured_on_card: 0,
          value: "Not Covered",
          short_description: "This benefit is not covered in this plan.",
          description:
            "A lump sum amount is provided daily in case of hospitalization and this amount can be used per the insured's need such as additional expenses that are not covered by health insurance.",
        },
        {
          name: "Air Ambulance Cover",
          code: "air_ambulance_cover",
          icon: "",
          is_featured_on_card: 0,
          value: "Not Covered",
          short_description: "This benefit is not covered in this plan.",
          description:
            "Expenses incurred for evacuation in an Emergency condition through an Ambulance, which includes Air Ambulance or any other transportation and evacuation services to the nearest Hospital",
        },
        {
          name: "Outpatient Expenses",
          code: "outpatient_expenses",
          icon: "",
          is_featured_on_card: 0,
          value: "Not Covered",
          short_description:
            "Expenses incurred for out-patient treatments are not covered in this plan.",
          description:
            "Out patient treatment means the one in which the Insured visits a clinic / hospital or associated facility like a consultation room for diagnosis and treatment based on the advice of a Medical Practitioner",
        },
        {
          name: "Maternity Cover",
          code: "maternity_cover",
          icon: "",
          is_featured_on_card: 0,
          value: "Not Covered",
          short_description: "This benefit is not covered in this plan.",
          description:
            "Maternity Cover Means Medical Expenses for a delivery (including complicated deliveries and caesarean sections) incurred during Hospitalization; The lawful medical  termination of pregnancy during the Policy Period; Pre-natal and post-natal Medical Expenses for delivery or termination",
        },
        {
          name: "New Born Baby Cover",
          code: "new_born_baby_cover",
          icon: "",
          is_featured_on_card: 0,
          value: "Not Covered",
          short_description: "This benefit is not covered in this plan.",
          description:
            "Newborn baby means baby born during the Policy Period and is aged between 1 day and 90 days, both days inclusive. ",
        },
        {
          name: "Bariatric Surgery",
          code: "bariatric_surgery",
          icon: "",
          is_featured_on_card: 0,
          value: "Not Covered",
          short_description: "This benefit is not covered in this plan.",
          description:
            "Bariatric Surgery Means Surgery on the stomach and/or intestines to help a person with extreme obesity to lose weight",
        },
        {
          name: "Free Health Check Up",
          code: "free_health_check_up",
          icon: "",
          is_featured_on_card: 0,
          value: "Yes",
          short_description:
            "Annual health check-up for insured members in our empanelled hospitals/diagnostic centre,regardless of claims history.",
          description:
            "If You Renew Your Policy with Insurance company without a break, then at every Policy  Renewal Insurance company will pay the expenses incurred towards cost of health check-up  up to the Limits Per Policy (excluding any cumulative bonus) mentioned in Your Policy Schedule",
        },
        {
          name: "Worldwide Coverage",
          code: "worldwide_coverage",
          icon: "https://prod-health-admin-bucket.s3.ap-south-1.amazonaws.com/Feature_icons/Worldwide%20cover.png",
          is_featured_on_card: 0,
          value: "Covered",
          short_description:
            "Medical Expenses of the Insured Person incurred outside India(exclusing USA), covered upto Sum Insured for 12 Critical Illness; Deductible of \u20b9 5000/- per claim.",
          description:
            "Worldwide coverage is a benefit that offers coverage all over the world.",
        },
        {
          name: "Disease Wise Cover",
          code: "disease_wise_cover",
          icon: "",
          is_featured_on_card: 0,
          value: "No Sub-Limit",
          short_description:
            "No specific sub-limit of Sum Insured is applicable for this plan. ",
          description:
            "Disease wise is a cost sharing requirement that provides that the Policyholder shall bear a specified percentage of the admissible claims amount for mentioned specific disease.",
        },
        {
          name: "2 Year Waiting Period",
          code: "2_year_waiting_period",
          icon: "",
          is_featured_on_card: 0,
          value: "Applicable",
          short_description:
            "The following specific diseases require a waiting period of 2 years to for a claim to be made. Cataract Benign Prostatic Hypertrophy Dilation and curettage Hernia, hydrocele, fistula in anus, sinusitis Skin and all internal tumors / cysts Dialysis required for chronic renal failure Gastric and Duodenal ulcers (Please refer policy wording for full list)",
          description:
            "No claim shall be accepted before 2 years for mentioned specific dieases.",
        },
        {
          name: "4 Year Waiting Period",
          code: "4_year_waiting_period",
          icon: "",
          is_featured_on_card: 0,
          value: "Applicable",
          short_description:
            "All Pre-Existing diseases require a waiting period of 4 years to for a claim to be made.",
          description:
            "No claim shall be accepted before 4 years for mentioned specific dieases.",
        },
        {
          name: "Permanent Exclusions",
          code: "permanent_exclusions",
          icon: "https://prod-health-admin-bucket.s3.ap-south-1.amazonaws.com/Feature_icons/Group%207492.png",
          is_featured_on_card: 0,
          value:
            "Any pre existing injury that was diagnosed within 48 months prior to issuance of first policy\nAny diseases contracted during first 30 days of policy start\nExpenses attributable to self injury\nExpenses attributable to self injury to alcohol/drug use/misuse/abuse\nCost of spectacles\nExternal congenital diseases",
          short_description:
            "The given diseases are excluded from the Sum Insured covered in this policy.",
          description:
            "Insurer shall not be liable to make any payment for any claim directly or indirectly caused by, based on, arising out of or attributable to any of the mentioned conditions.",
        },
        {
          name: "Pre Policy Medical Screening",
          code: "pre_policy_medical_screening",
          icon: "",
          is_featured_on_card: 0,
          value: "Required",
          short_description:
            "A medical checkup is required for a specific age of 61 years and above before one takes the policy.",
          description:
            "The pre-policy medical checkup refers to the medical examination that is required before issuing the policy. This checkup is mandatory for applicants above a certain age and is done to determine the applicant's current medical fitness",
        },
        {
          name: "Co-Payment",
          code: "co_payment",
          icon: "https://prod-health-admin-bucket.s3.ap-south-1.amazonaws.com/Feature_icons/copay.png",
          is_featured_on_card: 1,
          value: "Age based",
          short_description:
            "A specific percent of 20 % of claim amount is paid by the Insured person if the age is 61 years and above.",
          description:
            "Co-payment means a cost sharing requirement that the Policy holder will bear a specified percentage of the admissible claims amount. A specific percent of 20 % of claim amount is paid by the Insured person if the age is 61 years and above.",
        },
      ],
      company_alias: "care_health",
      available_tenures: [1, 2, 3],
      mandatory_riders: [
        {
          id: 48,
          name: "No Claim Bonus",
          alias: "CAREWITHNCB",
          description:
            "Maximum up to 150% increase in the Sum Insured is granted by the Insurer without any associated increase in premium for every claim free year.",
          sum_insured: 500000,
          premium: 733,
          total_premium: 733,
          tax_amount: 112,
          available_only_with: null,
          affects_other_riders: null,
        },
      ],
    },
    {
      product: {
        id: 119,
        name: "Care Freedom",
        company: {
          id: 1,
          name: "Care Health Insurance",
          alias: "care_health",
          csr: [92.4],
        },
        insurance_type: { id: 1, name: "Health Insurance", alias: "health" },
      },
      sum_insured: "300000",
      deductible: null,
      premium: 4790,
      total_premium: 5652,
      is_arogya_sanjeevani: 0,
      tenure: 1,
      tax_amount: 862,
      ppmc_age_limit: 45,
      features: [
        {
          name: "Cashless Hospitals",
          code: "cashless_hospitals",
          icon: "https://prod-health-admin-bucket.s3.ap-south-1.amazonaws.com/Feature_icons/cashless%20hospitals.png",
          is_featured_on_card: 0,
          value: "7800+",
          short_description: "Number of Hospitals we are connected with.",
          description:
            "Cashless Hospitals means hospitals or health care providers enlisted by an Insurer to provide medical services to an Insured by a cashless facility",
        },
        {
          name: "Unique Feature",
          code: "unique_feature",
          icon: "",
          is_featured_on_card: 0,
          value:
            "\u2022 Diabetes\n\u2022 High pressure and High BMI without medical test",
          short_description: "Following are the key benefits of this policy.",
          description:
            "Your health cover will have the above unqiue selling propositions",
        },
        {
          name: "Room Rent",
          code: "room_rent_charges",
          icon: "https://prod-health-admin-bucket.s3.ap-south-1.amazonaws.com/Feature_icons/room%20rent.png",
          is_featured_on_card: 1,
          value: "Twin sharing room",
          short_description:
            "Expenses incurred for room & boarding of a Hospital room are covered up to Twin sharing room subject to a maximum 1% of Sum Insured per day.",
          description:
            "Room Rent means the amount charged by a Hospital towards Room and Boarding expenses and shall include the associated medical expenses",
        },
        {
          name: "Pre Hospitalisation",
          code: "pre_hospitalisation",
          icon: "https://prod-health-admin-bucket.s3.ap-south-1.amazonaws.com/Feature_icons/pre.png",
          is_featured_on_card: 0,
          value: "30 Days",
          short_description:
            "Medical expenses incurred for covered Hospitalisation expenses, related and prior to 30 Days of Hospitalization.Covered upto 7.5% of payable hospital expenses",
          description:
            "Pre-hospitalization Medical Expenses means Medical Expenses incurred during pre-defined number of days before the Hospitalization of the Insured Person",
        },
        {
          name: "Post Hospitalisation",
          code: "post_hospitalisation",
          icon: "https://prod-health-admin-bucket.s3.ap-south-1.amazonaws.com/Feature_icons/post.png",
          is_featured_on_card: 0,
          value: "60 Days",
          short_description:
            "Medical expenses incurred for covered Hospitalisation expenses, related and post 60 Days of Hospitalization. Covered upto 7.5% of payable hospital expenses.",
          description:
            "Post-hospitalization Medical Expenses means Medical Expenses incurred during pre-defined number of days immediately after the Insured Person is discharged from the hospital",
        },
        {
          name: "Road Ambulance",
          code: "road_ambulance",
          icon: "https://prod-health-admin-bucket.s3.ap-south-1.amazonaws.com/Feature_icons/ambulance.png",
          is_featured_on_card: 0,
          value: "Covered",
          short_description: "Upto \u20b9 1000 per valid hospitalization",
          description:
            "Expenses incurred for utilizing ambulance service for transporting Insured person to hospital.",
        },
        {
          name: "Hospitalization Cover",
          code: "hospitalization_cover",
          icon: "https://prod-health-admin-bucket.s3.ap-south-1.amazonaws.com/Feature_icons/hospitali.png",
          is_featured_on_card: 0,
          value: "Covered",
          short_description:
            "Covers medical expenses for more than 24 hours of hospitalisation.",
          description:
            "Hospitalization Cover means treatment for which the Insured Person has to stay in a hospital for more than 24 hours for a covered event",
        },
        {
          name: "Organ Donor Cover",
          code: "organ_donor_cover",
          icon: "https://prod-health-admin-bucket.s3.ap-south-1.amazonaws.com/Feature_icons/organ.png",
          is_featured_on_card: 0,
          value: "Not Covered",
          short_description: "This benefit is not covered in this plan.",
          description:
            "Organ Donor Cover means Medical Expenses towards organ donor\u2019s Hospitalization for harvesting of the donated organ where an Insured Person is the recipient",
        },
        {
          name: "Day Care Treatments",
          code: "day_care_treatments",
          icon: "https://prod-health-admin-bucket.s3.ap-south-1.amazonaws.com/Feature_icons/day_care.png",
          is_featured_on_card: 0,
          value: "Covered",
          short_description:
            "This policy covers more than 170+ Day Care procedures.",
          description:
            "Day care treatment means treatment and / or procedures that require hospitalisation for less than 24-hours due to technological advancements.",
        },
        {
          name: "Ayush Treatment",
          code: "ayush_treatment",
          icon: "https://prod-health-admin-bucket.s3.ap-south-1.amazonaws.com/Feature_icons/aayush.png",
          is_featured_on_card: 0,
          value: "Not Covered",
          short_description: "This benefit is not covered in this plan.",
          description:
            "Ayush Treatment refers to the medical and / or hospitalization treatments given under \u2018Ayurveda, Yoga and Naturopathy, Unani, Siddha and Homeopathy systems",
        },
        {
          name: "No Claim Bonus",
          code: "no_claim_bonus",
          icon: "https://prod-health-admin-bucket.s3.ap-south-1.amazonaws.com/Feature_icons/Renewal.png",
          is_featured_on_card: 1,
          value: "Not Covered",
          short_description:
            "Increase in Sum Insured for every claim free year for a maximum without increase in premium. This benefit is not covered in this plan.",
          description:
            "No Claim Bonus means any increase or addition in the Sum Insured granted by the Insurer without any associated increase in premium in a claim free year",
        },
        {
          name: "Pre Existing Disease",
          code: "pre_existing_disease_cover",
          icon: "https://prod-health-admin-bucket.s3.ap-south-1.amazonaws.com/Feature_icons/waiting%20period.png",
          is_featured_on_card: 1,
          value: "2 Years",
          short_description:
            "Waiting period of 2 years is required for this plan.",
          description:
            "Pre-Existing disease means any condition, ailment, injury or disease that is diagnosed or for which medical advice or treatment was recommended by, or received from, a physician prior to the effective date of the policy or its reinstatement",
        },
        {
          name: "Hospital Daily Cash",
          code: "hospital_daily_cash",
          icon: "",
          is_featured_on_card: 0,
          value: "Covered",
          short_description:
            "Covered up to \u20b9 1,000 daily maximum 7 days per hospitalisation. Covered after 3 days.",
          description:
            "A lump sum amount is provided daily in case of hospitalization and this amount can be used per the insured's need such as additional expenses that are not covered by health insurance.",
        },
        {
          name: "Air Ambulance Cover",
          code: "air_ambulance_cover",
          icon: "",
          is_featured_on_card: 0,
          value: "Not Covered",
          short_description: "This benefit is not covered in this plan.",
          description:
            "Expenses incurred for evacuation in an Emergency condition through an Ambulance, which includes Air Ambulance or any other transportation and evacuation services to the nearest Hospital",
        },
        {
          name: "Outpatient Expenses",
          code: "outpatient_expenses",
          icon: "",
          is_featured_on_card: 0,
          value: "Not Covered",
          short_description:
            "Expenses incurred for out-patient treatments are not covered in this plan.",
          description:
            "Out patient treatment means the one in which the Insured visits a clinic / hospital or associated facility like a consultation room for diagnosis and treatment based on the advice of a Medical Practitioner",
        },
        {
          name: "Maternity Cover",
          code: "maternity_cover",
          icon: "",
          is_featured_on_card: 0,
          value: "Not Covered",
          short_description: "This benefit is not covered in this plan.",
          description:
            "Maternity Cover Means Medical Expenses for a delivery (including complicated deliveries and caesarean sections) incurred during Hospitalization; The lawful medical termination of pregnancy during the Policy Period; Pre-natal and post-natal Medical Expenses for delivery or termination",
        },
        {
          name: "New Born Baby Cover",
          code: "new_born_baby_cover",
          icon: "",
          is_featured_on_card: 0,
          value: "Not Covered",
          short_description: "This benefit is not covered in this plan.",
          description:
            "Newborn baby means baby born during the Policy Period and is aged between 1 day and 90 days, both days inclusive.",
        },
        {
          name: "Bariatric Surgery",
          code: "bariatric_surgery",
          icon: "",
          is_featured_on_card: 0,
          value: "Not Covered",
          short_description: "This benefit is not covered in this plan.",
          description:
            "Bariatric Surgery Means Surgery on the stomach and/or intestines to help a person with extreme obesity to lose weight",
        },
        {
          name: "Free Health Check Up",
          code: "free_health_check_up",
          icon: "",
          is_featured_on_card: 0,
          value: "Yes",
          short_description:
            "Annual health check-up for insured members regardless of claims history, provided in accordance to the criteria. This benefit will not be carried forward if not utilized within 60 days of Policy Anniversary/Renewal date.",
          description:
            "If You Renew Your Policy with Insurance company without a break, then at every Policy Renewal Insurance company will pay the expenses incurred towards cost of health check-up up to the Limits Per Policy (excluding any cumulative bonus) mentioned in Your Policy Schedule",
        },
        {
          name: "Worldwide Coverage",
          code: "worldwide_coverage",
          icon: "https://prod-health-admin-bucket.s3.ap-south-1.amazonaws.com/Feature_icons/Worldwide%20cover.png",
          is_featured_on_card: 0,
          value: "Not Covered",
          short_description:
            "Medical Expenses of the Insured Person incurred outside India are not covered in this plan.",
          description:
            "Worldwide coverage is a benefit that offers coverage all over the world.",
        },
        {
          name: "Disease Wise Cover",
          code: "disease_wise_cover",
          icon: "",
          is_featured_on_card: 0,
          value: "Sub-Limit",
          short_description:
            "Sub-limit is applicable specific disease.  Treatment of Catract- Up to \u20b920,000/- per eye Treatment of total knee replacement - Up to \u20b9 80,000/- per knee. Treatment of Ailment like Surgery for all type of Hernia, Hysterectomy,surgical treatment of stones of renal system,BPH - Up to \u20b950,000/- Treatment of Ailment like treatment for cerebrovasular and cardiovascular,Surgery for cancer,other renal complications and disorders, bone breakage etc - Up to \u20b92,00,000/-",
          description:
            "Disease wise is a cost sharing requirement that provides that the Policyholder shall bear a specified percentage of the admissible claims amount for mentioned specific disease.",
        },
        {
          name: "2 Year Waiting Period",
          code: "2_year_waiting_period",
          icon: "",
          is_featured_on_card: 0,
          value: "Applicable",
          short_description:
            "The following specific diseases require a waiting period of 2 year for a claim to be made. Arthritis,Osteoarthritis,Gout,Rheumatism,Cataract,Dilatation and Curettage,All types of Hernia,hydrocele,Pancreatitis,end stage liver disease,Heart failure,Cerebrovascular accident(Please refer to the policy wording for futher details)",
          description:
            "No claim shall be accepted before 2 years for mentioned specific dieases. ",
        },
        {
          name: "4 Year Waiting Period",
          code: "4_year_waiting_period",
          icon: "",
          is_featured_on_card: 0,
          value: "Not Applicable",
          short_description:
            "No specific disease require a waiting period of 4 years to for a claim to be made.",
          description:
            "No claim shall be accepted before 4 years for mentioned specific dieases.",
        },
        {
          name: "Permanent Exclusions",
          code: "permanent_exclusions",
          icon: "https://prod-health-admin-bucket.s3.ap-south-1.amazonaws.com/Feature_icons/Group%207492.png",
          is_featured_on_card: 0,
          value:
            "War or similar situations\nBreach of law\nDangerous acts (including sports)\nSubstance abuse and de-addiction programs\nExpenses attributable to self-infected injury (resulting from suicide, attempted suicide)\nOPD treatment\nMedical expenses incurred for treatment of AIDS",
          short_description:
            "The given diseases are excluded from the Sum Insured covered in this policy.",
          description:
            "Insurer shall not be liable to make any payment for any claim directly or indirectly caused by, based on, arising out of or attributable to any of the mentioned conditions.",
        },
        {
          name: "Pre Policy Medical Screening",
          code: "pre_policy_medical_screening",
          icon: "",
          is_featured_on_card: 0,
          value: "Required",
          short_description: "Tele medical underwriting is required",
          description:
            "The pre-policy medical checkup refers to the medical examination that is required before issuing the policy. This checkup is mandatory for applicants above a certain age and is done to determine the applicant's current medical fitness",
        },
        {
          name: "Co-Payment",
          code: "co_payment",
          icon: "https://prod-health-admin-bucket.s3.ap-south-1.amazonaws.com/Feature_icons/copay.png",
          is_featured_on_card: 1,
          value: "20%",
          short_description:
            "A specific percent of 20% claim amount is paid by the Insured person.",
          description:
            "Co-payment means a cost sharing requirement that the Policy holder will bear a specified percentage of the admissible claims amount",
        },
      ],
      company_alias: "care_health",
      available_tenures: [1, 2, 3],
      mandatory_riders: [],
    },
    {
      product: {
        id: 119,
        name: "Care Freedom",
        company: {
          id: 1,
          name: "Care Health Insurance",
          alias: "care_health",
          csr: [92.4],
        },
        insurance_type: { id: 1, name: "Health Insurance", alias: "health" },
      },
      sum_insured: "500000",
      deductible: null,
      premium: 5549,
      total_premium: 6548,
      is_arogya_sanjeevani: 0,
      tenure: 1,
      tax_amount: 999,
      ppmc_age_limit: 45,
      features: [
        {
          name: "Cashless Hospitals",
          code: "cashless_hospitals",
          icon: "https://prod-health-admin-bucket.s3.ap-south-1.amazonaws.com/Feature_icons/cashless%20hospitals.png",
          is_featured_on_card: 0,
          value: "7800+",
          short_description: "Number of Hospitals we are connected with.",
          description:
            "Cashless Hospitals means hospitals or health care providers enlisted by an Insurer to provide medical services to an Insured by a cashless facility",
        },
        {
          name: "Unique Feature",
          code: "unique_feature",
          icon: "",
          is_featured_on_card: 0,
          value:
            "\u2022 Diabetes\n\u2022 High pressure and High BMI without medical test",
          short_description: "Following are the key benefits of this policy.",
          description:
            "Your health cover will have the above unqiue selling propositions",
        },
        {
          name: "Room Rent",
          code: "room_rent_charges",
          icon: "https://prod-health-admin-bucket.s3.ap-south-1.amazonaws.com/Feature_icons/room%20rent.png",
          is_featured_on_card: 1,
          value: "Twin sharing room",
          short_description:
            "Expenses incurred for room & boarding of a Hospital room are covered up to Twin sharing room subject to a maximum 1% of Sum Insured per day.",
          description:
            "Room Rent means the amount charged by a Hospital towards Room and Boarding expenses and shall include the associated medical expenses",
        },
        {
          name: "Pre Hospitalisation",
          code: "pre_hospitalisation",
          icon: "https://prod-health-admin-bucket.s3.ap-south-1.amazonaws.com/Feature_icons/pre.png",
          is_featured_on_card: 0,
          value: "30 Days",
          short_description:
            "Medical expenses incurred for covered Hospitalisation expenses, related and prior to 30 Days of Hospitalization. Covered upto 10% of payable hospital expenses.",
          description:
            "Pre-hospitalization Medical Expenses means Medical Expenses incurred during pre-defined number of days before the Hospitalization of the Insured Person",
        },
        {
          name: "Post Hospitalisation",
          code: "post_hospitalisation",
          icon: "https://prod-health-admin-bucket.s3.ap-south-1.amazonaws.com/Feature_icons/post.png",
          is_featured_on_card: 0,
          value: "60 Days",
          short_description:
            "Medical expenses incurred for covered Hospitalisation expenses, related and post 60 Days of Hospitalization. Covered upto 10% of payable hospital expenses.",
          description:
            "Post-hospitalization Medical Expenses means Medical Expenses incurred during pre-defined number of days immediately after the Insured Person is discharged from the hospital",
        },
        {
          name: "Road Ambulance",
          code: "road_ambulance",
          icon: "https://prod-health-admin-bucket.s3.ap-south-1.amazonaws.com/Feature_icons/ambulance.png",
          is_featured_on_card: 0,
          value: "Covered",
          short_description: "Upto \u20b9 1000 per valid hospitalization",
          description:
            "Expenses incurred for utilizing ambulance service for transporting Insured person to hospital.",
        },
        {
          name: "Hospitalization Cover",
          code: "hospitalization_cover",
          icon: "https://prod-health-admin-bucket.s3.ap-south-1.amazonaws.com/Feature_icons/hospitali.png",
          is_featured_on_card: 0,
          value: "Covered",
          short_description:
            "Covers medical expenses for more than 24 hours of hospitalisation.",
          description:
            "Hospitalization Cover means treatment for which the Insured Person has to stay in a hospital for more than 24 hours for a covered event",
        },
        {
          name: "Organ Donor Cover",
          code: "organ_donor_cover",
          icon: "https://prod-health-admin-bucket.s3.ap-south-1.amazonaws.com/Feature_icons/organ.png",
          is_featured_on_card: 0,
          value: "Not Covered",
          short_description: "This benefit is not covered in this plan.",
          description:
            "Organ Donor Cover means Medical Expenses towards organ donor\u2019s Hospitalization for harvesting of the donated organ where an Insured Person is the recipient",
        },
        {
          name: "Day Care Treatments",
          code: "day_care_treatments",
          icon: "https://prod-health-admin-bucket.s3.ap-south-1.amazonaws.com/Feature_icons/day_care.png",
          is_featured_on_card: 0,
          value: "Covered",
          short_description:
            "This policy covers more than 170+ Day Care procedures.",
          description:
            "Day care treatment means treatment and / or procedures that require hospitalisation for less than 24-hours due to technological advancements.",
        },
        {
          name: "Ayush Treatment",
          code: "ayush_treatment",
          icon: "https://prod-health-admin-bucket.s3.ap-south-1.amazonaws.com/Feature_icons/aayush.png",
          is_featured_on_card: 0,
          value: "Not Covered",
          short_description: "This benefit is not covered in this plan.",
          description:
            "Ayush Treatment refers to the medical and / or hospitalization treatments given under \u2018Ayurveda, Yoga and Naturopathy, Unani, Siddha and Homeopathy systems",
        },
        {
          name: "No Claim Bonus",
          code: "no_claim_bonus",
          icon: "https://prod-health-admin-bucket.s3.ap-south-1.amazonaws.com/Feature_icons/Renewal.png",
          is_featured_on_card: 1,
          value: "Not Covered",
          short_description:
            "Increase in Sum Insured for every claim free year for a maximum without increase in premium. This benefit is not covered in this plan.",
          description:
            "No Claim Bonus means any increase or addition in the Sum Insured granted by the Insurer without any associated increase in premium in a claim free year",
        },
        {
          name: "Pre Existing Disease",
          code: "pre_existing_disease_cover",
          icon: "https://prod-health-admin-bucket.s3.ap-south-1.amazonaws.com/Feature_icons/waiting%20period.png",
          is_featured_on_card: 1,
          value: "2 Years",
          short_description:
            "Waiting period of 2 years is required for this plan.",
          description:
            "Pre-Existing disease means any condition, ailment, injury or disease that is diagnosed or for which medical advice or treatment was recommended by, or received from, a physician prior to the effective date of the policy or its reinstatement",
        },
        {
          name: "Hospital Daily Cash",
          code: "hospital_daily_cash",
          icon: "",
          is_featured_on_card: 0,
          value: "Covered",
          short_description:
            "Covered up to \u20b9 1,000 daily maximum 7 days per hospitalisation. Covered after 3 days.",
          description:
            "A lump sum amount is provided daily in case of hospitalization and this amount can be used per the insured's need such as additional expenses that are not covered by health insurance.",
        },
        {
          name: "Air Ambulance Cover",
          code: "air_ambulance_cover",
          icon: "",
          is_featured_on_card: 0,
          value: "Not Covered",
          short_description: "This benefit is not covered in this plan.",
          description:
            "Expenses incurred for evacuation in an Emergency condition through an Ambulance, which includes Air Ambulance or any other transportation and evacuation services to the nearest Hospital",
        },
        {
          name: "Outpatient Expenses",
          code: "outpatient_expenses",
          icon: "",
          is_featured_on_card: 0,
          value: "Not Covered",
          short_description:
            "Expenses incurred for out-patient treatments are not covered in this plan.",
          description:
            "Out patient treatment means the one in which the Insured visits a clinic / hospital or associated facility like a consultation room for diagnosis and treatment based on the advice of a Medical Practitioner",
        },
        {
          name: "Maternity Cover",
          code: "maternity_cover",
          icon: "",
          is_featured_on_card: 0,
          value: "Not Covered",
          short_description: "This benefit is not covered in this plan.",
          description:
            "Maternity Cover Means Medical Expenses for a delivery (including complicated deliveries and caesarean sections) incurred during Hospitalization; The lawful medical termination of pregnancy during the Policy Period; Pre-natal and post-natal Medical Expenses for delivery or termination",
        },
        {
          name: "New Born Baby Cover",
          code: "new_born_baby_cover",
          icon: "",
          is_featured_on_card: 0,
          value: "Not Covered",
          short_description: "This benefit is not covered in this plan.",
          description:
            "Newborn baby means baby born during the Policy Period and is aged between 1 day and 90 days, both days inclusive.",
        },
        {
          name: "Bariatric Surgery",
          code: "bariatric_surgery",
          icon: "",
          is_featured_on_card: 0,
          value: "Not Covered",
          short_description: "This benefit is not covered in this plan.",
          description:
            "Bariatric Surgery Means Surgery on the stomach and/or intestines to help a person with extreme obesity to lose weight",
        },
        {
          name: "Free Health Check Up",
          code: "free_health_check_up",
          icon: "",
          is_featured_on_card: 0,
          value: "Yes",
          short_description:
            "Annual health check-up for insured members regardless of claims history, provided in accordance to the criteria. This benefit will not be carried forward if not utilized within 60 days of Policy Anniversary/Renewal date.",
          description:
            "If You Renew Your Policy with Insurance company without a break, then at every Policy Renewal Insurance company will pay the expenses incurred towards cost of health check-up up to the Limits Per Policy (excluding any cumulative bonus) mentioned in Your Policy Schedule",
        },
        {
          name: "Worldwide Coverage",
          code: "worldwide_coverage",
          icon: "https://prod-health-admin-bucket.s3.ap-south-1.amazonaws.com/Feature_icons/Worldwide%20cover.png",
          is_featured_on_card: 0,
          value: "Not Covered",
          short_description:
            "Medical Expenses of the Insured Person incurred outside India are not covered in this plan.",
          description:
            "Worldwide coverage is a benefit that offers coverage all over the world.",
        },
        {
          name: "Disease Wise Cover",
          code: "disease_wise_cover",
          icon: "",
          is_featured_on_card: 0,
          value: "Sub-Limit",
          short_description:
            "Sub-limit is applicable specific disease.  Treatment of Catract- Up to \u20b930,000/- per eye Treatment of total knee replacement - Up to \u20b91,00,000/- per knee. Treatment of Ailment like Surgery for all type of Hernia, Hysterectomy,surgical treatment of stones of renal system,BPH - Up to \u20b965,000/- Treatment of Ailment like treatment for cerebrovasular and cardiovascular,Surgery for cancer,other renal complications and disorders, bone breakage etc - Up to \u20b92,50,000/-",
          description:
            "Disease wise is a cost sharing requirement that provides that the Policyholder shall bear a specified percentage of the admissible claims amount for mentioned specific disease.",
        },
        {
          name: "2 Year Waiting Period",
          code: "2_year_waiting_period",
          icon: "",
          is_featured_on_card: 0,
          value: "Applicable",
          short_description:
            "The following specific diseases require a waiting period of 2 year for a claim to be made. Arthritis,Osteoarthritis,Gout,Rheumatism,Cataract,Dilatation and Curettage,All types of Hernia,hydrocele,Pancreatitis,end stage liver disease,Heart failure,Cerebrovascular accident(Please refer to the policy wording for futher details)",
          description:
            "No claim shall be accepted before 2 years for mentioned specific dieases.",
        },
        {
          name: "4 Year Waiting Period",
          code: "4_year_waiting_period",
          icon: "",
          is_featured_on_card: 0,
          value: "Not Applicable",
          short_description:
            "No specific disease require a waiting period of 4 years to for a claim to be made.",
          description:
            "No claim shall be accepted before 4 years for mentioned specific dieases.",
        },
        {
          name: "Permanent Exclusions",
          code: "permanent_exclusions",
          icon: "https://prod-health-admin-bucket.s3.ap-south-1.amazonaws.com/Feature_icons/Group%207492.png",
          is_featured_on_card: 0,
          value:
            "War or similar situations\nBreach of law\nDangerous acts (including sports)\nSubstance abuse and de-addiction programs\nExpenses attributable to self-infected injury (resulting from suicide, attempted suicide)\nOPD treatment\nMedical expenses incurred for treatment of AIDS",
          short_description:
            "The given diseases are excluded from the Sum Insured covered in this policy.",
          description:
            "Insurer shall not be liable to make any payment for any claim directly or indirectly caused by, based on, arising out of or attributable to any of the mentioned conditions.",
        },
        {
          name: "Pre Policy Medical Screening",
          code: "pre_policy_medical_screening",
          icon: "",
          is_featured_on_card: 0,
          value: "Required",
          short_description: "Tele medical underwriting is required",
          description:
            "The pre-policy medical checkup refers to the medical examination that is required before issuing the policy. This checkup is mandatory for applicants above a certain age and is done to determine the applicant's current medical fitness",
        },
        {
          name: "Co-Payment",
          code: "co_payment",
          icon: "https://prod-health-admin-bucket.s3.ap-south-1.amazonaws.com/Feature_icons/copay.png",
          is_featured_on_card: 1,
          value: "20%",
          short_description:
            "A specific percent of 20% claim amount is paid by the Insured person.",
          description:
            "Co-payment means a cost sharing requirement that the Policy holder will bear a specified percentage of the admissible claims amount",
        },
      ],
      company_alias: "care_health",
      available_tenures: [1, 2, 3],
      mandatory_riders: [],
    },
  ],
  cashless_hospitals_count: 167,
};
