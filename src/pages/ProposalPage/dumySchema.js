const dummy = {
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
                    55
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
            "type": "text",
            "name": "annIncome",
            "section": "Personal Details",
            "validate": {
                "required": true,
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
            "allow": "noSpecial",
            "additionalOptions": {
                "label": "PAN Number",
                "placeholder": "PAN Number",
                "textTransform": "uppercase",
                "maxLength": 10
            }
        },
        {
            "type": "text",
            "name": "aadhar_card",
            "section": "Personal Details",
            "allow": "onlyNumbers",
            "validate": {
                "matches": "aadhar"
            },
            "additionalOptions": {
                "maxLength": 12,
                "label": "Aadhar Number",
                "placeholder": "Aadhar Number"
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
            "name": "address_line_1_10026655",
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
            "name": "address_line_2_10026655",
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
            "name": "address_line_3_10026655",
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
            "name": "pincode_10026655",
            "section": "Address for self , spouse",
            "value": 110001,
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
                    "110001": 110001,
                    "110002": 110002,
                    "110003": 110003,
                    "110004": 110004,
                    "110005": 110005,
                    "110006": 110006,
                    "110007": 110007,
                    "110008": 110008,
                    "110009": 110009,
                    "110010": 110010,
                    "110011": 110011,
                    "110012": 110012,
                    "110013": 110013,
                    "110014": 110014,
                    "110015": 110015,
                    "110016": 110016,
                    "110017": 110017,
                    "110018": 110018,
                    "110019": 110019,
                    "110020": 110020,
                    "110021": 110021,
                    "110022": 110022,
                    "110023": 110023,
                    "110024": 110024,
                    "110025": 110025,
                    "110026": 110026,
                    "110027": 110027,
                    "110028": 110028,
                    "110029": 110029,
                    "110030": 110030,
                    "110031": 110031,
                    "110032": 110032,
                    "110033": 110033,
                    "110034": 110034,
                    "110035": 110035,
                    "110036": 110036,
                    "110037": 110037,
                    "110038": 110038,
                    "110039": 110039,
                    "110040": 110040,
                    "110041": 110041,
                    "110042": 110042,
                    "110043": 110043,
                    "110044": 110044,
                    "110045": 110045,
                    "110046": 110046,
                    "110047": 110047,
                    "110048": 110048,
                    "110049": 110049,
                    "110051": 110051,
                    "110052": 110052,
                    "110053": 110053,
                    "110054": 110054,
                    "110055": 110055,
                    "110056": 110056,
                    "110057": 110057,
                    "110058": 110058,
                    "110059": 110059,
                    "110060": 110060,
                    "110061": 110061,
                    "110062": 110062,
                    "110063": 110063,
                    "110064": 110064,
                    "110065": 110065,
                    "110066": 110066,
                    "110067": 110067,
                    "110068": 110068,
                    "110069": 110069,
                    "110070": 110070,
                    "110071": 110071,
                    "110072": 110072,
                    "110073": 110073,
                    "110074": 110074,
                    "110075": 110075,
                    "110076": 110076,
                    "110077": 110077,
                    "110078": 110078,
                    "110080": 110080,
                    "110081": 110081,
                    "110082": 110082,
                    "110083": 110083,
                    "110084": 110084,
                    "110085": 110085,
                    "110086": 110086,
                    "110087": 110087,
                    "110088": 110088,
                    "110089": 110089,
                    "110091": 110091,
                    "110092": 110092,
                    "110093": 110093,
                    "110094": 110094,
                    "110095": 110095,
                    "110096": 110096
                }
            }
        },
        {
            "type": "text",
            "name": "city_10026655",
            "section": "Address for self , spouse",
            "value": "Delhi",
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
            "name": "state_10026655",
            "section": "Address for self , spouse",
            "value": "Delhi",
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
                    "readOnly": true,
                   
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
                        55
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
                "validate": {
                    "required": true
                },
                "additionalOptions": {
                    "label": "Occupation",
                    "options": {
                        "1": "Doctors",
                        "2": "Lawyers",
                        "3": "Accountants",
                        "4": "Architects",
                        "5": "Consulting engineers",
                        "6": "Teachers",
                        "7": "Administrative Functions and persons primarily engaged in occupation of similar Hazard",
                        "8": "Bankers Persons engaged in clerical function",
                        "9": "Bureaucrats",
                        "10": "Student",
                        "11": "Housewife",
                        "12": "Shopkeeper",
                        "13": "Writer",
                        "14": "Fashion Designer",
                        "15": "Desk job",
                        "16": "Salaried"
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
                        55
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
                "validate": {
                    "required": true
                },
                "additionalOptions": {
                    "label": "Occupation",
                    "options": {
                        "1": "Doctors",
                        "2": "Lawyers",
                        "3": "Accountants",
                        "4": "Architects",
                        "5": "Consulting engineers",
                        "6": "Teachers",
                        "7": "Administrative Functions and persons primarily engaged in occupation of similar Hazard",
                        "8": "Bankers Persons engaged in clerical function",
                        "9": "Bureaucrats",
                        "10": "Student",
                        "11": "Housewife",
                        "12": "Shopkeeper",
                        "13": "Writer",
                        "14": "Fashion Designer",
                        "15": "Desk job",
                        "16": "Salaried"
                    }
                }
            }
        ]
    },
    "Medical Details": {
        "10026655_self_spouse": [
            {
                "type": "custom_medical",
                "name": "complete_health_essential_medical_ques_Q1",
                "width": "100%",
                "additionalOptions": {
                    "notAllowed": "N",
                    "label": "Blood Sugar Level [Normal Range  70mg to 99mg]",
                    "members": [
                        "self",
                        "spouse"
                    ],
                    "disable_Toggle":true
                },
                "validate": {
                    "required": true
                }
            },
            [
                {
                    "type": "text",
                    "name": "complete_health_essential_medical_ques_1",
                    "parent": "complete_health_essential_medical_ques_Q1",
                    "render": "noDependency",
                    "additionalOptions": {
                        "maxLength": 3,
                        "notAllowed": "70/99",
                        "members": [
                            "self",
                            "spouse"
                        ],
                        
                    },
                    "allow": "onlyNumbers",
                    "validate": {
                        "required": true
                    }
                }
            ],
            {
                "type": "custom_medical",
                "name": "complete_health_essential_medical_ques_Q2",
                "width": "100%",
                "additionalOptions": {
                    "label": "Blood Pressure (Systolic) [Normal Range  90 to 129]",
                    "notAllowed": "N",
                    "members": [
                        "self",
                        "spouse"
                    ]
                },
                "validate": {
                    "required": true
                }
            },
            [
                {
                    "type": "text",
                    "name": "complete_health_essential_medical_ques_2",
                    "parent": "complete_health_essential_medical_ques_Q2",
                    "render": {
                        "when": "",
                        "is": true
                    },
                    "additionalOptions": {
                        "maxLength": 3,
                        "notAllowed": "90/129",
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
                "name": "complete_health_essential_medical_ques_Q3",
                "width": "100%",
                "additionalOptions": {
                    "label": "Blood Pressure (Diastolic) [Normal Range  60 to 79]",
                    "notAllowed": "N",
                    "members": [
                        "self",
                        "spouse"
                    ]
                },
                "validate": {
                    "required": true
                }
            },
            [
                {
                    "type": "text",
                    "name": "complete_health_essential_medical_ques_3",
                    "parent": "complete_health_essential_medical_ques_Q3",
                    "render": {
                        "when": "",
                        "is": true
                    },
                    "additionalOptions": {
                        "maxLength": 2,
                        "notAllowed": "60/79",
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
                "name": "complete_health_essential_medical_ques_Q4",
                "width": "100%",
                "additionalOptions": {
                    "label": "Cholesterol Level [Normal Range  150 to 199]",
                    "notAllowed": "N",
                    "members": [
                        "self",
                        "spouse"
                    ]
                },
                "validate": {
                    "required": true
                }
            },
            [
                {
                    "type": "text",
                    "name": "complete_health_essential_medical_ques_4",
                    "parent": "complete_health_essential_medical_ques_Q4",
                    "render": {
                        "when": "",
                        "is": true
                    },
                    "additionalOptions": {
                        "maxLength": 3,
                        "notAllowed": "150/199",
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
                "name": "complete_health_essential_medical_ques_Q5",
                "width": "100%",
                "additionalOptions": {
                    "label": "Body Mass Index [Normal Range  18.5 to 24.9]",
                    "notAllowed": "N",
                    "members": [
                        "self",
                        "spouse"
                    ]
                },
                "validate": {
                    "selectAtLeastOne": true
                }
            },
            [
                {
                    "type": "text",
                    "name": "complete_health_essential_medical_ques_5",
                    "parent": "complete_health_essential_medical_ques_Q5",
                    "render": {
                        "when": "",
                        "is": true
                    },
                    "additionalOptions": {
                        "maxLength": 4,
                        "notAllowed": "18/25",
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
                "name": "complete_health_essential_medical_ques_Q6",
                "width": "100%",
                "additionalOptions": {
                    "label": "Tobacco Consumption in gm/day?",
                    "members": [
                        "self",
                        "spouse"
                    ]
                },
                "validate": {
                    "selectAtLeastOne": true
                }
            },
            [
                {
                    "type": "text",
                    "name": "complete_health_essential_medical_ques_6",
                    "parent": "complete_health_essential_medical_ques_Q6",
                    "render": {
                        "when": "",
                        "is": true
                    },
                    "additionalOptions": {
                        "notAllowed": "null/35",
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
                "name": "complete_health_essential_medical_ques_Q7",
                "width": "100%",
                "additionalOptions": {
                    "label": "Alcohol Consumption in ml/day?",
                    "notAllowed": true,
                    "members": [
                        "self",
                        "spouse"
                    ]
                },
                "validate": {
                    "selectAtLeastOne": true
                }
            },
            [
                {
                    "type": "text",
                    "name": "complete_health_essential_medical_ques_7",
                    "parent": "complete_health_essential_medical_ques_Q7",
                    "render": {
                        "when": "",
                        "is": true
                    },
                    "additionalOptions": {
                        "notAllowed": "null/180",
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
                "type": "custom_toggle",
                "name": "complete_health_essential_medical_ques_Q8",
                "width": "100%",
                "additionalOptions": {
                    "label": "Please Specify Treatment only in tiered hospitals",
                    "notAllowed": true,
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
                "type": "custom_toggle",
                "name": "complete_health_essential_medical_ques_Q9",
                "width": "100%",
                "additionalOptions": {
                    "label": "Are you having a group health insurance?",
                    "notAllowed": true,
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
                "type": "custom_toggle",
                "name": "complete_health_essential_medical_ques_Q10",
                "width": "100%",
                "additionalOptions": {
                    "label": "Cancer",
                    "notAllowed": true,
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
                "type": "custom_toggle",
                "name": "complete_health_essential_medical_ques_Q11",
                "width": "100%",
                "additionalOptions": {
                    "label": "HIV or AIDS related disease",
                    "notAllowed": true,
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
                "type": "custom_toggle",
                "name": "complete_health_essential_medical_ques_Q12",
                "width": "100%",
                "additionalOptions": {
                    "label": "Lupus",
                    "notAllowed": true,
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
                "type": "custom_toggle",
                "name": "complete_health_essential_medical_ques_Q13",
                "width": "100%",
                "additionalOptions": {
                    "label": "Stroke with permanent paralysis",
                    "notAllowed": true,
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
                "type": "custom_toggle",
                "name": "complete_health_essential_medical_ques_Q14",
                "width": "100%",
                "additionalOptions": {
                    "label": "Transient Ischemic Attack",
                    "notAllowed": true,
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
                "type": "custom_toggle",
                "name": "complete_health_essential_medical_ques_Q15",
                "width": "100%",
                "additionalOptions": {
                    "label": "Liver failure",
                    "notAllowed": true,
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
                "type": "custom_toggle",
                "name": "complete_health_essential_medical_ques_Q16",
                "width": "100%",
                "additionalOptions": {
                    "label": "Kidney failure",
                    "notAllowed": true,
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
                "type": "custom_toggle",
                "name": "complete_health_essential_medical_ques_Q17",
                "width": "100%",
                "additionalOptions": {
                    "label": "Coronary bypass surgery / Cardiac Failure or Any heart diseases",
                    "notAllowed": true,
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
                "type": "custom_toggle",
                "name": "complete_health_essential_medical_ques_Q18",
                "width": "100%",
                "additionalOptions": {
                    "label": "Motor Neuron diseases",
                    "notAllowed": true,
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
                "type": "custom_toggle",
                "name": "complete_health_essential_medical_ques_Q19",
                "width": "100%",
                "additionalOptions": {
                    "label": "Does any of the insured has any pre-existing disease?",
                    "notAllowed": true,
                    "members": [
                        "self",
                        "spouse"
                    ]
                },
                "validate": {
                    "selectAtLeastOne": true
                }
            },
            [
                {
                    "type": "text",
                    "name": "complete_health_essential_medical_ques_19",
                    "parent": "complete_health_essential_medical_ques_Q19",
                    "render": {
                        "when": "",
                        "is": true
                    },
                    "additionalOptions": {
                        "label": "Alzheimer’s disease",
                        "notAllowed": true,
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
                    "type": "text",
                    "name": "complete_health_essential_medical_ques_20",
                    "parent": "complete_health_essential_medical_ques_Q19",
                    "render": {
                        "when": "",
                        "is": true
                    },
                    "additionalOptions": {
                        "label": "Huntington’s Chorea",
                        "notAllowed": true,
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
                    "type": "text",
                    "name": "complete_health_essential_medical_ques_21",
                    "parent": "complete_health_essential_medical_ques_Q19",
                    "render": {
                        "when": "",
                        "is": true
                    },
                    "additionalOptions": {
                        "label": "Parkinson diseases",
                        "notAllowed": true,
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
                    "type": "text",
                    "name": "complete_health_essential_medical_ques_22",
                    "parent": "complete_health_essential_medical_ques_Q19",
                    "render": {
                        "when": "",
                        "is": true
                    },
                    "additionalOptions": {
                        "label": "Multiple Sclerosis",
                        "notAllowed": true,
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
                    "type": "text",
                    "name": "complete_health_essential_medical_ques_23",
                    "parent": "complete_health_essential_medical_ques_Q19",
                    "render": {
                        "when": "",
                        "is": true
                    },
                    "additionalOptions": {
                        "label": "Schizophrenia",
                        "notAllowed": true,
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
                    "type": "text",
                    "name": "complete_health_essential_medical_ques_23",
                    "parent": "complete_health_essential_medical_ques_Q19",
                    "render": {
                        "when": "",
                        "is": true
                    },
                    "additionalOptions": {
                        "label": "Lou Gehrig’s disease (ALS)",
                        "notAllowed": true,
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
                    "type": "text",
                    "name": "complete_health_essential_medical_ques_24",
                    "parent": "complete_health_essential_medical_ques_Q19",
                    "render": {
                        "when": "",
                        "is": true
                    },
                    "additionalOptions": {
                        "label": "Arthritis- Rheumatoid / Osteoarthritis",
                        "notAllowed": true,
                        "members": [
                            "self",
                            "spouse"
                        ]
                    },
                    "validate": {
                        "selectAtLeastOne": true
                    }
                }
            ],
            {
                "type": "custom_toggle",
                "name": "complete_health_essential_medical_ques_25",
                "render": {
                    "when": "",
                    "is": true
                },
                "additionalOptions": {
                    "label": "Any Other Diseases",
                    "notAllowed": true,
                    "additionalOptions": [
                        {
                            "type": "text",
                            "placeholder": "MM-YYYY",
                            "maxLength": 10
                        },
                        {
                            "type": "text",
                            "placeholder": "Description",
                            "allow": "Description"
                        }
                    ],
                    "members": [
                        "self",
                        "spouse"
                    ]
                },
                "validate": {
                    "selectAtLeastOne": true
                }
            }
        ]
    },
    "Other Details": {
        "10026655_self_spouse": [
            {
                "type": "select",
                "name": "nominee_relation",
                "validate": {
                    "required": true
                },
                "additionalOptions": {
                    "label": "Nominee's Relation with Proposer",
                    "placeholder": "Nominee's Relation with Proposer",
                    "options": {
                        "brother": "Brother",
                        "daughter": "Daughter",
                        "daughter_in_law": "Daughter-In-Law",
                        "father": "Father",
                        "father_in_law": "Father-In-Law",
                        "grand_daughter": "Grand daughter",
                        "grand_father": "Grand Father",
                        "grand_mother": "Grand Mother",
                        "grand_son": "Grand Son",
                        "legal_hire": "Legal Heir",
                        "mother": "Mother",
                        "mother_in_law": "Mother-In-Law",
                        "sister": "Sister",
                        "son": "Son",
                        "son_in_law": "Son-In-Law",
                        "spouse": "Spouse"
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
            },
            {
                "type": "text",
                "name": "nominee_address_line_1",
                "validate": {
                    "required": true,
                    "matches": "address"
                },
                "additionalOptions": {
                    "label": "Nominee Address Line 1",
                    "placeholder": "Nominee Address Line 1"
                }
            },
            {
                "type": "text",
                "name": "nominee_address_line_2",
                "validate": {
                    "required": true,
                    "matches": "address"
                },
                "additionalOptions": {
                    "label": "Nominee Address Line 2",
                    "placeholder": "Nominee Address Line 2"
                }
            },
            {
                "type": "text",
                "name": "nominee_address_line_3",
                "validate": {
                    "matches": "address"
                },
                "additionalOptions": {
                    "label": "Nominee Address Line 3",
                    "placeholder": "Nominee Address Line 3"
                }
            },
            {
                "type": "text",
                "name": "pincode",
                "validate": {
                    "required": true,
                    "matches": "pincode"
                },
                "additionalOptions": {
                    "label": "Pincode",
                    "placeholder": "Pincode",
                    "maxLength": 6
                },
                "allow": "onlyNumbers"
            }
        ]
    }
}

export default dummy;