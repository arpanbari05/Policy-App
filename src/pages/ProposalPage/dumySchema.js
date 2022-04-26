const dummy ={
    "Proposer Details": [
        {
            "type": "title",
            "name": "Personal Details",
            "section": "Personal Details",
            "width": "100%"
        },
        {
            "type": "select",
            "name": "title",
            "section": "Personal Details",
            "width": "25%",
            "validate": {
                "required": true
            },
            "additionalOptions": {
                "label": "Title",
                "options": {
                    "mr": "Mr"
                }
            }
        },
        {
            "type": "text",
            "name": "name",
            "section": "Personal Details",
            "allow": "onlyAlphabets",
            "width": "75%",
            "validate": {
                "required": true,
                "matches": "name",
                "length": [
                    6,
                    100
                ]
            },
            "additionalOptions": {
                "label": "Full Name",
                "placeholder": "First Middle(Optional) Last",
                "maxLength": 100
            }
        },
        {
            "type": "select",
            "name": "gender",
            "section": "Personal Details",
            "validate": {
                "required": true
            },
            "additionalOptions": {
                "label": "Gender",
                "options": {
                    "M": "Male",
                    "F": "Female",
                    "O": "Other"
                },
                "readOnly": true
            }
        },
        {
            "type": "date",
            "name": "dob",
            "section": "Personal Details",
            "validate": {
                "required": true,
                "matches": "date",
                "age": [
                    18,
                    45
                ]
            },
            "additionalOptions": {
                "label": "Date of Birth",
                "placeholder": "DD-MM-YYYY",
                "maxLength": 10
            },
            "allow": "dob"
        },
        {
            "type": "select",
            "name": "occupation",
            "section": "Personal Details",
            "validate": {
                "required": true
            },
            "additionalOptions": {
                "label": "Occupation",
                "options": {
                    "1|ACCOUNTANTS": "ACCOUNTANTS",
                    "102|ARCHITECT": "ARCHITECT",
                    "993|AUDITOR": "AUDITOR",
                    "10|BLUE COLLAR(LABORER)": "BLUE COLLAR(LABORER)",
                    "2|BANKERS": "BANKERS",
                    "4|BUILDERS": "BUILDERS",
                    "18|CIRCUS PERSONNEL": "CIRCUS PERSONNEL",
                    "5|CONTRACTORS": "CONTRACTORS",
                    "101|ENGINEER": "ENGINEER",
                    "21|ENGINEER NON CONSULTING": "ENGINEER NON CONSULTING",
                    "15|EXPLOSIVES": "EXPLOSIVES",
                    "20|HIGH TENSION ELECTRICAL INSTALLER": "HIGH TENSION ELECTRICAL INSTALLER",
                    "24|INDUSTRIALIST": "INDUSTRIALIST",
                    "17|JOCKEYS": "JOCKEYS",
                    "131|LAWYER": "LAWYER",
                    "9|MACHINE OPERATORS": "MACHINE OPERATORS",
                    "8|MOTOR MECHANICS": "MOTOR MECHANICS",
                    "23|OTHER": "OTHER",
                    "22|PAID DRIVER (NON-CASH CARRYING EMP.)": "PAID DRIVER (NON-CASH CARRYING EMP.)",
                    "111|PHYSICIAN": "PHYSICIAN",
                    "11|PROF. ATHELES AND SPORTSMEN": "PROF. ATHELES AND SPORTSMEN",
                    "994|PROFESSIONAL": "PROFESSIONAL",
                    "137|PUBLIC RELATIONS": "PUBLIC RELATIONS",
                    "19|RACING": "RACING",
                    "125|SELF-EMPLOYED": "SELF-EMPLOYED",
                    "3|SERVICE": "SERVICE",
                    "134|SOCIAL SERVICE": "SOCIAL SERVICE",
                    "126|SYSTEMS ANALYST": "SYSTEMS ANALYST",
                    "138|TEACHER": "TEACHER",
                    "14|UNDERGROUND MINES WORKER": "UNDERGROUND MINES WORKER",
                    "12|UNEMPLOYED": "UNEMPLOYED",
                    "6|VETERINARY DOCTORS": "VETERINARY DOCTORS",
                    "13|WOOD WORKING MACHINISTS": "WOOD WORKING MACHINISTS"
                }
            }
        },
        {
            "type": "text",
            "name": "annIncome",
            "section": "Personal Details",
            "validate": {
                "matches": "onlyDigits"
            },
            "allow": "onlyNumbers",
            "additionalOptions": {
                "label": "Annual Income",
                "placeholder": "Annual Income",
                "maxLength": 10
            }
        },
        {
            "type": "text",
            "name": "pan_card",
            "section": "Personal Details",
            "validate": {
                "matches": "pan"
            },
            "additionalOptions": {
                "label": "PAN Number",
                "placeholder": "PAN Number",
                "textTransform": "uppercase",
                "maxLength": 10
            }
        },
        {
            "type": "title",
            "section": "Contact Details",
            "name": "Contact Details",
            "width": "100%"
        },
        {
            "type": "text",
            "name": "email",
            "section": "Contact Details",
            "validate": {
                "required": true,
                "matches": "email"
            },
            "additionalOptions": {
                "label": "Email",
                "placeholder": "Email"
            }
        },
        {
            "type": "text",
            "name": "mobile",
            "section": "Contact Details",
            "allow": "onlyNumbers",
            "validate": {
                "required": true,
                "matches": "mobile"
            },
            "additionalOptions": {
                "label": "Mobile No.",
                "placeholder": "Mobile No.",
                "maxLength": 10
            }
        },
        {
            "type": "text",
            "name": "alternate_mobile",
            "section": "Contact Details",
            "allow": "onlyNumbers",
            "validate": {
                "matches": "alt/mobile"
            },
            "additionalOptions": {
                "label": "Alternate Mobile No",
                "placeholder": "Alternate Mobile No",
                "maxLength": 10
            }
        },
        {
            "type": "title",
            "name": "Address for self , spouse",
            "section": "Address for self , spouse",
            "width": "100%"
        },
        {
            "type": "text",
            "name": "address_line_1_10031257",
            "section": "Address for self , spouse",
            "allow": "address",
            "validate": {
                "required": true,
                "matches": "address"
            },
            "additionalOptions": {
                "label": "Address Line 1",
                "placeholder": "Address Line 1",
                "maxLength": 60
            }
        },
        {
            "type": "text",
            "name": "address_line_2_10031257",
            "section": "Address for self , spouse",
            "allow": "address",
            "validate": {
                "matches": "address",
                "required": true
            },
            "additionalOptions": {
                "label": "Address Line 2",
                "placeholder": "Address Line 2",
                "maxLength": 60
            }
        },
        {
            "type": "text",
            "name": "address_line_3_10031257",
            "section": "Address for self , spouse",
            "allow": "address",
            "validate": {
                "matches": "address"
            },
            "additionalOptions": {
                "label": "Address Line 3",
                "placeholder": "Address Line 3",
                "maxLength": 60
            }
        },
        {
            "type": "select",
            "name": "pincode_10031257",
            "section": "Address for self , spouse",
            "value": 380001,
            "allow": "onlyNumbers",
            "validate": {
                "required": true,
                "matches": "pincode"
            },
            "additionalOptions": {
                "label": "Pincode",
                "placeholder": "Pincode",
                "maxLength": 6,
                "readOnly": false,
                "options": {
                    "380001": 380001,
                    "380002": 380002,
                    "380004": 380004,
                    "380005": 380005,
                    "380006": 380006,
                    "380007": 380007,
                    "380008": 380008,
                    "380009": 380009,
                    "380013": 380013,
                    "380014": 380014,
                    "380015": 380015,
                    "380016": 380016,
                    "380018": 380018,
                    "380019": 380019,
                    "380021": 380021,
                    "380022": 380022,
                    "380023": 380023,
                    "380024": 380024,
                    "380026": 380026,
                    "380027": 380027,
                    "380028": 380028,
                    "380050": 380050,
                    "380051": 380051,
                    "380052": 380052,
                    "380054": 380054,
                    "380055": 380055,
                    "380058": 380058,
                    "380059": 380059,
                    "380060": 380060,
                    "380061": 380061,
                    "380063": 380063,
                    "382110": 382110,
                    "382120": 382120,
                    "382130": 382130,
                    "382140": 382140,
                    "382145": 382145,
                    "382150": 382150,
                    "382170": 382170,
                    "382210": 382210,
                    "382213": 382213,
                    "382220": 382220,
                    "382225": 382225,
                    "382230": 382230,
                    "382240": 382240,
                    "382245": 382245,
                    "382250": 382250,
                    "382255": 382255,
                    "382260": 382260,
                    "382265": 382265,
                    "382330": 382330,
                    "382340": 382340,
                    "382345": 382345,
                    "382350": 382350,
                    "382405": 382405,
                    "382415": 382415,
                    "382418": 382418,
                    "382421": 382421,
                    "382424": 382424,
                    "382425": 382425,
                    "382427": 382427,
                    "382430": 382430,
                    "382435": 382435,
                    "382440": 382440,
                    "382443": 382443,
                    "382445": 382445,
                    "382449": 382449,
                    "382450": 382450,
                    "382455": 382455,
                    "382460": 382460,
                    "382463": 382463,
                    "382465": 382465,
                    "382470": 382470,
                    "382475": 382475,
                    "382480": 382480,
                    "382481": 382481,
                    "383345": 383345
                }
            }
        },
        {
            "type": "text",
            "name": "city_10031257",
            "section": "Address for self , spouse",
            "value": "Ahmedabad",
            "validate": {
                "required": true
            },
            "additionalOptions": {
                "label": "City",
                "placeholder": "City",
                "readOnly": true
            }
        },
        {
            "type": "text",
            "name": "state_10031257",
            "section": "Address for self , spouse",
            "value": "Gujarat",
            "additionalOptions": {
                "label": "State",
                "placeholder": "State",
                "readOnly": true
            }
        }
    ],
    "Insured Details": {
        "self": [
            {
                "type": "select",
                "name": "title",
                "width": "25%",
                "validate": {
                    "required": true
                },
                "additionalOptions": {
                    "label": "Title",
                    "options": {
                        "mr": "Mr"
                    },
                    "readOnly": true
                }
            },
            {
                "type": "text",
                "name": "name",
                "allow": "onlyAlphabets",
                "width": "75%",
                "validate": {
                    "required": true,
                    "matches": "name",
                    "length": [
                        6,
                        100
                    ]
                },
                "additionalOptions": {
                    "label": "Full Name",
                    "placeholder": "First Middle(Optional) Last",
                    "maxLength": 100,
                    "readOnly": true
                }
            },
            {
                "type": "date",
                "name": "dob",
                "validate": {
                    "required": true,
                    "matches": "date",
                    "age": [
                        18,
                        45
                    ]
                },
                "additionalOptions": {
                    "label": "Date of Birth",
                    "placeholder": "DD-MM-YYYY",
                    "maxLength": 10,
                    "readOnly": true
                },
                "allow": "dob"
            },
            {
                "type": "custom_height",
                "name": "height",
                "validate": {
                    "required": true
                }
            },
            {
                "type": "text",
                "name": "weight",
                "allow": "onlyNumbers",
                "validate": {
                    "required": true,
                    "matches": "validDigits/1/200"
                },
                "additionalOptions": {
                    "label": "Weight (KG)",
                    "placeholder": "Weight (KG)",
                    "maxLength": 3
                }
            },
            {
                "type": "select",
                "name": "occupation",
                "section": "Personal Details",
                "validate": {
                    "required": true
                },
                "additionalOptions": {
                    "label": "Occupation",
                    "options": {
                        "1|ACCOUNTANTS": "ACCOUNTANTS",
                        "102|ARCHITECT": "ARCHITECT",
                        "993|AUDITOR": "AUDITOR",
                        "10|BLUE COLLAR(LABORER)": "BLUE COLLAR(LABORER)",
                        "2|BANKERS": "BANKERS",
                        "4|BUILDERS": "BUILDERS",
                        "18|CIRCUS PERSONNEL": "CIRCUS PERSONNEL",
                        "5|CONTRACTORS": "CONTRACTORS",
                        "101|ENGINEER": "ENGINEER",
                        "21|ENGINEER NON CONSULTING": "ENGINEER NON CONSULTING",
                        "15|EXPLOSIVES": "EXPLOSIVES",
                        "20|HIGH TENSION ELECTRICAL INSTALLER": "HIGH TENSION ELECTRICAL INSTALLER",
                        "24|INDUSTRIALIST": "INDUSTRIALIST",
                        "17|JOCKEYS": "JOCKEYS",
                        "131|LAWYER": "LAWYER",
                        "9|MACHINE OPERATORS": "MACHINE OPERATORS",
                        "8|MOTOR MECHANICS": "MOTOR MECHANICS",
                        "23|OTHER": "OTHER",
                        "22|PAID DRIVER (NON-CASH CARRYING EMP.)": "PAID DRIVER (NON-CASH CARRYING EMP.)",
                        "111|PHYSICIAN": "PHYSICIAN",
                        "11|PROF. ATHELES AND SPORTSMEN": "PROF. ATHELES AND SPORTSMEN",
                        "994|PROFESSIONAL": "PROFESSIONAL",
                        "137|PUBLIC RELATIONS": "PUBLIC RELATIONS",
                        "19|RACING": "RACING",
                        "125|SELF-EMPLOYED": "SELF-EMPLOYED",
                        "3|SERVICE": "SERVICE",
                        "134|SOCIAL SERVICE": "SOCIAL SERVICE",
                        "126|SYSTEMS ANALYST": "SYSTEMS ANALYST",
                        "138|TEACHER": "TEACHER",
                        "14|UNDERGROUND MINES WORKER": "UNDERGROUND MINES WORKER",
                        "12|UNEMPLOYED": "UNEMPLOYED",
                        "6|VETERINARY DOCTORS": "VETERINARY DOCTORS",
                        "13|WOOD WORKING MACHINISTS": "WOOD WORKING MACHINISTS"
                    }
                }
            }
        ],
        "spouse": [
            {
                "type": "select",
                "name": "title",
                "width": "25%",
                "validate": {
                    "required": true
                },
                "additionalOptions": {
                    "label": "Title",
                    "options": {
                        "mrs": "Mrs"
                    }
                }
            },
            {
                "type": "text",
                "name": "name",
                "allow": "onlyAlphabets",
                "width": "75%",
                "validate": {
                    "required": true,
                    "matches": "name",
                    "length": [
                        6,
                        100
                    ]
                },
                "additionalOptions": {
                    "label": "Full Name",
                    "placeholder": "First Middle(Optional) Last",
                    "maxLength": 100
                }
            },
            {
                "type": "date",
                "name": "dob",
                "validate": {
                    "required": true,
                    "matches": "date",
                    "age": [
                        18,
                        45
                    ]
                },
                "additionalOptions": {
                    "label": "Date of Birth",
                    "placeholder": "DD-MM-YYYY",
                    "maxLength": 10
                },
                "allow": "dob"
            },
            {
                "type": "custom_height",
                "name": "height",
                "validate": {
                    "required": true
                }
            },
            {
                "type": "text",
                "name": "weight",
                "allow": "onlyNumbers",
                "validate": {
                    "required": true,
                    "matches": "validDigits/1/200"
                },
                "additionalOptions": {
                    "label": "Weight (KG)",
                    "placeholder": "Weight (KG)",
                    "maxLength": 3
                }
            },
            {
                "type": "select",
                "name": "occupation",
                "section": "Personal Details",
                "validate": {
                    "required": true
                },
                "additionalOptions": {
                    "label": "Occupation",
                    "options": {
                        "1|ACCOUNTANTS": "ACCOUNTANTS",
                        "102|ARCHITECT": "ARCHITECT",
                        "993|AUDITOR": "AUDITOR",
                        "10|BLUE COLLAR(LABORER)": "BLUE COLLAR(LABORER)",
                        "2|BANKERS": "BANKERS",
                        "4|BUILDERS": "BUILDERS",
                        "18|CIRCUS PERSONNEL": "CIRCUS PERSONNEL",
                        "5|CONTRACTORS": "CONTRACTORS",
                        "101|ENGINEER": "ENGINEER",
                        "21|ENGINEER NON CONSULTING": "ENGINEER NON CONSULTING",
                        "15|EXPLOSIVES": "EXPLOSIVES",
                        "20|HIGH TENSION ELECTRICAL INSTALLER": "HIGH TENSION ELECTRICAL INSTALLER",
                        "24|INDUSTRIALIST": "INDUSTRIALIST",
                        "17|JOCKEYS": "JOCKEYS",
                        "131|LAWYER": "LAWYER",
                        "9|MACHINE OPERATORS": "MACHINE OPERATORS",
                        "8|MOTOR MECHANICS": "MOTOR MECHANICS",
                        "23|OTHER": "OTHER",
                        "22|PAID DRIVER (NON-CASH CARRYING EMP.)": "PAID DRIVER (NON-CASH CARRYING EMP.)",
                        "111|PHYSICIAN": "PHYSICIAN",
                        "11|PROF. ATHELES AND SPORTSMEN": "PROF. ATHELES AND SPORTSMEN",
                        "994|PROFESSIONAL": "PROFESSIONAL",
                        "137|PUBLIC RELATIONS": "PUBLIC RELATIONS",
                        "19|RACING": "RACING",
                        "125|SELF-EMPLOYED": "SELF-EMPLOYED",
                        "3|SERVICE": "SERVICE",
                        "134|SOCIAL SERVICE": "SOCIAL SERVICE",
                        "126|SYSTEMS ANALYST": "SYSTEMS ANALYST",
                        "138|TEACHER": "TEACHER",
                        "14|UNDERGROUND MINES WORKER": "UNDERGROUND MINES WORKER",
                        "12|UNEMPLOYED": "UNEMPLOYED",
                        "6|VETERINARY DOCTORS": "VETERINARY DOCTORS",
                        "13|WOOD WORKING MACHINISTS": "WOOD WORKING MACHINISTS"
                    }
                }
            }
        ]
    },
    "Medical Details": {
        "10031257_self_spouse": [
            {
                "type": "custom_toggle",
                "name": "medicareind_medical_ques",
                "width": "100%",
                "validate": {
                    "selectAtLeastOne": true
                },
                "additionalOptions": {
                    "label": "Have you or any of the persons proposed for insurance, ever suffered from or taken treatment, or hospitalized for or have been recommended to take investigations / medication / surgery or undergone a surgery for the following medical conditions ?",
                    "notAllowed": true,
                    "validate": null,
                    "selectAtLeastOne": true,
                    "message": {
                        "npos_switch_medical_selection_message": "",
                        "stp_block_message": ""
                    },
                    "members": [
                        "self",
                        "spouse"
                    ]
                }
            },
            {
                "type": "custom_medical",
                "name": "medicareind_medical_ques_1",
                "width": "100%",
                "render": {
                    "when": "medicareind_medical_ques.ismedicareind_medical_ques",
                    "is": "Y"
                },
                "additionalOptions": {
                    "label": "Arthritis",
                    "message": {
                        "npos_switch_medical_selection_message": "",
                        "stp_block_message": ""
                    },
                    "members": [
                        "self",
                        "spouse"
                    ]
                }
            },
            {
                "type": "custom_medical",
                "name": "medicareind_medical_ques_2",
                "width": "100%",
                "render": {
                    "when": "medicareind_medical_ques.ismedicareind_medical_ques",
                    "is": "Y"
                },
                "additionalOptions": {
                    "label": "COPD",
                    "message": {
                        "npos_switch_medical_selection_message": "",
                        "stp_block_message": ""
                    },
                    "members": [
                        "self",
                        "spouse"
                    ]
                }
            },
            {
                "type": "custom_medical",
                "name": "medicareind_medical_ques_3",
                "width": "100%",
                "render": {
                    "when": "medicareind_medical_ques.ismedicareind_medical_ques",
                    "is": "Y"
                },
                "additionalOptions": {
                    "label": "Kidney Failure, Dialysis",
                    "message": {
                        "npos_switch_medical_selection_message": "",
                        "stp_block_message": ""
                    },
                    "members": [
                        "self",
                        "spouse"
                    ]
                }
            },
            {
                "type": "custom_medical",
                "name": "medicareind_medical_ques_4",
                "width": "100%",
                "render": {
                    "when": "medicareind_medical_ques.ismedicareind_medical_ques",
                    "is": "Y"
                },
                "additionalOptions": {
                    "label": "Liver Cirrhosis/Hepatitis B or C",
                    "additionalQuestions": [],
                    "message": {
                        "npos_switch_medical_selection_message": "",
                        "stp_block_message": ""
                    },
                    "members": [
                        "self",
                        "spouse"
                    ]
                }
            },
            {
                "type": "custom_medical",
                "name": "medicareind_medical_ques_5",
                "width": "100%",
                "render": {
                    "when": "medicareind_medical_ques.ismedicareind_medical_ques",
                    "is": "Y"
                },
                "additionalOptions": {
                    "label": "Cancer",
                    "additionalQuestions": [],
                    "message": {
                        "npos_switch_medical_selection_message": "",
                        "stp_block_message": ""
                    },
                    "members": [
                        "self",
                        "spouse"
                    ]
                }
            },
            {
                "type": "custom_medical",
                "name": "medicareind_medical_ques_6",
                "width": "100%",
                "render": {
                    "when": "medicareind_medical_ques.ismedicareind_medical_ques",
                    "is": "Y"
                },
                "additionalOptions": {
                    "label": "HIV/AIDs/STDs",
                    "additionalQuestions": [],
                    "message": {
                        "npos_switch_medical_selection_message": "",
                        "stp_block_message": ""
                    },
                    "members": [
                        "self",
                        "spouse"
                    ]
                }
            },
            {
                "type": "custom_medical",
                "name": "medicareind_medical_ques_7",
                "width": "100%",
                "render": {
                    "when": "medicareind_medical_ques.ismedicareind_medical_ques",
                    "is": "Y"
                },
                "additionalOptions": {
                    "message": {
                        "npos_switch_medical_selection_message": "",
                        "stp_block_message": ""
                    },
                    "members": [
                        "self",
                        "spouse"
                    ]
                },
                "label": "Alcohol Intake",
                "additionalQuestions": []
            },
            [
                {
                    "type": "text",
                    "name": "medicareind_alcohol_Q1",
                    "parent": "medicareind_medical_ques_7",
                    "render": {
                        "when": "medicareind_medical_ques.ismedicareind_medical_ques",
                        "is": "Y"
                    },
                  
                    "additionalOptions": {
                        "label": {
                            "medical_ques_7": {
                                "alcohol_Q1": {
                                    "Beer": "null/120",
                                    "Wine": "null/120",
                                    "Hard Liquor": "null/650"
                                }
                            }
                        },
                        "notAllowed": {
                            "medical_ques_7": {
                                "alcohol_Q1": {
                                    "Beer": "null/120",
                                    "Wine": "null/120",
                                    "Hard Liquor": "null/650"
                                }
                            }
                        },
                        "message": {
                            "npos_switch_medical_selection_message": "",
                            "stp_block_message": ""
                        },
                        "members": [
                            "self",
                            "spouse"
                        ]
                    },
                    "placeholder": "How many units of alcohol do you have in a week?",
                    "maxLength": 5,
                    "validate": {
                        "required": true
                    },
                    "allow": "onlyNumbers"
                }
            ],
            {
                "type": "custom_medical",
                "name": "medicareind_medical_ques_8",
                "width": "100%",
                "render": {
                    "when": "medicareind_medical_ques.ismedicareind_medical_ques",
                    "is": "Y"
                },
                "additionalOptions": {
                    "label": "Smoke Intakes",
                    "additionalQuestions": [],
                    "message": {
                        "npos_switch_medical_selection_message": "",
                        "stp_block_message": ""
                    },
                    "members": [
                        "self",
                        "spouse"
                    ]
                }
            },
            {
                "type": "custom_medical",
                "name": "medicareind_medical_ques_9",
                "width": "100%",
                "render": {
                    "when": "medicareind_medical_ques.ismedicareind_medical_ques",
                    "is": "Y"
                },
                "additionalOptions": {
                    "label": "Ulcerative Colitis/Crohn’s disease",
                    "additionalQuestions": [],
                    "message": {
                        "npos_switch_medical_selection_message": "",
                        "stp_block_message": ""
                    },
                    "members": [
                        "self",
                        "spouse"
                    ]
                }
            },
            {
                "type": "custom_medical",
                "name": "medicareind_medical_ques_10",
                "width": "100%",
                "render": {
                    "when": "medicareind_medical_ques.ismedicareind_medical_ques",
                    "is": "Y"
                },
                "additionalOptions": {
                    "label": "Auto-immune diseases",
                    "additionalQuestions": [],
                    "message": {
                        "npos_switch_medical_selection_message": "",
                        "stp_block_message": ""
                    },
                    "members": [
                        "self",
                        "spouse"
                    ]
                }
            },
            {
                "type": "custom_toggle",
                "name": "medicareind_medical_ques_11",
                "width": "100%",
                "additionalOptions": {
                    "label": "Any other illness/disease/injury/disability in the past other than for childbirth, flu or for minor injuries that have completely healed?",
                    "notAllowed": true,
                    "message": {
                        "npos_switch_medical_selection_message": "",
                        "stp_block_message": ""
                    },
                    "members": [
                        "self",
                        "spouse"
                    ]
                },
                "validate": null,
                "selectAtLeastOne": true
            },
            {
                "type": "custom_toggle",
                "name": "medicareind_medical_ques_12",
                "width": "100%",
                "additionalOptions": {
                    "label": "Are you or any persons proposed on regular medication (including any Ayurvedic treatment) or awaiting any procedure/treatment?",
                    "notAllowed": true,
                    "message": {
                        "npos_switch_medical_selection_message": "",
                        "stp_block_message": ""
                    },
                    "members": [
                        "self",
                        "spouse"
                    ]
                },
                "validate": null,
                "selectAtLeastOne": true
            },
            {
                "type": "custom_toggle",
                "name": "medicareind_medical_ques_13",
                "width": "100%",
                "additionalOptions": {
                    "label": "Have you ever been diagnosed with any of these medical conditions with or without any follow-up tests/medications? – Elevated Blood Sugar/ Diabetes/ Elevated Blood Pressure/ Hypertension/ High Cholesterol/ Hypothyroidism",
                    "notAllowed": true,
                    "message": {
                        "npos_switch_medical_selection_message": "",
                        "stp_block_message": ""
                    },
                    "members": [
                        "self",
                        "spouse"
                    ]
                },
                "validate": null,
                "selectAtLeastOne": true
            },
            {
                "type": "custom_toggle",
                "name": "medicareind_medical_ques_14",
                "width": "100%",
                "additionalOptions": {
                    "label": "Is any of the insured pregnant currently?",
                    "notAllowed": true,
                    "message": {
                        "npos_switch_medical_selection_message": "",
                        "stp_block_message": ""
                    },
                    "members": [
                        "self",
                        "spouse"
                    ]
                },
                "validate": null,
                "selectAtLeastOne": true
            },
            {
                "type": "custom_toggle",
                "name": "medicareind_medical_ques_15",
                "width": "100%",
                "additionalOptions": {
                    "label": " Has any application for life, Health or critical illness insurance ever been declined, postponed, loaded or been made subject to any special conditions by any insurance company?",
                    "notAllowed": true,
                    "message": {
                        "npos_switch_medical_selection_message": "",
                        "stp_block_message": ""
                    },
                    "members": [
                        "self",
                        "spouse"
                    ]
                },
                "validate": null,
                "selectAtLeastOne": true
            },
            {
                "type": "custom_toggle",
                "name": "medicareind_medical_ques_16",
                "width": "100%",
                "additionalOptions": {
                    "label": "Has any health or life insurance policy ever been terminated in the past?",
                    "notAllowed": true,
                    "message": {
                        "npos_switch_medical_selection_message": "",
                        "stp_block_message": ""
                    },
                    "members": [
                        "self",
                        "spouse"
                    ]
                },
                "validate": {
                    "selectAtLeastOne": true
                }
            },
            {
                "type": "custom_medical",
                "name": "medicareind_medical_ques_17",
                "width": "100%",
                "additionalOptions": {
                    "label": "Alcohol Consumption in ml/day?",
                    "message": {
                        "npos_switch_medical_selection_message": "",
                        "stp_block_message": ""
                    },
                    "members": [
                        "self",
                        "spouse"
                    ]
                },
                "validate": null,
                "selectAtLeastOne": true
            },
            [
                {
                    "type": "text",
                    "name": "medicareind_medical_ques_17_Q1",
                    "parent": "medicareind_medical_ques_17",
                    "render": {
                        "when": "",
                        "is": true
                    },
                    "visibleOn": {
                        "medicareind_medical_ques_17":{
"medicareind_medical_ques_17_alcohol_types":"Beer | Wine | Hard Liquor"
                        }
                    },
                    "additionalOptions": {
                        // "notAllowed": "null/180",
                        "notAllowed": {
                            "medicareind_medical_ques_17":{
                                "medicareind_medical_ques_17_alcohol_types":{
                                    "Beer":"null/120",
                                    "Wine":"null/650", 
                                    "Hard Liquor":"null/180"
                                }
                                                        }
                        },
                        "label": {
                            "medicareind_medical_ques_17":{
                                "medicareind_medical_ques_17_alcohol_types":{
                                    "Beer":"120 ml/day",
                                    "Wine":"650 ml/day", 
                                    "Hard Liquor":"180 ml/day"
                                }
                                                        }
                        },
                        "message": {
                            "npos_switch_medical_selection_message": "",
                            "stp_block_message": ""
                        },
                        "members": [
                            "self",
                            "spouse"
                        ]
                    },
                    "validate": {
                        "required": true
                    },
                    "allow": "onlyNumbers"
                },
                {
                    "type": "select",
                    "parent": "medicareind_medical_ques_17",
                    "render": {
                        "when": "",
                        "is": true
                    },
                    "width": "100%",
                    "name": "medicareind_medical_ques_17_alcohol_types",
                    "additionalOptions": {
                        "placeholder": "Type of Drinks",
                        "options": {
                            "Beer": "Beer",
                            "Wine": "Wine",
                            "Hard Liquor": "Hard Liquor"
                        },
                        "message": {
                            "npos_switch_medical_selection_message": "",
                            "stp_block_message": ""
                        },
                        "members": [
                            "self",
                            "spouse"
                        ]
                    },
                    "validate": {
                        "required": true
                    }
                }
            ],
            {
                "type": "custom_medical",
                "name": "medicareind_medical_ques_18",
                "width": "100%",
                "additionalOptions": {
                    "label": "Tobacco Consumption in gm/day?",
                    "message": {
                        "npos_switch_medical_selection_message": "",
                        "stp_block_message": ""
                    },
                    "members": [
                        "self",
                        "spouse"
                    ]
                },
                "validate": null,
                "selectAtLeastOne": true
            },
            [
                {
                    "type": "text",
                    "name": "medicareind_medical_ques_18_Q1",
                    "parent": "medicareind_medical_ques_18",
                    "render": {
                        "when": "",
                        "is": true
                    },
                    "additionalOptions": {
                        "notAllowed": "null/35",
                        "message": {
                            "npos_switch_medical_selection_message": "",
                            "stp_block_message": ""
                        },
                        "members": [
                            "self",
                            "spouse"
                        ]
                    },
                    "validate": {
                        "required": true
                    },
                    "allow": "onlyNumbers"
                }
            ],
            {
                "type": "custom_medical",
                "name": "medicareind_medical_ques_19",
                "width": "100%",
                "additionalOptions": {
                    "label": "Cigarette Consumption in unit/day?",
                    "message": {
                        "npos_switch_medical_selection_message": "",
                        "stp_block_message": ""
                    },
                    "members": [
                        "self",
                        "spouse"
                    ]
                },
                "validate": null,
                "selectAtLeastOne": true
            },
            [
                {
                    "type": "text",
                    "name": "medicareind_medical_ques_19_Q1",
                    "parent": "medicareind_medical_ques_19",
                    "render": {
                        "when": "",
                        "is": true
                    },
                    "additionalOptions": {
                        "notAllowed": "null/10",
                        "message": {
                            "npos_switch_medical_selection_message": "",
                            "stp_block_message": ""
                        },
                        "members": [
                            "self",
                            "spouse"
                        ]
                    },
                    "validate": {
                        "required": true
                    },
                    "allow": "onlyNumbers"
                }
            ]
        ]
    },
    "Other Details": {
        "10031257_self_spouse": [
            {
                "type": "select",
                "name": "nominee_relation",
                "validate": {
                    "required": true
                },
                "additionalOptions": {
                    "label": "Nominee's Relation with Proposer",
                    "options": {
                        "brother": "Brother",
                        "daughter": "Daughter",
                        "father": "Father",
                        "mother": "Mother",
                        "sister": "Sister",
                        "son": "Son",
                        "spouse": "Wife"
                    }
                }
            },
            {
                "type": "text",
                "name": "nominee_name",
                "allow": "onlyAlphabets",
                "validate": {
                    "required": true,
                    "matches": "name",
                    "length": [
                        6,
                        100
                    ]
                },
                "additionalOptions": {
                    "label": "Nominee Name",
                    "placeholder": "Nominee's Name",
                    "maxLength": 100
                }
            },
            {
                "type": "text",
                "name": "nominee_contact",
                "allow": "onlyNumbers",
                "validate": {
                    "matches": "mobile"
                },
                "additionalOptions": {
                    "label": "Nominee Contact No",
                    "placeholder": "Nominee Contact No",
                    "maxLength": 10
                }
            },
            {
                "type": "date",
                "name": "nominee_dob",
                "validate": {
                    "required": true,
                    "matches": "date",
                    "age": [
                        18,
                        100
                    ]
                },
                "additionalOptions": {
                    "label": "Nominee Date of Birth",
                    "placeholder": "DD-MM-YYYY",
                    "maxLength": 10
                },
                "allow": "dob"
            }
        ]
    }
}
export default dummy;