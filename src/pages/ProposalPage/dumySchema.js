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
                    99
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
            "type": "select",
            "name": "nationality",
            "section": "Personal Details",
            "validate": {
                "required": true
            },
            "additionalOptions": {
                "label": "Nationality",
                "options": {
                    "Indian": "Indian",
                    "NRI": "NRI",
                    "Others": "Others"
                }
            }
        },
        {
            "type": "text",
            "name": "EIA_number",
            "section": "Personal Details",
            "allow": "onlyNumbers",
            "additionalOptions": {
                "placeholder": "EIA Number",
                "label": "EIA Number",
                "maxLength": 13
            },
            "validate": {
                "matches": "onlyDigits"
            }
        },
        {
            "type": "select",
            "name": "IR_name",
            "section": "Personal Details",
            "additionalOptions": {
                "label": "IR Name",
                "options": {
                    "NSDL": "NSDL",
                    "Karvy": "Karvy",
                    "CAMS": "CAMS",
                    "CIRL": "CIRL"
                }
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
            "name": "Address",
            "section": "Address",
            "width": "100%",
            "additionalOptions": []
        },
        {
            "type": "text",
            "name": "address_line_1",
            "section": "Address",
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
            "name": "address_line_2",
            "section": "Address",
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
            "name": "address_line_3",
            "section": "Address",
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
            "name": "pincode",
            "section": "Address",
            "value": 122001,
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
                    "122001": 122001,
                    "122002": 122002,
                    "122003": 122003,
                    "122004": 122004,
                    "122005": 122005,
                    "122006": 122006,
                    "122007": 122007,
                    "122008": 122008,
                    "122009": 122009,
                    "122010": 122010,
                    "122011": 122011,
                    "122015": 122015,
                    "122016": 122016,
                    "122017": 122017,
                    "122018": 122018,
                    "122051": 122051,
                    "122052": 122052,
                    "122101": 122101,
                    "122102": 122102,
                    "122103": 122103,
                    "122104": 122104,
                    "122105": 122105,
                    "122107": 122107,
                    "122108": 122108,
                    "122413": 122413,
                    "122414": 122414,
                    "122502": 122502,
                    "122503": 122503,
                    "122504": 122504,
                    "122505": 122505,
                    "122508": 122508,
                    "123106": 123106
                }
            }
        },
        {
            "type": "text",
            "name": "city",
            "section": "Address",
            "value": "Gurgaon",
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
            "name": "state",
            "section": "Address",
            "value": "Haryana",
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
                        21,
                        99
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
                "name": "qualification",
                "validate": {
                    "required": true
                },
                "additionalOptions": {
                    "label": "Qualification",
                    "options": {
                        "Graduate": "Graduate",
                        "Matric": "Matric",
                        "Non-Matric": "Non-Matric",
                        "Professional Course": "Professional Course",
                        "Post-Graduate": "Post-Graduate"
                    }
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
                        "Salaried": "Salaried",
                        "Self employed": "Self employed",
                        "Student": "Student",
                        "House wife": "House wife",
                        "Others": "Others",
                        "agricultural labourers": "agricultural labourers",
                        "bidi workers": "bidi workers",
                        "brick kiln workers": "brick kiln workers",
                        "carpenters": "carpenters",
                        "cobblers": "cobblers",
                        "construction workers": "construction workers",
                        "fishermen": "fishermen",
                        "hamals": "hamals",
                        "handicraft artisans": "handicraft artisans",
                        "handloom and khadi workers": "handloom and khadi workers",
                        "lady tailors": "lady tailors",
                        "leather and tannery workers": "leather and tannery workers",
                        "papad makers": "papad makers",
                        "powerloom workers": "powerloom workers",
                        "physically handicapped self-employed persons": "physically handicapped self-employed persons",
                        "primary milk producers": "primary milk producers",
                        "rickshaw pullers": "rickshaw pullers",
                        "safai karmacharis": "safai karmacharis",
                        "salt growers": "salt growers",
                        "seri culture workers": "seri culture workers",
                        "sugarcane cutters": "sugarcane cutters",
                        "tendu leaf collectors": "tendu leaf collectors",
                        "toddy tappers": "toddy tappers",
                        "vegetable vendors": "vegetable vendors",
                        "washerwomen": "washerwomen",
                        "working women in hills": "working women in hills",
                        "social sector": "social sector",
                        "HA - Type 1": "HA - Type 1",
                        "HA - Type 2": "HA - Type 2",
                        "HA - Type 3": "HA - Type 3",
                        "HA - Type 4": "HA - Type 4",
                        "HA - Type 5": "HA - Type 5",
                        "HA - Type 6": "HA - Type 6",
                        "HA - Type 7": "HA - Type 7",
                        "HA - Type 8": "HA - Type 8",
                        "HA - Type 9": "HA - Type 9",
                        "HA - Type 10": "HA - Type 10",
                        "HA - Type 11": "HA - Type 11",
                        "HA - Type 12": "HA - Type 12",
                        "Administrative, Clerical, Financial, Marketing (desk job)": "Administrative, Clerical, Financial, Marketing (desk job)",
                        "Teachers at various levels, Sales and Services - any designation": "Teachers at various levels, Sales and Services - any designation",
                        "Supervisors involved in work in underground mining, tunneling": "Supervisors involved in work in underground mining, tunneling",
                        "Supervisors involved in work in manufacturing, construction": "Supervisors involved in work in manufacturing, construction",
                        "Supervisors involved in work in dealing with heavy machines": "Supervisors involved in work in dealing with heavy machines",
                        "Supervisors involved in manufacturing with no heavy machiner": "Supervisors involved in manufacturing with no heavy machiner",
                        "Supervisors involved in manufacturing with no heavy machinery": "Supervisors involved in manufacturing with no heavy machinery",
                        "Workers involved in mining, construction\"": "Workers involved in mining, construction\"",
                        "Workers involved in mineral processing, any manufacturing work": "Workers involved in mineral processing, any manufacturing work",
                        "Workers involved in plant operation work in chemical plants": "Workers involved in plant operation work in chemical plants",
                        "Workers involved in plant operation work in rubber,textile plants": "Workers involved in plant operation work in rubber,textile plants",
                        "Technicians working in electrical and related occupation": "Technicians working in electrical and related occupation",
                        "Professionals, medical & laboratory technical staff": "Professionals, medical & laboratory technical staff",
                        "All other supportive staff under health and healthcare services": "All other supportive staff under health and healthcare services",
                        "Creative and performing artists of drama and cinema": "Creative and performing artists of drama and cinema",
                        "Authors, Journalists, linguists, Arts & media related designers": "Authors, Journalists, linguists, Arts & media related designers",
                        "Adventure sports, Instructors or related occupation": "Adventure sports, Instructors or related occupation",
                        "Acrobats, professional sportsmen, Jockey": "Acrobats, professional sportsmen, Jockey",
                        "Racing Drivers and circus professionals": "Racing Drivers and circus professionals",
                        "Home maker, Student and Research scholars": "Home maker, Student and Research scholars",
                        "Architects, Town planners and Interior designers": "Architects, Town planners and Interior designers",
                        "Employed in Hotel and Hospitality industry": "Employed in Hotel and Hospitality industry",
                        "Culinary and Food preparation occupation with machinery": "Culinary and Food preparation occupation with machinery",
                        "Workers involved in agriculture & live stock": "Workers involved in agriculture & live stock",
                        "Workers involved in wildlife, forestry & fisheries": "Workers involved in wildlife, forestry & fisheries",
                        "Gardeners & those involved in horticulture": "Gardeners & those involved in horticulture",
                        "Personal service workers Hair dressing & other jobs in saloons": "Personal service workers: Hair dressing & other jobs in saloons",
                        "Personal service workers beauty parlors": "Personal service workers: beauty parlors",
                        "Drivers of heavy trucks and vehicles (e.g. JCB)": "Drivers of heavy trucks and vehicles (e.g. JCB)",
                        "Drivers of commercial vehicles": "Drivers of commercial vehicles",
                        "Those involved in strenuous transportation related work": "Those involved in strenuous transportation related work",
                        "Drivers of light commercial vehicles such as Car,Motorbike,scooter": "Drivers of light commercial vehicles such as Car,Motorbike,scooter",
                        "Drivers of non commercial vehicles such as (domestic drivers)": "Drivers of non commercial vehicles such as (domestic drivers)",
                        "Aviation, Railways, Shipping crew & related workers": "Aviation, Railways, Shipping crew & related workers",
                        "Ground staff of airlines, railways or shipping": "Ground staff of airlines, railways or shipping",
                        "Armed forces, Police, State & Central reserve police, Homeguards": "Armed forces, Police, State & Central reserve police, Homeguards",
                        "Private Security Personnel": "Private Security Personnel",
                        "All self employed, businessmen in non-hazardous businesses": "All self employed, businessmen in non-hazardous businesses",
                        "All self employed, businessmen in hazardous businesses": "All self employed, businessmen in hazardous businesses",
                        "Engineers (mechanical, electrical, civil, aeronautical, textile)": "Engineers (mechanical, electrical, civil, aeronautical, textile)",
                        "Engineers (computer, IT, and software )": "Engineers (computer, IT, and software )",
                        "Politician": "Politician"
                    }
                }
            },
            {
                "type": "text",
                "name": "mobile",
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
                        21,
                        99
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
                "name": "qualification",
                "validate": {
                    "required": true
                },
                "additionalOptions": {
                    "label": "Qualification",
                    "options": {
                        "Graduate": "Graduate",
                        "Matric": "Matric",
                        "Non-Matric": "Non-Matric",
                        "Professional Course": "Professional Course",
                        "Post-Graduate": "Post-Graduate"
                    }
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
                        "Salaried": "Salaried",
                        "Self employed": "Self employed",
                        "Student": "Student",
                        "House wife": "House wife",
                        "Others": "Others",
                        "agricultural labourers": "agricultural labourers",
                        "bidi workers": "bidi workers",
                        "brick kiln workers": "brick kiln workers",
                        "carpenters": "carpenters",
                        "cobblers": "cobblers",
                        "construction workers": "construction workers",
                        "fishermen": "fishermen",
                        "hamals": "hamals",
                        "handicraft artisans": "handicraft artisans",
                        "handloom and khadi workers": "handloom and khadi workers",
                        "lady tailors": "lady tailors",
                        "leather and tannery workers": "leather and tannery workers",
                        "papad makers": "papad makers",
                        "powerloom workers": "powerloom workers",
                        "physically handicapped self-employed persons": "physically handicapped self-employed persons",
                        "primary milk producers": "primary milk producers",
                        "rickshaw pullers": "rickshaw pullers",
                        "safai karmacharis": "safai karmacharis",
                        "salt growers": "salt growers",
                        "seri culture workers": "seri culture workers",
                        "sugarcane cutters": "sugarcane cutters",
                        "tendu leaf collectors": "tendu leaf collectors",
                        "toddy tappers": "toddy tappers",
                        "vegetable vendors": "vegetable vendors",
                        "washerwomen": "washerwomen",
                        "working women in hills": "working women in hills",
                        "social sector": "social sector",
                        "HA - Type 1": "HA - Type 1",
                        "HA - Type 2": "HA - Type 2",
                        "HA - Type 3": "HA - Type 3",
                        "HA - Type 4": "HA - Type 4",
                        "HA - Type 5": "HA - Type 5",
                        "HA - Type 6": "HA - Type 6",
                        "HA - Type 7": "HA - Type 7",
                        "HA - Type 8": "HA - Type 8",
                        "HA - Type 9": "HA - Type 9",
                        "HA - Type 10": "HA - Type 10",
                        "HA - Type 11": "HA - Type 11",
                        "HA - Type 12": "HA - Type 12",
                        "Administrative, Clerical, Financial, Marketing (desk job)": "Administrative, Clerical, Financial, Marketing (desk job)",
                        "Teachers at various levels, Sales and Services - any designation": "Teachers at various levels, Sales and Services - any designation",
                        "Supervisors involved in work in underground mining, tunneling": "Supervisors involved in work in underground mining, tunneling",
                        "Supervisors involved in work in manufacturing, construction": "Supervisors involved in work in manufacturing, construction",
                        "Supervisors involved in work in dealing with heavy machines": "Supervisors involved in work in dealing with heavy machines",
                        "Supervisors involved in manufacturing with no heavy machiner": "Supervisors involved in manufacturing with no heavy machiner",
                        "Supervisors involved in manufacturing with no heavy machinery": "Supervisors involved in manufacturing with no heavy machinery",
                        "Workers involved in mining, construction\"": "Workers involved in mining, construction\"",
                        "Workers involved in mineral processing, any manufacturing work": "Workers involved in mineral processing, any manufacturing work",
                        "Workers involved in plant operation work in chemical plants": "Workers involved in plant operation work in chemical plants",
                        "Workers involved in plant operation work in rubber,textile plants": "Workers involved in plant operation work in rubber,textile plants",
                        "Technicians working in electrical and related occupation": "Technicians working in electrical and related occupation",
                        "Professionals, medical & laboratory technical staff": "Professionals, medical & laboratory technical staff",
                        "All other supportive staff under health and healthcare services": "All other supportive staff under health and healthcare services",
                        "Creative and performing artists of drama and cinema": "Creative and performing artists of drama and cinema",
                        "Authors, Journalists, linguists, Arts & media related designers": "Authors, Journalists, linguists, Arts & media related designers",
                        "Adventure sports, Instructors or related occupation": "Adventure sports, Instructors or related occupation",
                        "Acrobats, professional sportsmen, Jockey": "Acrobats, professional sportsmen, Jockey",
                        "Racing Drivers and circus professionals": "Racing Drivers and circus professionals",
                        "Home maker, Student and Research scholars": "Home maker, Student and Research scholars",
                        "Architects, Town planners and Interior designers": "Architects, Town planners and Interior designers",
                        "Employed in Hotel and Hospitality industry": "Employed in Hotel and Hospitality industry",
                        "Culinary and Food preparation occupation with machinery": "Culinary and Food preparation occupation with machinery",
                        "Workers involved in agriculture & live stock": "Workers involved in agriculture & live stock",
                        "Workers involved in wildlife, forestry & fisheries": "Workers involved in wildlife, forestry & fisheries",
                        "Gardeners & those involved in horticulture": "Gardeners & those involved in horticulture",
                        "Personal service workers Hair dressing & other jobs in saloons": "Personal service workers: Hair dressing & other jobs in saloons",
                        "Personal service workers beauty parlors": "Personal service workers: beauty parlors",
                        "Drivers of heavy trucks and vehicles (e.g. JCB)": "Drivers of heavy trucks and vehicles (e.g. JCB)",
                        "Drivers of commercial vehicles": "Drivers of commercial vehicles",
                        "Those involved in strenuous transportation related work": "Those involved in strenuous transportation related work",
                        "Drivers of light commercial vehicles such as Car,Motorbike,scooter": "Drivers of light commercial vehicles such as Car,Motorbike,scooter",
                        "Drivers of non commercial vehicles such as (domestic drivers)": "Drivers of non commercial vehicles such as (domestic drivers)",
                        "Aviation, Railways, Shipping crew & related workers": "Aviation, Railways, Shipping crew & related workers",
                        "Ground staff of airlines, railways or shipping": "Ground staff of airlines, railways or shipping",
                        "Armed forces, Police, State & Central reserve police, Homeguards": "Armed forces, Police, State & Central reserve police, Homeguards",
                        "Private Security Personnel": "Private Security Personnel",
                        "All self employed, businessmen in non-hazardous businesses": "All self employed, businessmen in non-hazardous businesses",
                        "All self employed, businessmen in hazardous businesses": "All self employed, businessmen in hazardous businesses",
                        "Engineers (mechanical, electrical, civil, aeronautical, textile)": "Engineers (mechanical, electrical, civil, aeronautical, textile)",
                        "Engineers (computer, IT, and software )": "Engineers (computer, IT, and software )",
                        "Politician": "Politician"
                    }
                }
            },
            {
                "type": "text",
                "name": "mobile",
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
            }
        ],
        "father_in_law": [
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
                        99
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
                "name": "qualification",
                "validate": {
                    "required": true
                },
                "additionalOptions": {
                    "label": "Qualification",
                    "options": {
                        "Graduate": "Graduate",
                        "Matric": "Matric",
                        "Non-Matric": "Non-Matric",
                        "Professional Course": "Professional Course",
                        "Post-Graduate": "Post-Graduate"
                    }
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
                        "Salaried": "Salaried",
                        "Self employed": "Self employed",
                        "Student": "Student",
                        "House wife": "House wife",
                        "Others": "Others",
                        "agricultural labourers": "agricultural labourers",
                        "bidi workers": "bidi workers",
                        "brick kiln workers": "brick kiln workers",
                        "carpenters": "carpenters",
                        "cobblers": "cobblers",
                        "construction workers": "construction workers",
                        "fishermen": "fishermen",
                        "hamals": "hamals",
                        "handicraft artisans": "handicraft artisans",
                        "handloom and khadi workers": "handloom and khadi workers",
                        "lady tailors": "lady tailors",
                        "leather and tannery workers": "leather and tannery workers",
                        "papad makers": "papad makers",
                        "powerloom workers": "powerloom workers",
                        "physically handicapped self-employed persons": "physically handicapped self-employed persons",
                        "primary milk producers": "primary milk producers",
                        "rickshaw pullers": "rickshaw pullers",
                        "safai karmacharis": "safai karmacharis",
                        "salt growers": "salt growers",
                        "seri culture workers": "seri culture workers",
                        "sugarcane cutters": "sugarcane cutters",
                        "tendu leaf collectors": "tendu leaf collectors",
                        "toddy tappers": "toddy tappers",
                        "vegetable vendors": "vegetable vendors",
                        "washerwomen": "washerwomen",
                        "working women in hills": "working women in hills",
                        "social sector": "social sector",
                        "HA - Type 1": "HA - Type 1",
                        "HA - Type 2": "HA - Type 2",
                        "HA - Type 3": "HA - Type 3",
                        "HA - Type 4": "HA - Type 4",
                        "HA - Type 5": "HA - Type 5",
                        "HA - Type 6": "HA - Type 6",
                        "HA - Type 7": "HA - Type 7",
                        "HA - Type 8": "HA - Type 8",
                        "HA - Type 9": "HA - Type 9",
                        "HA - Type 10": "HA - Type 10",
                        "HA - Type 11": "HA - Type 11",
                        "HA - Type 12": "HA - Type 12",
                        "Administrative, Clerical, Financial, Marketing (desk job)": "Administrative, Clerical, Financial, Marketing (desk job)",
                        "Teachers at various levels, Sales and Services - any designation": "Teachers at various levels, Sales and Services - any designation",
                        "Supervisors involved in work in underground mining, tunneling": "Supervisors involved in work in underground mining, tunneling",
                        "Supervisors involved in work in manufacturing, construction": "Supervisors involved in work in manufacturing, construction",
                        "Supervisors involved in work in dealing with heavy machines": "Supervisors involved in work in dealing with heavy machines",
                        "Supervisors involved in manufacturing with no heavy machiner": "Supervisors involved in manufacturing with no heavy machiner",
                        "Supervisors involved in manufacturing with no heavy machinery": "Supervisors involved in manufacturing with no heavy machinery",
                        "Workers involved in mining, construction\"": "Workers involved in mining, construction\"",
                        "Workers involved in mineral processing, any manufacturing work": "Workers involved in mineral processing, any manufacturing work",
                        "Workers involved in plant operation work in chemical plants": "Workers involved in plant operation work in chemical plants",
                        "Workers involved in plant operation work in rubber,textile plants": "Workers involved in plant operation work in rubber,textile plants",
                        "Technicians working in electrical and related occupation": "Technicians working in electrical and related occupation",
                        "Professionals, medical & laboratory technical staff": "Professionals, medical & laboratory technical staff",
                        "All other supportive staff under health and healthcare services": "All other supportive staff under health and healthcare services",
                        "Creative and performing artists of drama and cinema": "Creative and performing artists of drama and cinema",
                        "Authors, Journalists, linguists, Arts & media related designers": "Authors, Journalists, linguists, Arts & media related designers",
                        "Adventure sports, Instructors or related occupation": "Adventure sports, Instructors or related occupation",
                        "Acrobats, professional sportsmen, Jockey": "Acrobats, professional sportsmen, Jockey",
                        "Racing Drivers and circus professionals": "Racing Drivers and circus professionals",
                        "Home maker, Student and Research scholars": "Home maker, Student and Research scholars",
                        "Architects, Town planners and Interior designers": "Architects, Town planners and Interior designers",
                        "Employed in Hotel and Hospitality industry": "Employed in Hotel and Hospitality industry",
                        "Culinary and Food preparation occupation with machinery": "Culinary and Food preparation occupation with machinery",
                        "Workers involved in agriculture & live stock": "Workers involved in agriculture & live stock",
                        "Workers involved in wildlife, forestry & fisheries": "Workers involved in wildlife, forestry & fisheries",
                        "Gardeners & those involved in horticulture": "Gardeners & those involved in horticulture",
                        "Personal service workers Hair dressing & other jobs in saloons": "Personal service workers: Hair dressing & other jobs in saloons",
                        "Personal service workers beauty parlors": "Personal service workers: beauty parlors",
                        "Drivers of heavy trucks and vehicles (e.g. JCB)": "Drivers of heavy trucks and vehicles (e.g. JCB)",
                        "Drivers of commercial vehicles": "Drivers of commercial vehicles",
                        "Those involved in strenuous transportation related work": "Those involved in strenuous transportation related work",
                        "Drivers of light commercial vehicles such as Car,Motorbike,scooter": "Drivers of light commercial vehicles such as Car,Motorbike,scooter",
                        "Drivers of non commercial vehicles such as (domestic drivers)": "Drivers of non commercial vehicles such as (domestic drivers)",
                        "Aviation, Railways, Shipping crew & related workers": "Aviation, Railways, Shipping crew & related workers",
                        "Ground staff of airlines, railways or shipping": "Ground staff of airlines, railways or shipping",
                        "Armed forces, Police, State & Central reserve police, Homeguards": "Armed forces, Police, State & Central reserve police, Homeguards",
                        "Private Security Personnel": "Private Security Personnel",
                        "All self employed, businessmen in non-hazardous businesses": "All self employed, businessmen in non-hazardous businesses",
                        "All self employed, businessmen in hazardous businesses": "All self employed, businessmen in hazardous businesses",
                        "Engineers (mechanical, electrical, civil, aeronautical, textile)": "Engineers (mechanical, electrical, civil, aeronautical, textile)",
                        "Engineers (computer, IT, and software )": "Engineers (computer, IT, and software )",
                        "Politician": "Politician"
                    }
                }
            },
            {
                "type": "text",
                "name": "mobile",
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
            }
        ]
    },
    "Medical Details": {
        "10026859_self_spouse": [
            {
                "type": "custom_toggle",
                "name": "health_compasion_medical_health_companion_1_1",
                "width": "100%",
                "validate": {
                    "selectAtLeastOne": true
                },
                "additionalOptions": {
                    "label": "Has any proposal for life, health, hospital daily cash, Personal Accident or critical illness insurance on the life of the applicant ever been declined, postponed, loaded or subjected to any special conditions such as exclusions by any insurance company?",
                    "members": [
                        "self",
                        "spouse"
                    ]
                }
            },
            {
                "type": "custom_toggle",
                "name": "health_compasion_medical_health_companion_2_1",
                "width": "100%",
                "additionalOptions": {
                    "label": "Is the applicant currently suffering from any symptom(s) or complaint(s) persisting from more than five consecutive days for which he/she has not consulted a doctor?",
                    "showMembers": false,
                    "members": [
                        "self",
                        "spouse"
                    ]
                }
            },
            {
                "type": "custom_toggle",
                "name": "health_compasion_medical_health_companion_3_1",
                "width": "100%",
                "additionalOptions": {
                    "label": "Other than routine health check-up, has the applicant undergone or been advised to undergo any diagnostic test/investigation including but not limited to Thyroid Profile, Treadmill test, Angiography, Echocardiography, Endoscopy, Ultrasound, CT Scan, MRI, Biopsy and FNAC?",
                    "showMembers": false,
                    "members": [
                        "self",
                        "spouse"
                    ]
                }
            },
            {
                "type": "custom_toggle",
                "name": "health_compasion_medical_health_companion_4_1",
                "width": "100%",
                "additionalOptions": {
                    "label": "Has the applicant been prescribed or taken any form of treatment or medication (including oral / inhalation / injection), for a period of more than seven days?",
                    "showMembers": false,
                    "members": [
                        "self",
                        "spouse"
                    ]
                }
            },
            {
                "type": "custom_toggle",
                "name": "health_compasion_medical_health_companion_6_1",
                "width": "100%",
                "additionalOptions": {
                    "showMembersIf": "health_compasion_medical_health_companion_2_1||health_compasion_medical_health_companion_3_1||health_compasion_medical_health_companion_4_1||health_compasion_medical_health_companion_5_1||health_compasion_medical_health_companion_6_1",
                    "label": "Has the applicant undergone or been advised to undergo or does he/she plan to undergo any form of surgery or procedure?",
                    "members": [
                        "self",
                        "spouse"
                    ]
                }
            },
            [
                {
                    "type": "checkboxGroup",
                    "name": "health_compasion_health_compasion_checkbox_group",
                    "parent": "health_compasion_medical_health_companion_6_1",
                    "width": "100%",
                    "validate": {
                        "selectAtLeastOneCheckbox": true
                    },
                    "render": {
                        "when": "health_compasion_medical_health_companion_2_1||health_compasion_medical_health_companion_3_1||health_compasion_medical_health_companion_4_1||health_compasion_medical_health_companion_5_1||health_compasion_medical_health_companion_6_1",
                        "is": "Y"
                    },
                    "additionalOptions": {
                        "showMembersIf": "health_compasion_medical_health_companion_2_1||health_compasion_medical_health_companion_3_1||health_compasion_medical_health_companion_4_1||health_compasion_medical_health_companion_5_1||health_compasion_medical_health_companion_6_1",
                        "members": [
                            "self",
                            "spouse"
                        ]
                    },
                    "subQuestion": [
                        {
                            "type": "checkBox2",
                            "question": "Cancer & related disorders",
                            "parent": "medical_health_companion_6_1",
                            "name": "health_compasion_cancer_Q_1",
                            "validate": {
                                "selectAtLeastOne": true,
                                "matches": "alphanum"
                            },
                            "render": {
                                "when": "health_compasion_medical_health_companion_2_1||health_compasion_medical_health_companion_3_1||health_compasion_medical_health_companion_4_1||health_compasion_medical_health_companion_5_1||health_compasion_medical_health_companion_6_1",
                                "is": "Y"
                            },
                            "width": "100%",
                            "additionalOptions": {
                                "placeholder": "Cancer & related disorders"
                            }
                        },
                        {
                            "type": "checkBox2",
                            "question": "Kidney, urinary and prostate disorders",
                            "parent": "medical_health_companion_6_1",
                            "name": "health_compasion_kidney_Q_1",
                            "validate": {
                                "selectAtLeastOne": true,
                                "matches": "alphanum"
                            },
                            "render": {
                                "when": "health_compasion_medical_health_companion_2_1||health_compasion_medical_health_companion_3_1||health_compasion_medical_health_companion_4_1||health_compasion_medical_health_companion_5_1||health_compasion_medical_health_companion_6_1",
                                "is": "Y"
                            },
                            "width": "100%",
                            "additionalOptions": {
                                "placeholder": "Kidney, urinary and prostate disorders"
                            }
                        },
                        {
                            "type": "checkBox2",
                            "question": "Heart and circulatory system related disorders",
                            "parent": "medical_health_companion_6_1",
                            "name": "health_compasion_heart_problem_Q_1",
                            "validate": {
                                "selectAtLeastOne": true,
                                "matches": "alphanum"
                            },
                            "render": {
                                "when": "health_compasion_medical_health_companion_2_1||health_compasion_medical_health_companion_3_1||health_compasion_medical_health_companion_4_1||health_compasion_medical_health_companion_5_1||health_compasion_medical_health_companion_6_1",
                                "is": "Y"
                            },
                            "width": "100%",
                            "additionalOptions": {
                                "placeholder": "Heart and circulatory system related disorders"
                            }
                        },
                        {
                            "type": "checkBox2",
                            "question": "Lung and respiratory disorders",
                            "parent": "medical_health_companion_6_1",
                            "name": "health_compasion_lung_disorder_Q_1",
                            "validate": {
                                "selectAtLeastOne": true,
                                "matches": "alphanum"
                            },
                            "render": {
                                "when": "health_compasion_medical_health_companion_2_1||health_compasion_medical_health_companion_3_1||health_compasion_medical_health_companion_4_1||health_compasion_medical_health_companion_5_1||health_compasion_medical_health_companion_6_1",
                                "is": "Y"
                            },
                            "width": "100%",
                            "additionalOptions": {
                                "placeholder": "Lung and respiratory disorders"
                            }
                        },
                        {
                            "type": "checkBox2",
                            "question": "Stomach, intestine, liver, gall bladder, pancreas, appendix disorders",
                            "parent": "medical_health_companion_6_1",
                            "name": "health_compasion_stomach_disorder_Q_1",
                            "validate": {
                                "selectAtLeastOne": true,
                                "matches": "alphanum"
                            },
                            "render": {
                                "when": "health_compasion_medical_health_companion_2_1||health_compasion_medical_health_companion_3_1||health_compasion_medical_health_companion_4_1||health_compasion_medical_health_companion_5_1||health_compasion_medical_health_companion_6_1",
                                "is": "Y"
                            },
                            "width": "100%",
                            "additionalOptions": {
                                "placeholder": "Stomach, intestine, liver, gall bladder, pancreas, appendix disorders"
                            }
                        },
                        {
                            "type": "checkBox2",
                            "question": "Psychiatric and nervous disorders (brain/spine)",
                            "parent": "medical_health_companion_6_1",
                            "name": "health_compasion_psychiatric_disorder_Q_1",
                            "validate": {
                                "selectAtLeastOne": true,
                                "matches": "alphanum"
                            },
                            "render": {
                                "when": "health_compasion_medical_health_companion_2_1||health_compasion_medical_health_companion_3_1||health_compasion_medical_health_companion_4_1||health_compasion_medical_health_companion_5_1||health_compasion_medical_health_companion_6_1",
                                "is": "Y"
                            },
                            "width": "100%",
                            "additionalOptions": {
                                "placeholder": "Psychiatric and nervous disorders (brain/spine)"
                            }
                        },
                        {
                            "type": "checkBox2",
                            "question": "Endocrine disorders",
                            "parent": "medical_health_companion_6_1",
                            "name": "health_compasion_endocrine_disorder_Q_1",
                            "validate": {
                                "selectAtLeastOne": true,
                                "matches": "alphanum"
                            },
                            "render": {
                                "when": "health_compasion_medical_health_companion_2_1||health_compasion_medical_health_companion_3_1||health_compasion_medical_health_companion_4_1||health_compasion_medical_health_companion_5_1||health_compasion_medical_health_companion_6_1",
                                "is": "Y"
                            },
                            "width": "100%",
                            "additionalOptions": {
                                "placeholder": "Endocrine disorders"
                            }
                        },
                        {
                            "type": "checkBox2",
                            "question": "Bone and muscle disorders Arthritis, ligament / cartilage",
                            "parent": "medical_health_companion_6_1",
                            "name": "health_compasion_bone_disorder_Q_1",
                            "validate": {
                                "selectAtLeastOne": true,
                                "matches": "alphanum"
                            },
                            "render": {
                                "when": "health_compasion_medical_health_companion_2_1||health_compasion_medical_health_companion_3_1||health_compasion_medical_health_companion_4_1||health_compasion_medical_health_companion_5_1||health_compasion_medical_health_companion_6_1",
                                "is": "Y"
                            },
                            "width": "100%",
                            "additionalOptions": {
                                "placeholder": "Bone and muscle disorders Arthritis, ligament / cartilage"
                            }
                        },
                        {
                            "type": "checkBox2",
                            "question": "Ear, nose, eye and throat disorders",
                            "parent": "medical_health_companion_6_1",
                            "name": "health_compasion_ear_disorder_Q_1",
                            "validate": {
                                "selectAtLeastOne": true,
                                "matches": "alphanum"
                            },
                            "render": {
                                "when": "health_compasion_medical_health_companion_2_1||health_compasion_medical_health_companion_3_1||health_compasion_medical_health_companion_4_1||health_compasion_medical_health_companion_5_1||health_compasion_medical_health_companion_6_1",
                                "is": "Y"
                            },
                            "width": "100%",
                            "additionalOptions": {
                                "placeholder": "Ear, nose, eye and throat disorders"
                            }
                        },
                        {
                            "type": "checkBox2",
                            "question": "Gynaecological disorders",
                            "parent": "medical_health_companion_6_1",
                            "name": "health_compasion_gynaecological_disorder_Q_1",
                            "validate": {
                                "selectAtLeastOne": true,
                                "matches": "alphanum"
                            },
                            "render": {
                                "when": "health_compasion_medical_health_companion_2_1||health_compasion_medical_health_companion_3_1||health_compasion_medical_health_companion_4_1||health_compasion_medical_health_companion_5_1||health_compasion_medical_health_companion_6_1",
                                "is": "Y"
                            },
                            "width": "100%",
                            "additionalOptions": {
                                "placeholder": "Gynaecological disorders"
                            }
                        },
                        {
                            "type": "checkBox2",
                            "question": "Blood-related disorders",
                            "parent": "medical_health_companion_6_1",
                            "name": "health_compasion_bloodrelated_disorder_Q_1",
                            "validate": {
                                "selectAtLeastOne": true,
                                "matches": "alphanum"
                            },
                            "render": {
                                "when": "health_compasion_medical_health_companion_2_1||health_compasion_medical_health_companion_3_1||health_compasion_medical_health_companion_4_1||health_compasion_medical_health_companion_5_1||health_compasion_medical_health_companion_6_1",
                                "is": "Y"
                            },
                            "width": "100%",
                            "additionalOptions": {
                                "placeholder": "Blood-related disorders"
                            }
                        },
                        {
                            "type": "checkBox2",
                            "question": "Skin disorders",
                            "parent": "medical_health_companion_6_1",
                            "name": "health_compasion_skin_disorder_Q_1",
                            "validate": {
                                "selectAtLeastOne": true,
                                "matches": "alphanum"
                            },
                            "render": {
                                "when": "health_compasion_medical_health_companion_2_1||health_compasion_medical_health_companion_3_1||health_compasion_medical_health_companion_4_1||health_compasion_medical_health_companion_5_1||health_compasion_medical_health_companion_6_1",
                                "is": "Y"
                            },
                            "width": "100%",
                            "additionalOptions": {
                                "placeholder": "Skin disorders"
                            }
                        },
                        {
                            "type": "checkBox2",
                            "question": "Any other conditions",
                            "parent": "medical_health_companion_6_1",
                            "name": "health_compasion_other_disorder_Q_1",
                            "validate": {
                                "selectAtLeastOne": true,
                                "matches": "alphanum"
                            },
                            "render": {
                                "when": "health_compasion_medical_health_companion_2_1||health_compasion_medical_health_companion_3_1||health_compasion_medical_health_companion_4_1||health_compasion_medical_health_companion_5_1||health_compasion_medical_health_companion_6_1",
                                "is": "Y"
                            },
                            "width": "100%",
                            "additionalOptions": {
                                "placeholder": "Any other conditions"
                            }
                        }
                    ]
                }
            ],
            {
                "type": "custom_medical",
                "name": "health_compasion_blood_pressure_1",
                "width": "100%",
                "validate": {
                    "selectAtLeastOne": true,
                    "matches": "validYear/1/100"
                },
                "additionalOptions": {
                    "label": "Does the Applicant have Hypertension or High Blood Pressure?",
                    "members": [
                        "self",
                        "spouse"
                    ]
                }
            },
            [
                {
                    "type": "select",
                    "name": "health_compasion_blood_pressure_Q7_1",
                    "parent": "health_compasion_blood_pressure_1",
                    "render": {
                        "when": "",
                        "is": true
                    },
                    "width": "100%",
                    "additionalOptions": {
                        "placeholder": "How does the applicant manage his/her Hypertension / High Blood Pressure?",
                        "options": {
                            "A": "One medicine",
                            "B": "Two medicines",
                            "C": "Three or more medicines",
                            "D": "No medicine"
                        },
                        "members": [
                            "self",
                            "spouse"
                        ]
                    },
                    "validate": {
                        "required": true
                    }
                },
                {
                    "type": "select",
                    "name": "health_compasion_blood_pressure_Q8_1",
                    "parent": "health_compasion_blood_pressure_1",
                    "render": {
                        "when": "",
                        "is": true
                    },
                    "width": "100%",
                    "additionalOptions": {
                        "placeholder": "How does the applicant manage his/her Hypertension / High Blood Pressure?",
                        "options": {
                            "A": "0-1 years",
                            "B": "1-5 Years ",
                            "C": "5-10 years",
                            "D": "More than 10 Years"
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
                "name": "health_compasion_diabetes_1",
                "width": "100%",
                "validate": {
                    "selectAtLeastOne": true,
                    "matches": "validYear/1/100"
                },
                "additionalOptions": {
                    "label": "Does the Applicant have diabetes or pre-diabetes or has he/she EVER had high blood sugar?",
                    "members": [
                        "self",
                        "spouse"
                    ]
                }
            },
            [
                {
                    "type": "select",
                    "name": "health_compasion_diabetes_Q2_1",
                    "parent": "health_compasion_diabetes_1",
                    "render": {
                        "when": "",
                        "is": true
                    },
                    "width": "100%",
                    "additionalOptions": {
                        "placeholder": "How long ago was the applicant first diagnosed with diabetes / pre-diabetes / high blood sugar?",
                        "options": {
                            "A": "0-1 years",
                            "B": "1-5 Years ",
                            "C": "5-10 years",
                            "D": "More than 10 Years"
                        },
                        "members": [
                            "self",
                            "spouse"
                        ]
                    },
                    "validate": {
                        "required": true
                    }
                },
                {
                    "type": "checkBox2",
                    "question": "Insulin",
                    "name": "health_compasion_diabetes_Q3_1",
                    "parent": "health_compasion_diabetes_1",
                    "render": {
                        "when": "",
                        "is": true
                    },
                    "width": "100%",
                    "additionalOptions": {
                        "placeholder": "Insulin",
                        "members": [
                            "self",
                            "spouse"
                        ]
                    },
                    "validate": {
                        "matches": "alphanum"
                    }
                },
                {
                    "type": "checkBox2",
                    "question": "Oral diabetic medication",
                    "name": "health_compasion_diabetes_Q4_1",
                    "parent": "health_compasion_diabetes_1",
                    "render": {
                        "when": "",
                        "is": true
                    },
                    "width": "100%",
                    "additionalOptions": {
                        "placeholder": "Oral diabetic medication",
                        "members": [
                            "self",
                            "spouse"
                        ]
                    },
                    "validate": {
                        "matches": "alphanum"
                    }
                },
                {
                    "type": "checkBox2",
                    "question": "Homeopathic or other AYUSH treatment",
                    "name": "health_compasion_diabetes_Q5_1",
                    "parent": "health_compasion_diabetes_1",
                    "render": {
                        "when": "",
                        "is": true
                    },
                    "width": "100%",
                    "additionalOptions": {
                        "placeholder": "Homeopathic or other AYUSH treatment",
                        "members": [
                            "self",
                            "spouse"
                        ]
                    },
                    "validate": {
                        "matches": "alphanum"
                    }
                },
                {
                    "type": "checkBox2",
                    "question": "No medicine",
                    "name": "health_compasion_diabetes_Q6_1",
                    "parent": "health_compasion_diabetes_1",
                    "render": {
                        "when": "",
                        "is": true
                    },
                    "width": "100%",
                    "additionalOptions": {
                        "placeholder": "No medicine",
                        "members": [
                            "self",
                            "spouse"
                        ]
                    },
                    "validate": {
                        "matches": "alphanum"
                    }
                }
            ],
            {
                "type": "custom_medical",
                "name": "health_compasion_smoke_1",
                "width": "100%",
                "validate": {
                    "selectAtLeastOne": true
                },
                "additionalOptions": {
                    "label": "Does any of the applicants Smokes Cigarettes/Bidi/Cigar?",
                    "additionalQuestions": null,
                    "members": [
                        "self",
                        "spouse"
                    ]
                }
            },
            [
                {
                    "type": "text",
                    "name": "health_compasion_smoke_Q1_1",
                    "parent": "health_compasion_smoke_1",
                    "width": "100%",
                    "render": {
                        "when": "",
                        "is": true
                    },
                    "additionalOptions": {
                        "placeholder": "Please specify consumption per day",
                        "members": [
                            "self",
                            "spouse"
                        ]
                    },
                    "validate": {
                        "required": true
                    },
                    "maxLength": 5,
                    "allow": "onlyNumbers"
                }
            ],
            {
                "type": "custom_medical",
                "name": "health_compasion_alcohol_1",
                "width": "100%",
                "validate": {
                    "selectAtLeastOne": true
                },
                "additionalOptions": {
                    "label": "Does any of the applicants takes alcohol?",
                    "members": [
                        "self",
                        "spouse"
                    ]
                }
            },
            [
                {
                    "type": "checkBox2",
                    "question": "Is Daily Drinker",
                    "name": "health_compasion_alcohol_Q1_1",
                    "parent": "health_compasion_alcohol_1",
                    "render": {
                        "when": "",
                        "is": true
                    },
                    "width": "100%",
                    "additionalOptions": {
                        "placeholder": "Is Daily Drinker",
                        "members": [
                            "self",
                            "spouse"
                        ]
                    },
                    "matches": "alphanum"
                },
                {
                    "type": "text",
                    "question": "Please specify ml per week",
                    "name": "health_compasion_alcohol_Q2_1",
                    "parent": "health_compasion_alcohol_1",
                    "width": "100%",
                    "render": {
                        "when": "",
                        "is": true
                    },
                    "additionalOptions": {
                        "placeholder": "Please specify ml per week",
                        "members": [
                            "self",
                            "spouse"
                        ]
                    },
                    "validate": {
                        "required": true
                    },
                    "maxLength": 5,
                    "allow": "onlyNumbers"
                }
            ],
            {
                "type": "custom_medical",
                "name": "health_compasion_tobacco_1",
                "width": "100%",
                "validate": {
                    "selectAtLeastOne": true
                },
                "additionalOptions": {
                    "label": "Does any of the applicants Chew tobacco/Gutkha/Pan Masala?",
                    "members": [
                        "self",
                        "spouse"
                    ]
                }
            },
            [
                {
                    "type": "text",
                    "question": "Please specify number of pouches per day",
                    "name": "health_compasion_tobacco_Q1_1",
                    "parent": "health_compasion_tobacco_1",
                    "width": "100%",
                    "render": {
                        "when": "",
                        "is": true
                    },
                    "additionalOptions": {
                        "placeholder": "Please specify number of pouches per day",
                        "members": [
                            "self",
                            "spouse"
                        ]
                    },
                    "validate": {
                        "required": true
                    },
                    "maxLength": 5,
                    "allow": "onlyNumbers"
                }
            ],
            {
                "type": "custom_medical",
                "name": "health_compasion_illicitdrugs_1",
                "width": "100%",
                "validate": {
                    "selectAtLeastOne": true
                },
                "additionalOptions": {
                    "label": "Does any of the applicants takes Illicit drugs?",
                    "members": [
                        "self",
                        "spouse"
                    ]
                }
            },
            [
                {
                    "type": "text",
                    "question": "Please specify number of pouches per day",
                    "name": "health_compasion_illicitdrugs_Q1_1",
                    "parent": "health_compasion_illicitdrugs_1",
                    "width": "100%",
                    "render": {
                        "when": "",
                        "is": true
                    },
                    "additionalOptions": {
                        "placeholder": "Please specify number of pouches per day",
                        "members": [
                            "self",
                            "spouse"
                        ]
                    },
                    "validate": {
                        "required": true
                    },
                    "maxLength": 5,
                    "allow": "onlyNumbers"
                }
            ],
            {
                "type": "custom_medical",
                "name": "health_compasion_past_history_1",
                "width": "100%",
                "validate": {
                    "selectAtLeastOne": true
                },
                "additionalOptions": {
                    "label": "Have any first degree relatives (i.e. parents, brothers, sisters or children) of ANY of the applicants (who are not themselves applicants for this insurance policy) had cancer, diabetes, hypertension (high blood pressure), heart disease, kidney disease, polycystic kidney disease, mental or nervous disorder (including alzheimer's disease), stroke, multiple sclerosis, motor neurone disease or any other hereditary disorders?",
                    "members": [
                        "self",
                        "spouse"
                    ]
                }
            },
            [
                {
                    "type": "text",
                    "name": "health_compasion_past_history_Q1_1",
                    "parent": "health_compasion_past_history_1",
                    "render": {
                        "when": "",
                        "is": true
                    },
                    "width": "100%",
                    "additionalOptions": {
                        "placeholder": "Applicant Number",
                        "members": [
                            "self",
                            "spouse"
                        ]
                    },
                    "validate": {
                        "required": true
                    },
                    "matches": "alphanum"
                },
                {
                    "type": "select",
                    "name": "health_compasion_past_history_Q2_1",
                    "parent": "health_compasion_past_history_1",
                    "render": {
                        "when": "",
                        "is": true
                    },
                    "width": "100%",
                    "additionalOptions": {
                        "placeholder": "Relationship to the applicant",
                        "options": {
                            "Spouse": "Spouse",
                            "Mother": "Mother",
                            "Father": "Father",
                            "Son": "Son",
                            "Daughter": "Daughter",
                            "Brother": "Brother",
                            "Sister": "Sister",
                            "Father-in-law": "Father-in-law",
                            "Mother-in-law": "Mother-in-law",
                            "Son-in-law": "Son-in-law",
                            "Uncle": "Uncle",
                            "Aunt": "Aunt",
                            "Daughter-in-law": "Daughter-in-law",
                            "Nephew": "Nephew",
                            "Niece": "Niece",
                            "Brother-in-Law": "Brother-in-Law",
                            "Sister-in-Law": "Sister-in-Law",
                            "Grandfather": "Grandfather",
                            "Grandmother": "Grandmother",
                            "Grandson": "Grandson",
                            "Granddaughter": "Granddaughter",
                            "Others": "Others"
                        },
                        "members": [
                            "self",
                            "spouse"
                        ]
                    },
                    "validate": {
                        "required": true
                    }
                },
                {
                    "type": "text",
                    "question": "Dosage",
                    "name": "health_compasion_past_history_Q3_1",
                    "parent": "health_compasion_past_history_1",
                    "render": {
                        "when": "",
                        "is": true
                    },
                    "width": "100%",
                    "additionalOptions": {
                        "placeholder": "Disease or disorder",
                        "members": [
                            "self",
                            "spouse"
                        ]
                    },
                    "validate": {
                        "required": true
                    },
                    "matches": "alphanum"
                },
                {
                    "type": "text",
                    "question": "Age at onset condition",
                    "name": "health_compasion_past_history_Q4_1",
                    "parent": "health_compasion_past_history_1",
                    "render": {
                        "when": "",
                        "is": true
                    },
                    "width": "100%",
                    "additionalOptions": {
                        "placeholder": "Age at onset condition",
                        "members": [
                            "self",
                            "spouse"
                        ]
                    },
                    "validate": {
                        "required": true
                    },
                    "matches": "number"
                },
                {
                    "type": "checkBox2",
                    "question": "is alive",
                    "name": "health_compasion_past_history_Q5_1",
                    "parent": "health_compasion_past_history_1",
                    "render": {
                        "when": "",
                        "is": true
                    },
                    "width": "100%",
                    "additionalOptions": {
                        "placeholder": "is alive",
                        "members": [
                            "self",
                            "spouse"
                        ]
                    },
                    "validate": {
                        "required": true
                    },
                    "matches": "alphanum"
                },
                {
                    "type": "text",
                    "question": "current age",
                    "name": "health_compasion_past_history_Q8_1",
                    "parent": "health_compasion_past_history_1",
                    "render": {
                        "when": "health_compasion_past_history_Q5_1",
                        "is": "Y"
                    },
                    "width": "100%",
                    "additionalOptions": {
                        "placeholder": "current age",
                        "members": [
                            "self",
                            "spouse"
                        ]
                    },
                    "validate": {
                        "required": true
                    },
                    "matches": "number"
                },
                {
                    "type": "text",
                    "question": "Age at death (if applicable)",
                    "name": "health_compasion_past_history_Q6_1",
                    "parent": "health_compasion_past_history_1",
                    "render": {
                        "when": "health_compasion_past_history_Q5_1",
                        "is": "N"
                    },
                    "width": "100%",
                    "additionalOptions": {
                        "placeholder": "Age at death (if applicable)",
                        "members": [
                            "self",
                            "spouse"
                        ]
                    },
                    "validate": {
                        "required": true
                    },
                    "matches": "number",
                    "allow": "onlyNumbers"
                },
                {
                    "type": "text",
                    "question": "Cause of death(if applicable)",
                    "name": "health_compasion_past_history_Q7_1",
                    "parent": "health_compasion_past_history_1",
                    "render": {
                        "when": "health_compasion_past_history_Q5_1",
                        "is": "N"
                    },
                    "width": "100%",
                    "additionalOptions": {
                        "placeholder": "Cause of death(if applicable)",
                        "members": [
                            "self",
                            "spouse"
                        ]
                    },
                    "validate": {
                        "required": true
                    },
                    "matches": "alphanum"
                }
            ],
            {
                "type": "custom_medical",
                "name": "health_compasion_medical_1",
                "width": "100%",
                "validate": {
                    "selectAtLeastOne": true
                },
                "additionalOptions": {
                    "showMembersIf": "health_compasion_pregnant_1||health_compasion_past_history_1||health_compasion_diabetes_1||health_compasion_illicitdrugs_1||health_compasion_tobacco_1||health_compasion_alcohol_1||health_compasion_smoke_1||health_compasion_blood_pressure_1||health_compasion_medical_health_companion_2_1||health_compasion_medical_health_companion_3_1||health_compasion_medical_health_companion_4_1||health_compasion_medical_health_companion_5_1||health_compasion_medical_health_companion_6_1",
                    "label": "If insured person marked any medical details .Please fill up form(Mandatory)",
                    "members": [
                        "self",
                        "spouse"
                    ]
                }
            },
            [
                {
                    "type": "text",
                    "name": "health_compasion_medical_Q1_1",
                    "parent": "health_compasion_medical_1",
                    "render": {
                        "when": "health_compasion_pregnant_1||health_compasion_medical_1||health_compasion_past_history_1||health_compasion_diabetes_1||health_compasion_illicitdrugs_1||health_compasion_tobacco_1||health_compasion_alcohol_1||health_compasion_smoke_1||health_compasion_blood_pressure_1||health_compasion_medical_health_companion_2_1||health_compasion_medical_health_companion_3_1||health_compasion_medical_health_companion_4_1||health_compasion_medical_health_companion_5_1||health_compasion_medical_health_companion_6_1",
                        "is": "Y"
                    },
                    "width": "100%",
                    "additionalOptions": {
                        "placeholder": "Treating doctor’s name & contact details",
                        "members": [
                            "self",
                            "spouse"
                        ]
                    },
                    "validate": {
                        "required": true
                    },
                    "matches": "alphanum"
                },
                {
                    "type": "text",
                    "question": "Dosage",
                    "name": "health_compasion_medical_Q2_1",
                    "parent": "health_compasion_medical_1",
                    "render": {
                        "when": "health_compasion_pregnant_1||health_compasion_medical_1||health_compasion_past_history_1||health_compasion_diabetes_1||health_compasion_illicitdrugs_1||health_compasion_tobacco_1||health_compasion_alcohol_1||health_compasion_smoke_1||health_compasion_blood_pressure_1||health_compasion_medical_health_companion_2_1||health_compasion_medical_health_companion_3_1||health_compasion_medical_health_companion_4_1||health_compasion_medical_health_companion_5_1||health_compasion_medical_health_companion_6_1",
                        "is": "Y"
                    },
                    "width": "100%",
                    "additionalOptions": {
                        "placeholder": "Dosage",
                        "members": [
                            "self",
                            "spouse"
                        ]
                    },
                    "validate": {
                        "required": true
                    },
                    "matches": "alphanum"
                },
                {
                    "type": "text",
                    "question": "Medication(s)",
                    "name": "health_compasion_medical_Q3_1",
                    "parent": "health_compasion_medical_1",
                    "render": {
                        "when": "health_compasion_pregnant_1||health_compasion_medical_1||health_compasion_past_history_1||health_compasion_diabetes_1||health_compasion_illicitdrugs_1||health_compasion_tobacco_1||health_compasion_alcohol_1||health_compasion_smoke_1||health_compasion_blood_pressure_1||health_compasion_medical_health_companion_2_1||health_compasion_medical_health_companion_3_1||health_compasion_medical_health_companion_4_1||health_compasion_medical_health_companion_5_1||health_compasion_medical_health_companion_6_1",
                        "is": "Y"
                    },
                    "width": "100%",
                    "additionalOptions": {
                        "placeholder": "Medication(s)",
                        "members": [
                            "self",
                            "spouse"
                        ]
                    },
                    "validate": {
                        "required": true
                    },
                    "matches": "alphanum"
                },
                {
                    "type": "date",
                    "question": "Onset date (DD/MM/ YYYY)\t",
                    "name": "health_compasion_medical_Q4_1",
                    "parent": "health_compasion_medical_1",
                    "render": {
                        "when": "health_compasion_pregnant_1||health_compasion_medical_1||health_compasion_past_history_1||health_compasion_diabetes_1||health_compasion_illicitdrugs_1||health_compasion_tobacco_1||health_compasion_alcohol_1||health_compasion_smoke_1||health_compasion_blood_pressure_1||health_compasion_medical_health_companion_2_1||health_compasion_medical_health_companion_3_1||health_compasion_medical_health_companion_4_1||health_compasion_medical_health_companion_5_1||health_compasion_medical_health_companion_6_1",
                        "is": "Y"
                    },
                    "width": "100%",
                    "additionalOptions": {
                        "placeholder": "Onset date (DD/MM/ YYYY)",
                        "maxLength": 10,
                        "members": [
                            "self",
                            "spouse"
                        ]
                    },
                    "rules": [
                        "date_format:d-m-Y",
                        "before_or_equal:today",
                        "after_or_equal:member_birth_date"
                    ],
                    "validate": {
                        "required": true
                    },
                    "matches": "date",
                    "allow": "dob",
                    "attribute_name": "Onset date"
                },
                {
                    "type": "text",
                    "question": "Details of symptom(s) or investigation(s) or diagnosis or procedure/surgery undergone",
                    "name": "health_compasion_medical_Q5_1",
                    "parent": "health_compasion_medical_1",
                    "render": {
                        "when": "health_compasion_pregnant_1||health_compasion_medical_1||health_compasion_past_history_1||health_compasion_diabetes_1||health_compasion_illicitdrugs_1||health_compasion_tobacco_1||health_compasion_alcohol_1||health_compasion_smoke_1||health_compasion_blood_pressure_1||health_compasion_medical_health_companion_2_1||health_compasion_medical_health_companion_3_1||health_compasion_medical_health_companion_4_1||health_compasion_medical_health_companion_5_1||health_compasion_medical_health_companion_6_1",
                        "is": "Y"
                    },
                    "width": "100%",
                    "additionalOptions": {
                        "placeholder": "Details of symptom(s) or investigation(s) or diagnosis or procedure/surgery undergone",
                        "members": [
                            "self",
                            "spouse"
                        ]
                    },
                    "validate": {
                        "required": true
                    },
                    "matches": "alphanum"
                },
                {
                    "type": "text",
                    "question": "Duration of Condition",
                    "name": "health_compasion_medical_Q6_1",
                    "parent": "health_compasion_medical_1",
                    "render": {
                        "when": "health_compasion_pregnant_1||health_compasion_medical_1||health_compasion_past_history_1||health_compasion_diabetes_1||health_compasion_illicitdrugs_1||health_compasion_tobacco_1||health_compasion_alcohol_1||health_compasion_smoke_1||health_compasion_blood_pressure_1||health_compasion_medical_health_companion_2_1||health_compasion_medical_health_companion_3_1||health_compasion_medical_health_companion_4_1||health_compasion_medical_health_companion_5_1||health_compasion_medical_health_companion_6_1",
                        "is": "Y"
                    },
                    "width": "100%",
                    "additionalOptions": {
                        "placeholder": "Duration of Condition",
                        "members": [
                            "self",
                            "spouse"
                        ]
                    },
                    "validate": {
                        "required": true
                    },
                    "matches": "alphanum"
                },
                {
                    "type": "text",
                    "question": "Details of Treatment",
                    "name": "health_compasion_medical_Q7_1",
                    "parent": "health_compasion_medical_1",
                    "render": {
                        "when": "health_compasion_pregnant_1||health_compasion_medical_1||health_compasion_past_history_1||health_compasion_diabetes_1||health_compasion_illicitdrugs_1||health_compasion_tobacco_1||health_compasion_alcohol_1||health_compasion_smoke_1||health_compasion_blood_pressure_1||health_compasion_medical_health_companion_2_1||health_compasion_medical_health_companion_3_1||health_compasion_medical_health_companion_4_1||health_compasion_medical_health_companion_5_1||health_compasion_medical_health_companion_6_1",
                        "is": "Y"
                    },
                    "width": "100%",
                    "additionalOptions": {
                        "placeholder": "Details of Treatment",
                        "members": [
                            "self",
                            "spouse"
                        ]
                    },
                    "validate": {
                        "required": true
                    },
                    "matches": "alphanum"
                }
            ],
            {
                "type": "custom_medical",
                "name": "health_compasion_pregnant_1",
                "width": "100%",
                "validate": {
                    "selectAtLeastOne": true
                },
                "additionalOptions": {
                    "restrictMaleMembers": true,
                    "label": "To be answered for all female applicants who have EVER been pregnant. Please answer the below questions.",
                    "members": [
                        "self",
                        "spouse"
                    ]
                }
            },
            [
                {
                    "type": "checkBox2",
                    "question": "Currently pregnant",
                    "name": "health_compasion_pregnant_Q1_1",
                    "parent": "health_compasion_pregnant_1",
                    "render": {
                        "when": "",
                        "is": true
                    },
                    "width": "100%",
                    "additionalOptions": {
                        "placeholder": "Currently pregnant",
                        "members": [
                            "self",
                            "spouse"
                        ]
                    },
                    "validate": null,
                    "matches": "alphanum"
                },
                {
                    "type": "checkBox2",
                    "question": "Undergone caesarian section or premature delivery",
                    "name": "health_compasion_pregnant_Q2_1",
                    "parent": "health_compasion_pregnant_1",
                    "render": {
                        "when": "",
                        "is": true
                    },
                    "width": "100%",
                    "additionalOptions": {
                        "placeholder": "Undergone caesarian section or premature delivery",
                        "members": [
                            "self",
                            "spouse"
                        ]
                    },
                    "validate": null,
                    "matches": "alphanum"
                },
                {
                    "type": "checkBox2",
                    "question": "Undergone abnormal or complicated pregnancy",
                    "name": "health_compasion_pregnant_Q3_1",
                    "parent": "health_compasion_pregnant_1",
                    "render": {
                        "when": "",
                        "is": true
                    },
                    "width": "100%",
                    "additionalOptions": {
                        "placeholder": "Undergone abnormal or complicated pregnancy",
                        "members": [
                            "self",
                            "spouse"
                        ]
                    },
                    "validate": null,
                    "matches": "alphanum"
                },
                {
                    "type": "checkBox2",
                    "question": "Undergone abortion",
                    "name": "health_compasion_pregnant_Q4_1",
                    "parent": "health_compasion_pregnant_1",
                    "render": {
                        "when": "",
                        "is": true
                    },
                    "width": "100%",
                    "additionalOptions": {
                        "placeholder": "Undergone abortion",
                        "members": [
                            "self",
                            "spouse"
                        ]
                    },
                    "validate": null,
                    "matches": "alphanum"
                },
                {
                    "type": "text",
                    "question": "Please specify the number of pregnancies (if any)",
                    "name": "health_compasion_pregnant_Q5_1",
                    "parent": "health_compasion_pregnant_1",
                    "render": {
                        "when": "",
                        "is": true
                    },
                    "width": "100%",
                    "additionalOptions": {
                        "placeholder": "Please specify the number of pregnancies (if any)",
                        "members": [
                            "self",
                            "spouse"
                        ]
                    },
                    "validate": {
                        "required": true
                    },
                    "matches": "number",
                    "allow": "onlyNumbers"
                },
                {
                    "type": "text",
                    "question": "Please specify the number of live births (if any)",
                    "name": "health_compasion_pregnant_Q6_1",
                    "parent": "health_compasion_pregnant_1",
                    "render": {
                        "when": "",
                        "is": true
                    },
                    "width": "100%",
                    "additionalOptions": {
                        "placeholder": "Please specify the number of live births (if any)",
                        "members": [
                            "self",
                            "spouse"
                        ]
                    },
                    "validate": {
                        "required": true
                    },
                    "matches": "number",
                    "allow": "onlyNumbers"
                }
            ]
        ],
        "10026860_father_in_law": [
            {
                "type": "custom_toggle",
                "name": "health_compasion_medical_health_companion_1_1",
                "width": "100%",
                "validate": {
                    "selectAtLeastOne": true
                },
                "additionalOptions": {
                    "label": "Has any proposal for life, health, hospital daily cash, Personal Accident or critical illness insurance on the life of the applicant ever been declined, postponed, loaded or subjected to any special conditions such as exclusions by any insurance company?",
                    "members": [
                        "father_in_law"
                    ]
                }
            },
            {
                "type": "custom_toggle",
                "name": "health_compasion_medical_health_companion_2_1",
                "width": "100%",
                "additionalOptions": {
                    "label": "Is the applicant currently suffering from any symptom(s) or complaint(s) persisting from more than five consecutive days for which he/she has not consulted a doctor?",
                    "showMembers": false,
                    "members": [
                        "father_in_law"
                    ]
                }
            },
            {
                "type": "custom_toggle",
                "name": "health_compasion_medical_health_companion_3_1",
                "width": "100%",
                "additionalOptions": {
                    "label": "Other than routine health check-up, has the applicant undergone or been advised to undergo any diagnostic test/investigation including but not limited to Thyroid Profile, Treadmill test, Angiography, Echocardiography, Endoscopy, Ultrasound, CT Scan, MRI, Biopsy and FNAC?",
                    "showMembers": false,
                    "members": [
                        "father_in_law"
                    ]
                }
            },
            {
                "type": "custom_toggle",
                "name": "health_compasion_medical_health_companion_4_1",
                "width": "100%",
                "additionalOptions": {
                    "label": "Has the applicant been prescribed or taken any form of treatment or medication (including oral / inhalation / injection), for a period of more than seven days?",
                    "showMembers": false,
                    "members": [
                        "father_in_law"
                    ]
                }
            },
            {
                "type": "custom_toggle",
                "name": "health_compasion_medical_health_companion_6_1",
                "width": "100%",
                "additionalOptions": {
                    "showMembersIf": "health_compasion_medical_health_companion_2_1||health_compasion_medical_health_companion_3_1||health_compasion_medical_health_companion_4_1||health_compasion_medical_health_companion_5_1||health_compasion_medical_health_companion_6_1",
                    "label": "Has the applicant undergone or been advised to undergo or does he/she plan to undergo any form of surgery or procedure?",
                    "members": [
                        "father_in_law"
                    ]
                }
            },
            [
                {
                    "type": "checkboxGroup",
                    "name": "health_compasion_health_compasion_checkbox_group",
                    "parent": "health_compasion_medical_health_companion_6_1",
                    "width": "100%",
                    "validate": {
                        "selectAtLeastOneCheckbox": true
                    },
                    "render": {
                        "when": "health_compasion_medical_health_companion_2_1||health_compasion_medical_health_companion_3_1||health_compasion_medical_health_companion_4_1||health_compasion_medical_health_companion_5_1||health_compasion_medical_health_companion_6_1",
                        "is": "Y"
                    },
                    "additionalOptions": {
                        "showMembersIf": "health_compasion_medical_health_companion_2_1||health_compasion_medical_health_companion_3_1||health_compasion_medical_health_companion_4_1||health_compasion_medical_health_companion_5_1||health_compasion_medical_health_companion_6_1",
                        "members": [
                            "father_in_law"
                        ]
                    },
                    "subQuestion": [
                        {
                            "type": "checkBox2",
                            "question": "Cancer & related disorders",
                            "parent": "medical_health_companion_6_1",
                            "name": "health_compasion_cancer_Q_1",
                            "validate": {
                                "selectAtLeastOne": true,
                                "matches": "alphanum"
                            },
                            "render": {
                                "when": "health_compasion_medical_health_companion_2_1||health_compasion_medical_health_companion_3_1||health_compasion_medical_health_companion_4_1||health_compasion_medical_health_companion_5_1||health_compasion_medical_health_companion_6_1",
                                "is": "Y"
                            },
                            "width": "100%",
                            "additionalOptions": {
                                "placeholder": "Cancer & related disorders"
                            }
                        },
                        {
                            "type": "checkBox2",
                            "question": "Kidney, urinary and prostate disorders",
                            "parent": "medical_health_companion_6_1",
                            "name": "health_compasion_kidney_Q_1",
                            "validate": {
                                "selectAtLeastOne": true,
                                "matches": "alphanum"
                            },
                            "render": {
                                "when": "health_compasion_medical_health_companion_2_1||health_compasion_medical_health_companion_3_1||health_compasion_medical_health_companion_4_1||health_compasion_medical_health_companion_5_1||health_compasion_medical_health_companion_6_1",
                                "is": "Y"
                            },
                            "width": "100%",
                            "additionalOptions": {
                                "placeholder": "Kidney, urinary and prostate disorders"
                            }
                        },
                        {
                            "type": "checkBox2",
                            "question": "Heart and circulatory system related disorders",
                            "parent": "medical_health_companion_6_1",
                            "name": "health_compasion_heart_problem_Q_1",
                            "validate": {
                                "selectAtLeastOne": true,
                                "matches": "alphanum"
                            },
                            "render": {
                                "when": "health_compasion_medical_health_companion_2_1||health_compasion_medical_health_companion_3_1||health_compasion_medical_health_companion_4_1||health_compasion_medical_health_companion_5_1||health_compasion_medical_health_companion_6_1",
                                "is": "Y"
                            },
                            "width": "100%",
                            "additionalOptions": {
                                "placeholder": "Heart and circulatory system related disorders"
                            }
                        },
                        {
                            "type": "checkBox2",
                            "question": "Lung and respiratory disorders",
                            "parent": "medical_health_companion_6_1",
                            "name": "health_compasion_lung_disorder_Q_1",
                            "validate": {
                                "selectAtLeastOne": true,
                                "matches": "alphanum"
                            },
                            "render": {
                                "when": "health_compasion_medical_health_companion_2_1||health_compasion_medical_health_companion_3_1||health_compasion_medical_health_companion_4_1||health_compasion_medical_health_companion_5_1||health_compasion_medical_health_companion_6_1",
                                "is": "Y"
                            },
                            "width": "100%",
                            "additionalOptions": {
                                "placeholder": "Lung and respiratory disorders"
                            }
                        },
                        {
                            "type": "checkBox2",
                            "question": "Stomach, intestine, liver, gall bladder, pancreas, appendix disorders",
                            "parent": "medical_health_companion_6_1",
                            "name": "health_compasion_stomach_disorder_Q_1",
                            "validate": {
                                "selectAtLeastOne": true,
                                "matches": "alphanum"
                            },
                            "render": {
                                "when": "health_compasion_medical_health_companion_2_1||health_compasion_medical_health_companion_3_1||health_compasion_medical_health_companion_4_1||health_compasion_medical_health_companion_5_1||health_compasion_medical_health_companion_6_1",
                                "is": "Y"
                            },
                            "width": "100%",
                            "additionalOptions": {
                                "placeholder": "Stomach, intestine, liver, gall bladder, pancreas, appendix disorders"
                            }
                        },
                        {
                            "type": "checkBox2",
                            "question": "Psychiatric and nervous disorders (brain/spine)",
                            "parent": "medical_health_companion_6_1",
                            "name": "health_compasion_psychiatric_disorder_Q_1",
                            "validate": {
                                "selectAtLeastOne": true,
                                "matches": "alphanum"
                            },
                            "render": {
                                "when": "health_compasion_medical_health_companion_2_1||health_compasion_medical_health_companion_3_1||health_compasion_medical_health_companion_4_1||health_compasion_medical_health_companion_5_1||health_compasion_medical_health_companion_6_1",
                                "is": "Y"
                            },
                            "width": "100%",
                            "additionalOptions": {
                                "placeholder": "Psychiatric and nervous disorders (brain/spine)"
                            }
                        },
                        {
                            "type": "checkBox2",
                            "question": "Endocrine disorders",
                            "parent": "medical_health_companion_6_1",
                            "name": "health_compasion_endocrine_disorder_Q_1",
                            "validate": {
                                "selectAtLeastOne": true,
                                "matches": "alphanum"
                            },
                            "render": {
                                "when": "health_compasion_medical_health_companion_2_1||health_compasion_medical_health_companion_3_1||health_compasion_medical_health_companion_4_1||health_compasion_medical_health_companion_5_1||health_compasion_medical_health_companion_6_1",
                                "is": "Y"
                            },
                            "width": "100%",
                            "additionalOptions": {
                                "placeholder": "Endocrine disorders"
                            }
                        },
                        {
                            "type": "checkBox2",
                            "question": "Bone and muscle disorders Arthritis, ligament / cartilage",
                            "parent": "medical_health_companion_6_1",
                            "name": "health_compasion_bone_disorder_Q_1",
                            "validate": {
                                "selectAtLeastOne": true,
                                "matches": "alphanum"
                            },
                            "render": {
                                "when": "health_compasion_medical_health_companion_2_1||health_compasion_medical_health_companion_3_1||health_compasion_medical_health_companion_4_1||health_compasion_medical_health_companion_5_1||health_compasion_medical_health_companion_6_1",
                                "is": "Y"
                            },
                            "width": "100%",
                            "additionalOptions": {
                                "placeholder": "Bone and muscle disorders Arthritis, ligament / cartilage"
                            }
                        },
                        {
                            "type": "checkBox2",
                            "question": "Ear, nose, eye and throat disorders",
                            "parent": "medical_health_companion_6_1",
                            "name": "health_compasion_ear_disorder_Q_1",
                            "validate": {
                                "selectAtLeastOne": true,
                                "matches": "alphanum"
                            },
                            "render": {
                                "when": "health_compasion_medical_health_companion_2_1||health_compasion_medical_health_companion_3_1||health_compasion_medical_health_companion_4_1||health_compasion_medical_health_companion_5_1||health_compasion_medical_health_companion_6_1",
                                "is": "Y"
                            },
                            "width": "100%",
                            "additionalOptions": {
                                "placeholder": "Ear, nose, eye and throat disorders"
                            }
                        },
                        {
                            "type": "checkBox2",
                            "question": "Gynaecological disorders",
                            "parent": "medical_health_companion_6_1",
                            "name": "health_compasion_gynaecological_disorder_Q_1",
                            "validate": {
                                "selectAtLeastOne": true,
                                "matches": "alphanum"
                            },
                            "render": {
                                "when": "health_compasion_medical_health_companion_2_1||health_compasion_medical_health_companion_3_1||health_compasion_medical_health_companion_4_1||health_compasion_medical_health_companion_5_1||health_compasion_medical_health_companion_6_1",
                                "is": "Y"
                            },
                            "width": "100%",
                            "additionalOptions": {
                                "placeholder": "Gynaecological disorders"
                            }
                        },
                        {
                            "type": "checkBox2",
                            "question": "Blood-related disorders",
                            "parent": "medical_health_companion_6_1",
                            "name": "health_compasion_bloodrelated_disorder_Q_1",
                            "validate": {
                                "selectAtLeastOne": true,
                                "matches": "alphanum"
                            },
                            "render": {
                                "when": "health_compasion_medical_health_companion_2_1||health_compasion_medical_health_companion_3_1||health_compasion_medical_health_companion_4_1||health_compasion_medical_health_companion_5_1||health_compasion_medical_health_companion_6_1",
                                "is": "Y"
                            },
                            "width": "100%",
                            "additionalOptions": {
                                "placeholder": "Blood-related disorders"
                            }
                        },
                        {
                            "type": "checkBox2",
                            "question": "Skin disorders",
                            "parent": "medical_health_companion_6_1",
                            "name": "health_compasion_skin_disorder_Q_1",
                            "validate": {
                                "selectAtLeastOne": true,
                                "matches": "alphanum"
                            },
                            "render": {
                                "when": "health_compasion_medical_health_companion_2_1||health_compasion_medical_health_companion_3_1||health_compasion_medical_health_companion_4_1||health_compasion_medical_health_companion_5_1||health_compasion_medical_health_companion_6_1",
                                "is": "Y"
                            },
                            "width": "100%",
                            "additionalOptions": {
                                "placeholder": "Skin disorders"
                            }
                        },
                        {
                            "type": "checkBox2",
                            "question": "Any other conditions",
                            "parent": "medical_health_companion_6_1",
                            "name": "health_compasion_other_disorder_Q_1",
                            "validate": {
                                "selectAtLeastOne": true,
                                "matches": "alphanum"
                            },
                            "render": {
                                "when": "health_compasion_medical_health_companion_2_1||health_compasion_medical_health_companion_3_1||health_compasion_medical_health_companion_4_1||health_compasion_medical_health_companion_5_1||health_compasion_medical_health_companion_6_1",
                                "is": "Y"
                            },
                            "width": "100%",
                            "additionalOptions": {
                                "placeholder": "Any other conditions"
                            }
                        }
                    ]
                }
            ],
            {
                "type": "custom_medical",
                "name": "health_compasion_blood_pressure_1",
                "width": "100%",
                "validate": {
                    "selectAtLeastOne": true,
                    "matches": "validYear/1/100"
                },
                "additionalOptions": {
                    "label": "Does the Applicant have Hypertension or High Blood Pressure?",
                    "members": [
                        "father_in_law"
                    ]
                }
            },
            [
                {
                    "type": "select",
                    "name": "health_compasion_blood_pressure_Q7_1",
                    "parent": "health_compasion_blood_pressure_1",
                    "render": {
                        "when": "",
                        "is": true
                    },
                    "width": "100%",
                    "additionalOptions": {
                        "placeholder": "How does the applicant manage his/her Hypertension / High Blood Pressure?",
                        "options": {
                            "A": "One medicine",
                            "B": "Two medicines",
                            "C": "Three or more medicines",
                            "D": "No medicine"
                        },
                        "members": [
                            "father_in_law"
                        ]
                    },
                    "validate": {
                        "required": true
                    }
                },
                {
                    "type": "select",
                    "name": "health_compasion_blood_pressure_Q8_1",
                    "parent": "health_compasion_blood_pressure_1",
                    "render": {
                        "when": "",
                        "is": true
                    },
                    "width": "100%",
                    "additionalOptions": {
                        "placeholder": "How does the applicant manage his/her Hypertension / High Blood Pressure?",
                        "options": {
                            "A": "0-1 years",
                            "B": "1-5 Years ",
                            "C": "5-10 years",
                            "D": "More than 10 Years"
                        },
                        "members": [
                            "father_in_law"
                        ]
                    },
                    "validate": {
                        "required": true
                    }
                }
            ],
            {
                "type": "custom_medical",
                "name": "health_compasion_diabetes_1",
                "width": "100%",
                "validate": {
                    "selectAtLeastOne": true,
                    "matches": "validYear/1/100"
                },
                "additionalOptions": {
                    "label": "Does the Applicant have diabetes or pre-diabetes or has he/she EVER had high blood sugar?",
                    "members": [
                        "father_in_law"
                    ]
                }
            },
            [
                {
                    "type": "select",
                    "name": "health_compasion_diabetes_Q2_1",
                    "parent": "health_compasion_diabetes_1",
                    "render": {
                        "when": "",
                        "is": true
                    },
                    "width": "100%",
                    "additionalOptions": {
                        "placeholder": "How long ago was the applicant first diagnosed with diabetes / pre-diabetes / high blood sugar?",
                        "options": {
                            "A": "0-1 years",
                            "B": "1-5 Years ",
                            "C": "5-10 years",
                            "D": "More than 10 Years"
                        },
                        "members": [
                            "father_in_law"
                        ]
                    },
                    "validate": {
                        "required": true
                    }
                },
                {
                    "type": "checkBox2",
                    "question": "Insulin",
                    "name": "health_compasion_diabetes_Q3_1",
                    "parent": "health_compasion_diabetes_1",
                    "render": {
                        "when": "",
                        "is": true
                    },
                    "width": "100%",
                    "additionalOptions": {
                        "placeholder": "Insulin",
                        "members": [
                            "father_in_law"
                        ]
                    },
                    "validate": {
                        "matches": "alphanum"
                    }
                },
                {
                    "type": "checkBox2",
                    "question": "Oral diabetic medication",
                    "name": "health_compasion_diabetes_Q4_1",
                    "parent": "health_compasion_diabetes_1",
                    "render": {
                        "when": "",
                        "is": true
                    },
                    "width": "100%",
                    "additionalOptions": {
                        "placeholder": "Oral diabetic medication",
                        "members": [
                            "father_in_law"
                        ]
                    },
                    "validate": {
                        "matches": "alphanum"
                    }
                },
                {
                    "type": "checkBox2",
                    "question": "Homeopathic or other AYUSH treatment",
                    "name": "health_compasion_diabetes_Q5_1",
                    "parent": "health_compasion_diabetes_1",
                    "render": {
                        "when": "",
                        "is": true
                    },
                    "width": "100%",
                    "additionalOptions": {
                        "placeholder": "Homeopathic or other AYUSH treatment",
                        "members": [
                            "father_in_law"
                        ]
                    },
                    "validate": {
                        "matches": "alphanum"
                    }
                },
                {
                    "type": "checkBox2",
                    "question": "No medicine",
                    "name": "health_compasion_diabetes_Q6_1",
                    "parent": "health_compasion_diabetes_1",
                    "render": {
                        "when": "",
                        "is": true
                    },
                    "width": "100%",
                    "additionalOptions": {
                        "placeholder": "No medicine",
                        "members": [
                            "father_in_law"
                        ]
                    },
                    "validate": {
                        "matches": "alphanum"
                    }
                }
            ],
            {
                "type": "custom_medical",
                "name": "health_compasion_smoke_1",
                "width": "100%",
                "validate": {
                    "selectAtLeastOne": true
                },
                "additionalOptions": {
                    "label": "Does any of the applicants Smokes Cigarettes/Bidi/Cigar?",
                    "additionalQuestions": null,
                    "members": [
                        "father_in_law"
                    ]
                }
            },
            [
                {
                    "type": "text",
                    "name": "health_compasion_smoke_Q1_1",
                    "parent": "health_compasion_smoke_1",
                    "width": "100%",
                    "render": {
                        "when": "",
                        "is": true
                    },
                    "additionalOptions": {
                        "placeholder": "Please specify consumption per day",
                        "members": [
                            "father_in_law"
                        ]
                    },
                    "validate": {
                        "required": true
                    },
                    "maxLength": 5,
                    "allow": "onlyNumbers"
                }
            ],
            {
                "type": "custom_medical",
                "name": "health_compasion_alcohol_1",
                "width": "100%",
                "validate": {
                    "selectAtLeastOne": true
                },
                "additionalOptions": {
                    "label": "Does any of the applicants takes alcohol?",
                    "members": [
                        "father_in_law"
                    ]
                }
            },
            [
                {
                    "type": "checkBox2",
                    "question": "Is Daily Drinker",
                    "name": "health_compasion_alcohol_Q1_1",
                    "parent": "health_compasion_alcohol_1",
                    "render": {
                        "when": "",
                        "is": true
                    },
                    "width": "100%",
                    "additionalOptions": {
                        "placeholder": "Is Daily Drinker",
                        "members": [
                            "father_in_law"
                        ]
                    },
                    "matches": "alphanum"
                },
                {
                    "type": "text",
                    "question": "Please specify ml per week",
                    "name": "health_compasion_alcohol_Q2_1",
                    "parent": "health_compasion_alcohol_1",
                    "width": "100%",
                    "render": {
                        "when": "",
                        "is": true
                    },
                    "additionalOptions": {
                        "placeholder": "Please specify ml per week",
                        "members": [
                            "father_in_law"
                        ]
                    },
                    "validate": {
                        "required": true
                    },
                    "maxLength": 5,
                    "allow": "onlyNumbers"
                }
            ],
            {
                "type": "custom_medical",
                "name": "health_compasion_tobacco_1",
                "width": "100%",
                "validate": {
                    "selectAtLeastOne": true
                },
                "additionalOptions": {
                    "label": "Does any of the applicants Chew tobacco/Gutkha/Pan Masala?",
                    "members": [
                        "father_in_law"
                    ]
                }
            },
            [
                {
                    "type": "text",
                    "question": "Please specify number of pouches per day",
                    "name": "health_compasion_tobacco_Q1_1",
                    "parent": "health_compasion_tobacco_1",
                    "width": "100%",
                    "render": {
                        "when": "",
                        "is": true
                    },
                    "additionalOptions": {
                        "placeholder": "Please specify number of pouches per day",
                        "members": [
                            "father_in_law"
                        ]
                    },
                    "validate": {
                        "required": true
                    },
                    "maxLength": 5,
                    "allow": "onlyNumbers"
                }
            ],
            {
                "type": "custom_medical",
                "name": "health_compasion_illicitdrugs_1",
                "width": "100%",
                "validate": {
                    "selectAtLeastOne": true
                },
                "additionalOptions": {
                    "label": "Does any of the applicants takes Illicit drugs?",
                    "members": [
                        "father_in_law"
                    ]
                }
            },
            [
                {
                    "type": "text",
                    "question": "Please specify number of pouches per day",
                    "name": "health_compasion_illicitdrugs_Q1_1",
                    "parent": "health_compasion_illicitdrugs_1",
                    "width": "100%",
                    "render": {
                        "when": "",
                        "is": true
                    },
                    "additionalOptions": {
                        "placeholder": "Please specify number of pouches per day",
                        "members": [
                            "father_in_law"
                        ]
                    },
                    "validate": {
                        "required": true
                    },
                    "maxLength": 5,
                    "allow": "onlyNumbers"
                }
            ],
            {
                "type": "custom_medical",
                "name": "health_compasion_past_history_1",
                "width": "100%",
                "validate": {
                    "selectAtLeastOne": true
                },
                "additionalOptions": {
                    "label": "Have any first degree relatives (i.e. parents, brothers, sisters or children) of ANY of the applicants (who are not themselves applicants for this insurance policy) had cancer, diabetes, hypertension (high blood pressure), heart disease, kidney disease, polycystic kidney disease, mental or nervous disorder (including alzheimer's disease), stroke, multiple sclerosis, motor neurone disease or any other hereditary disorders?",
                    "members": [
                        "father_in_law"
                    ]
                }
            },
            [
                {
                    "type": "text",
                    "name": "health_compasion_past_history_Q1_1",
                    "parent": "health_compasion_past_history_1",
                    "render": {
                        "when": "",
                        "is": true
                    },
                    "width": "100%",
                    "additionalOptions": {
                        "placeholder": "Applicant Number",
                        "members": [
                            "father_in_law"
                        ]
                    },
                    "validate": {
                        "required": true
                    },
                    "matches": "alphanum"
                },
                {
                    "type": "select",
                    "name": "health_compasion_past_history_Q2_1",
                    "parent": "health_compasion_past_history_1",
                    "render": {
                        "when": "",
                        "is": true
                    },
                    "width": "100%",
                    "additionalOptions": {
                        "placeholder": "Relationship to the applicant",
                        "options": {
                            "Spouse": "Spouse",
                            "Mother": "Mother",
                            "Father": "Father",
                            "Son": "Son",
                            "Daughter": "Daughter",
                            "Brother": "Brother",
                            "Sister": "Sister",
                            "Father-in-law": "Father-in-law",
                            "Mother-in-law": "Mother-in-law",
                            "Son-in-law": "Son-in-law",
                            "Uncle": "Uncle",
                            "Aunt": "Aunt",
                            "Daughter-in-law": "Daughter-in-law",
                            "Nephew": "Nephew",
                            "Niece": "Niece",
                            "Brother-in-Law": "Brother-in-Law",
                            "Sister-in-Law": "Sister-in-Law",
                            "Grandfather": "Grandfather",
                            "Grandmother": "Grandmother",
                            "Grandson": "Grandson",
                            "Granddaughter": "Granddaughter",
                            "Others": "Others"
                        },
                        "members": [
                            "father_in_law"
                        ]
                    },
                    "validate": {
                        "required": true
                    }
                },
                {
                    "type": "text",
                    "question": "Dosage",
                    "name": "health_compasion_past_history_Q3_1",
                    "parent": "health_compasion_past_history_1",
                    "render": {
                        "when": "",
                        "is": true
                    },
                    "width": "100%",
                    "additionalOptions": {
                        "placeholder": "Disease or disorder",
                        "members": [
                            "father_in_law"
                        ]
                    },
                    "validate": {
                        "required": true
                    },
                    "matches": "alphanum"
                },
                {
                    "type": "text",
                    "question": "Age at onset condition",
                    "name": "health_compasion_past_history_Q4_1",
                    "parent": "health_compasion_past_history_1",
                    "render": {
                        "when": "",
                        "is": true
                    },
                    "width": "100%",
                    "additionalOptions": {
                        "placeholder": "Age at onset condition",
                        "members": [
                            "father_in_law"
                        ]
                    },
                    "validate": {
                        "required": true
                    },
                    "matches": "number"
                },
                {
                    "type": "checkBox2",
                    "question": "is alive",
                    "name": "health_compasion_past_history_Q5_1",
                    "parent": "health_compasion_past_history_1",
                    "render": {
                        "when": "",
                        "is": true
                    },
                    "width": "100%",
                    "additionalOptions": {
                        "placeholder": "is alive",
                        "members": [
                            "father_in_law"
                        ]
                    },
                    "validate": {
                        "required": true
                    },
                    "matches": "alphanum"
                },
                {
                    "type": "text",
                    "question": "current age",
                    "name": "health_compasion_past_history_Q8_1",
                    "parent": "health_compasion_past_history_1",
                    "render": {
                        "when": "",
                        "is": true
                    },
                    "width": "100%",
                    "additionalOptions": {
                        "placeholder": "current age",
                        "members": [
                            "father_in_law"
                        ]
                    },
                    "validate": {
                        "required": true
                    },
                    "matches": "number"
                },
                {
                    "type": "text",
                    "question": "Age at death (if applicable)",
                    "name": "health_compasion_past_history_Q6_1",
                    "parent": "health_compasion_past_history_1",
                    "render": {
                        "when": "",
                        "is": true
                    },
                    "width": "100%",
                    "additionalOptions": {
                        "placeholder": "Age at death (if applicable)",
                        "members": [
                            "father_in_law"
                        ]
                    },
                    "validate": {
                        "required": true
                    },
                    "matches": "number",
                    "allow": "onlyNumbers"
                },
                {
                    "type": "text",
                    "question": "Cause of death(if applicable)",
                    "name": "health_compasion_past_history_Q7_1",
                    "parent": "health_compasion_past_history_1",
                    "render": {
                        "when": "",
                        "is": true
                    },
                    "width": "100%",
                    "additionalOptions": {
                        "placeholder": "Cause of death(if applicable)",
                        "members": [
                            "father_in_law"
                        ]
                    },
                    "validate": {
                        "required": true
                    },
                    "matches": "alphanum"
                }
            ],
            {
                "type": "custom_medical",
                "name": "health_compasion_medical_1",
                "width": "100%",
                "validate": {
                    "selectAtLeastOne": true
                },
                "additionalOptions": {
                    "showMembersIf": "health_compasion_pregnant_1||health_compasion_past_history_1||health_compasion_diabetes_1||health_compasion_illicitdrugs_1||health_compasion_tobacco_1||health_compasion_alcohol_1||health_compasion_smoke_1||health_compasion_blood_pressure_1||health_compasion_medical_health_companion_2_1||health_compasion_medical_health_companion_3_1||health_compasion_medical_health_companion_4_1||health_compasion_medical_health_companion_5_1||health_compasion_medical_health_companion_6_1",
                    "label": "If insured person marked any medical details .Please fill up form(Mandatory)",
                    "members": [
                        "father_in_law"
                    ]
                }
            },
            [
                {
                    "type": "text",
                    "name": "health_compasion_medical_Q1_1",
                    "parent": "health_compasion_medical_1",
                    "render": {
                        "when": "health_compasion_pregnant_1||health_compasion_medical_1||health_compasion_past_history_1||health_compasion_diabetes_1||health_compasion_illicitdrugs_1||health_compasion_tobacco_1||health_compasion_alcohol_1||health_compasion_smoke_1||health_compasion_blood_pressure_1||health_compasion_medical_health_companion_2_1||health_compasion_medical_health_companion_3_1||health_compasion_medical_health_companion_4_1||health_compasion_medical_health_companion_5_1||health_compasion_medical_health_companion_6_1",
                        "is": "Y"
                    },
                    "width": "100%",
                    "additionalOptions": {
                        "placeholder": "Treating doctor’s name & contact details",
                        "members": [
                            "father_in_law"
                        ]
                    },
                    "validate": {
                        "required": true
                    },
                    "matches": "alphanum"
                },
                {
                    "type": "text",
                    "question": "Dosage",
                    "name": "health_compasion_medical_Q2_1",
                    "parent": "health_compasion_medical_1",
                    "render": {
                        "when": "health_compasion_pregnant_1||health_compasion_medical_1||health_compasion_past_history_1||health_compasion_diabetes_1||health_compasion_illicitdrugs_1||health_compasion_tobacco_1||health_compasion_alcohol_1||health_compasion_smoke_1||health_compasion_blood_pressure_1||health_compasion_medical_health_companion_2_1||health_compasion_medical_health_companion_3_1||health_compasion_medical_health_companion_4_1||health_compasion_medical_health_companion_5_1||health_compasion_medical_health_companion_6_1",
                        "is": "Y"
                    },
                    "width": "100%",
                    "additionalOptions": {
                        "placeholder": "Dosage",
                        "members": [
                            "father_in_law"
                        ]
                    },
                    "validate": {
                        "required": true
                    },
                    "matches": "alphanum"
                },
                {
                    "type": "text",
                    "question": "Medication(s)",
                    "name": "health_compasion_medical_Q3_1",
                    "parent": "health_compasion_medical_1",
                    "render": {
                        "when": "health_compasion_pregnant_1||health_compasion_medical_1||health_compasion_past_history_1||health_compasion_diabetes_1||health_compasion_illicitdrugs_1||health_compasion_tobacco_1||health_compasion_alcohol_1||health_compasion_smoke_1||health_compasion_blood_pressure_1||health_compasion_medical_health_companion_2_1||health_compasion_medical_health_companion_3_1||health_compasion_medical_health_companion_4_1||health_compasion_medical_health_companion_5_1||health_compasion_medical_health_companion_6_1",
                        "is": "Y"
                    },
                    "width": "100%",
                    "additionalOptions": {
                        "placeholder": "Medication(s)",
                        "members": [
                            "father_in_law"
                        ]
                    },
                    "validate": {
                        "required": true
                    },
                    "matches": "alphanum"
                },
                {
                    "type": "date",
                    "question": "Onset date (DD/MM/ YYYY)\t",
                    "name": "health_compasion_medical_Q4_1",
                    "parent": "health_compasion_medical_1",
                    "render": {
                        "when": "health_compasion_pregnant_1||health_compasion_medical_1||health_compasion_past_history_1||health_compasion_diabetes_1||health_compasion_illicitdrugs_1||health_compasion_tobacco_1||health_compasion_alcohol_1||health_compasion_smoke_1||health_compasion_blood_pressure_1||health_compasion_medical_health_companion_2_1||health_compasion_medical_health_companion_3_1||health_compasion_medical_health_companion_4_1||health_compasion_medical_health_companion_5_1||health_compasion_medical_health_companion_6_1",
                        "is": "Y"
                    },
                    "width": "100%",
                    "additionalOptions": {
                        "placeholder": "Onset date (DD/MM/ YYYY)",
                        "maxLength": 10,
                        "members": [
                            "father_in_law"
                        ]
                    },
                    "rules": [
                        "date_format:d-m-Y",
                        "before_or_equal:today",
                        "after_or_equal:member_birth_date"
                    ],
                    "validate": {
                        "required": true
                    },
                    "matches": "date",
                    "allow": "dob",
                    "attribute_name": "Onset date"
                },
                {
                    "type": "text",
                    "question": "Details of symptom(s) or investigation(s) or diagnosis or procedure/surgery undergone",
                    "name": "health_compasion_medical_Q5_1",
                    "parent": "health_compasion_medical_1",
                    "render": {
                        "when": "health_compasion_pregnant_1||health_compasion_medical_1||health_compasion_past_history_1||health_compasion_diabetes_1||health_compasion_illicitdrugs_1||health_compasion_tobacco_1||health_compasion_alcohol_1||health_compasion_smoke_1||health_compasion_blood_pressure_1||health_compasion_medical_health_companion_2_1||health_compasion_medical_health_companion_3_1||health_compasion_medical_health_companion_4_1||health_compasion_medical_health_companion_5_1||health_compasion_medical_health_companion_6_1",
                        "is": "Y"
                    },
                    "width": "100%",
                    "additionalOptions": {
                        "placeholder": "Details of symptom(s) or investigation(s) or diagnosis or procedure/surgery undergone",
                        "members": [
                            "father_in_law"
                        ]
                    },
                    "validate": {
                        "required": true
                    },
                    "matches": "alphanum"
                },
                {
                    "type": "text",
                    "question": "Duration of Condition",
                    "name": "health_compasion_medical_Q6_1",
                    "parent": "health_compasion_medical_1",
                    "render": {
                        "when": "health_compasion_pregnant_1||health_compasion_medical_1||health_compasion_past_history_1||health_compasion_diabetes_1||health_compasion_illicitdrugs_1||health_compasion_tobacco_1||health_compasion_alcohol_1||health_compasion_smoke_1||health_compasion_blood_pressure_1||health_compasion_medical_health_companion_2_1||health_compasion_medical_health_companion_3_1||health_compasion_medical_health_companion_4_1||health_compasion_medical_health_companion_5_1||health_compasion_medical_health_companion_6_1",
                        "is": "Y"
                    },
                    "width": "100%",
                    "additionalOptions": {
                        "placeholder": "Duration of Condition",
                        "members": [
                            "father_in_law"
                        ]
                    },
                    "validate": {
                        "required": true
                    },
                    "matches": "alphanum"
                },
                {
                    "type": "text",
                    "question": "Details of Treatment",
                    "name": "health_compasion_medical_Q7_1",
                    "parent": "health_compasion_medical_1",
                    "render": {
                        "when": "health_compasion_pregnant_1||health_compasion_medical_1||health_compasion_past_history_1||health_compasion_diabetes_1||health_compasion_illicitdrugs_1||health_compasion_tobacco_1||health_compasion_alcohol_1||health_compasion_smoke_1||health_compasion_blood_pressure_1||health_compasion_medical_health_companion_2_1||health_compasion_medical_health_companion_3_1||health_compasion_medical_health_companion_4_1||health_compasion_medical_health_companion_5_1||health_compasion_medical_health_companion_6_1",
                        "is": "Y"
                    },
                    "width": "100%",
                    "additionalOptions": {
                        "placeholder": "Details of Treatment",
                        "members": [
                            "father_in_law"
                        ]
                    },
                    "validate": {
                        "required": true
                    },
                    "matches": "alphanum"
                }
            ],
            {
                "type": "custom_medical",
                "name": "health_compasion_pregnant_1",
                "width": "100%",
                "validate": {
                    "selectAtLeastOne": true
                },
                "additionalOptions": {
                    "restrictMaleMembers": true,
                    "label": "To be answered for all female applicants who have EVER been pregnant. Please answer the below questions.",
                    "members": [
                        "father_in_law"
                    ]
                }
            },
            [
                {
                    "type": "checkBox2",
                    "question": "Currently pregnant",
                    "name": "health_compasion_pregnant_Q1_1",
                    "parent": "health_compasion_pregnant_1",
                    "render": {
                        "when": "",
                        "is": true
                    },
                    "width": "100%",
                    "additionalOptions": {
                        "placeholder": "Currently pregnant",
                        "members": [
                            "father_in_law"
                        ]
                    },
                    "validate": null,
                    "matches": "alphanum"
                },
                {
                    "type": "checkBox2",
                    "question": "Undergone caesarian section or premature delivery",
                    "name": "health_compasion_pregnant_Q2_1",
                    "parent": "health_compasion_pregnant_1",
                    "render": {
                        "when": "",
                        "is": true
                    },
                    "width": "100%",
                    "additionalOptions": {
                        "placeholder": "Undergone caesarian section or premature delivery",
                        "members": [
                            "father_in_law"
                        ]
                    },
                    "validate": null,
                    "matches": "alphanum"
                },
                {
                    "type": "checkBox2",
                    "question": "Undergone abnormal or complicated pregnancy",
                    "name": "health_compasion_pregnant_Q3_1",
                    "parent": "health_compasion_pregnant_1",
                    "render": {
                        "when": "",
                        "is": true
                    },
                    "width": "100%",
                    "additionalOptions": {
                        "placeholder": "Undergone abnormal or complicated pregnancy",
                        "members": [
                            "father_in_law"
                        ]
                    },
                    "validate": null,
                    "matches": "alphanum"
                },
                {
                    "type": "checkBox2",
                    "question": "Undergone abortion",
                    "name": "health_compasion_pregnant_Q4_1",
                    "parent": "health_compasion_pregnant_1",
                    "render": {
                        "when": "",
                        "is": true
                    },
                    "width": "100%",
                    "additionalOptions": {
                        "placeholder": "Undergone abortion",
                        "members": [
                            "father_in_law"
                        ]
                    },
                    "validate": null,
                    "matches": "alphanum"
                },
                {
                    "type": "text",
                    "question": "Please specify the number of pregnancies (if any)",
                    "name": "health_compasion_pregnant_Q5_1",
                    "parent": "health_compasion_pregnant_1",
                    "render": {
                        "when": "",
                        "is": true
                    },
                    "width": "100%",
                    "additionalOptions": {
                        "placeholder": "Please specify the number of pregnancies (if any)",
                        "members": [
                            "father_in_law"
                        ]
                    },
                    "validate": {
                        "required": true
                    },
                    "matches": "number",
                    "allow": "onlyNumbers"
                },
                {
                    "type": "text",
                    "question": "Please specify the number of live births (if any)",
                    "name": "health_compasion_pregnant_Q6_1",
                    "parent": "health_compasion_pregnant_1",
                    "render": {
                        "when": "",
                        "is": true
                    },
                    "width": "100%",
                    "additionalOptions": {
                        "placeholder": "Please specify the number of live births (if any)",
                        "members": [
                            "father_in_law"
                        ]
                    },
                    "validate": {
                        "required": true
                    },
                    "matches": "number",
                    "allow": "onlyNumbers"
                }
            ]
        ]
    },
    "Other Details": {
        "10026859_self_spouse": [
            {
                "type": "select",
                "name": "nominee_relation",
                "additionalOptions": {
                    "label": "Relation with Proposer",
                    "options": {
                        "spouse": "Spouse",
                        "mother": "Mother",
                        "father": "Father",
                        "son": "Son",
                        "daughter": "Daughter",
                        "brother": "Brother",
                        "sister": "Sister",
                        "father_in_law": "Father-In-Law",
                        "mother_in_law": "Mother-In-Law",
                        "son_in_law": "Son-in-law",
                        "uncle": "Uncle",
                        "aunt": "Aunt",
                        "daughter_in_law": "Daughter-in-law",
                        "nephew": "Nephew",
                        "niece": "Niece",
                        "brother_in_law": "Brother-in-law",
                        "sister_in_law": "Sister-in-law",
                        "grand_father": "Grandfather",
                        "grand_mother": "Grandmother",
                        "grand_son": "Grand son",
                        "grand_daughter": "Grand daughter",
                        "others": "Others"
                    }
                },
                "validate": {
                    "required": true
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
                    "required": true
                },
                "matches": "address",
                "additionalOptions": {
                    "label": "Nominee Address Line 1",
                    "placeholder": "Nominee Address Line 1",
                    "maxLength": 30
                }
            },
            {
                "type": "text",
                "name": "nominee_address_line_2",
                "validate": {
                    "matches": "address"
                },
                "additionalOptions": {
                    "label": "Nominee Address Line 2",
                    "placeholder": "Nominee Address Line 2"
                },
                "maxLength": 30
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
                },
                "maxLength": 30
            }
        ],
        "10026860_father_in_law": [
            {
                "type": "select",
                "name": "nominee_relation",
                "additionalOptions": {
                    "label": "Relation with Proposer",
                    "options": {
                        "spouse": "Spouse",
                        "mother": "Mother",
                        "father": "Father",
                        "son": "Son",
                        "daughter": "Daughter",
                        "brother": "Brother",
                        "sister": "Sister",
                        "father_in_law": "Father-In-Law",
                        "mother_in_law": "Mother-In-Law",
                        "son_in_law": "Son-in-law",
                        "uncle": "Uncle",
                        "aunt": "Aunt",
                        "daughter_in_law": "Daughter-in-law",
                        "nephew": "Nephew",
                        "niece": "Niece",
                        "brother_in_law": "Brother-in-law",
                        "sister_in_law": "Sister-in-law",
                        "grand_father": "Grandfather",
                        "grand_mother": "Grandmother",
                        "grand_son": "Grand son",
                        "grand_daughter": "Grand daughter",
                        "others": "Others"
                    }
                },
                "validate": {
                    "required": true
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
                    "required": true
                },
                "matches": "address",
                "additionalOptions": {
                    "label": "Nominee Address Line 1",
                    "placeholder": "Nominee Address Line 1",
                    "maxLength": 30
                }
            },
            {
                "type": "text",
                "name": "nominee_address_line_2",
                "validate": {
                    "matches": "address"
                },
                "additionalOptions": {
                    "label": "Nominee Address Line 2",
                    "placeholder": "Nominee Address Line 2"
                },
                "maxLength": 30
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
                },
                "maxLength": 30
            }
        ]
    }
}

export default dummy;