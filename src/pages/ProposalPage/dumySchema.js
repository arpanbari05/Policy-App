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
            "name": "Address for self , spouse",
            "section": "Address for self , spouse",
            "width": "100%"
        },
        {
            "type": "text",
            "name": "address_line_1_10033880",
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
            "name": "address_line_2_10033880",
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
            "name": "address_line_3_10033880",
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
            "name": "pincode_10033880",
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
            "name": "city_10033880",
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
            "name": "state_10033880",
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
                    "matches": "mobile",
                    "required": true
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
                    "matches": "mobile",
                    "required": true
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
        "10033880_self_spouse": [
            {
                "type": "custom_toggle",
                "name": "health_compasion_medical_health_companion_1_1",
                "width": "100%",
                "validate": {
                    "selectAtLeastOne": true
                },
                "additionalOptions": {
                    "label": "Has any proposal for life, health, hospital daily cash, Personal Accident or critical illness insurance on the life of the applicant ever been declined, postponed, loaded or subjected to any special conditions such as exclusions by any insurance company?",
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
                "name": "health_compasion_medical_health_companion_2_1",
                "width": "100%",
                "additionalOptions": {
                    "label": "Is the applicant currently suffering from any symptom(s) or complaint(s) persisting from more than five consecutive days for which he/she has not consulted a doctor?",
                    // "showMembers": false,
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
                "name": "health_compasion_medical_health_companion_3_1",
                "width": "100%",
                "additionalOptions": {
                    "label": "Other than routine health check-up, has the applicant undergone or been advised to undergo any diagnostic test/investigation including but not limited to Thyroid Profile, Treadmill test, Angiography, Echocardiography, Endoscopy, Ultrasound, CT Scan, MRI, Biopsy and FNAC?",
                    // "showMembers": false,
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
                "name": "health_compasion_medical_health_companion_4_1",
                "width": "100%",
                "additionalOptions": {
                    "label": "Has the applicant been prescribed or taken any form of treatment or medication (including oral / inhalation / injection), for a period of more than seven days?",
                    // "showMembers": false,
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
                "name": "health_compasion_medical_health_companion_6_1",
                "width": "100%",
                "additionalOptions": {
                    "showMembersIf": "health_compasion_medical_health_companion_2_1||health_compasion_medical_health_companion_3_1||health_compasion_medical_health_companion_4_1||health_compasion_medical_health_companion_5_1||health_compasion_medical_health_companion_6_1",
                    "label": "Has the applicant undergone or been advised to undergo or does he/she plan to undergo any form of surgery or procedure?",
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
                        "message": {
                            "npos_switch_medical_selection_message": "",
                            "stp_block_message": ""
                        },
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
                        "placeholder": "Select Medicine",
                        "label": "Select Medicine",
                        "options": {
                            "One medicine": "One medicine",
                            "Two medicines": "Two medicines",
                            "Three or more medicines": "Three or more medicines",
                            "No medicine": "No medicine"
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
                        "placeholder": "Select Year",
                        "label": "Select Year",
                        "options": {
                            "0-1 years": "0-1 years",
                            "1-5 Years": "1-5 Years",
                            "5-10 years": "5-10 years",
                            "More than 10 Years": "More than 10 Years"
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
                "name": "health_compasion_diabetes_1",
                "width": "100%",
                "validate": {
                    "selectAtLeastOne": true,
                    "matches": "validYear/1/100"
                },
                "additionalOptions": {
                    "label": "Does the Applicant have diabetes or pre-diabetes or has he/she EVER had high blood sugar?",
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
                        "label": "How long ago was the applicant first diagnosed with diabetes / pre-diabetes / high blood sugar?",
                        "options": {
                            "0-1 years": "0-1 years",
                            "1-5 Years": "1-5 Years",
                            "5-10 years": "5-10 years",
                            "More than 10 Years": "More than 10 Years"
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
                        "maxLength": 5,
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
                "name": "health_compasion_alcohol_1",
                "width": "100%",
                "validate": {
                    "selectAtLeastOne": true
                },
                "additionalOptions": {
                    "label": "Does any of the applicants takes alcohol?",
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
                        "message": {
                            "npos_switch_medical_selection_message": "",
                            "stp_block_message": ""
                        },
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
                        "maxLength": 5,
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
                "name": "health_compasion_tobacco_1",
                "width": "100%",
                "validate": {
                    "selectAtLeastOne": true
                },
                "additionalOptions": {
                    "label": "Does any of the applicants Chew tobacco/Gutkha/Pan Masala?",
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
                        "maxLength": 5,
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
                "name": "health_compasion_illicitdrugs_1",
                "width": "100%",
                "validate": {
                    "selectAtLeastOne": true
                },
                "additionalOptions": {
                    "label": "Does any of the applicants takes Illicit drugs?",
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
                        "maxLength": 5,
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
                "name": "health_compasion_past_history_1",
                "width": "100%",
                "validate": {
                    "selectAtLeastOne": true
                },
                "additionalOptions": {
                    "label": "Have any first degree relatives (i.e. parents, brothers, sisters or children) of ANY of the applicants (who are not themselves applicants for this insurance policy) had cancer, diabetes, hypertension (high blood pressure), heart disease, kidney disease, polycystic kidney disease, mental or nervous disorder (including alzheimer's disease), stroke, multiple sclerosis, motor neurone disease or any other hereditary disorders?",
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
                        "placeholder": "current age in years",
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
                        "placeholder": "Age at death in years (if applicable) ",
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
                        "maxLength": 50,
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
                    "showMembersIf": "health_compasion_pregnant_1||health_compasion_past_history_1||health_compasion_diabetes_1||health_compasion_blood_pressure_1||health_compasion_medical_health_companion_2_1||health_compasion_medical_health_companion_3_1||health_compasion_medical_health_companion_4_1||health_compasion_medical_health_companion_5_1||health_compasion_medical_health_companion_6_1",
                    "label": "If insured person marked any medical details .Please fill up form(Mandatory)",
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
            [
                {
                    "type": "text",
                    "name": "health_compasion_medical_Q1_1",
                    "parent": "health_compasion_medical_1",
                    "render": {
                        "when": "health_compasion_pregnant_1||health_compasion_medical_1||health_compasion_past_history_1||health_compasion_diabetes_1||health_compasion_blood_pressure_1||health_compasion_medical_health_companion_2_1||health_compasion_medical_health_companion_3_1||health_compasion_medical_health_companion_4_1||health_compasion_medical_health_companion_5_1||health_compasion_medical_health_companion_6_1",
                        "is": "Y"
                    },
                    "width": "100%",
                    "additionalOptions": {
                        "placeholder": "Treating doctor’s name & contact details",
                        "mandatorySelectMembers": true,
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
                        "required": true,
                        "matches": "alphanum"
                    }
                },
                {
                    "type": "text",
                    "question": "Dosage",
                    "name": "health_compasion_medical_Q2_1",
                    "parent": "health_compasion_medical_1",
                    "render": {
                        "when": "health_compasion_pregnant_1||health_compasion_medical_1||health_compasion_past_history_1||health_compasion_diabetes_1||health_compasion_blood_pressure_1||health_compasion_medical_health_companion_2_1||health_compasion_medical_health_companion_3_1||health_compasion_medical_health_companion_4_1||health_compasion_medical_health_companion_5_1||health_compasion_medical_health_companion_6_1",
                        "is": "Y"
                    },
                    "width": "100%",
                    "additionalOptions": {
                        "placeholder": "Dosage",
                        "mandatorySelectMembers": true,
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
                        "required": true,
                        "matches": "alphanum"
                    }
                },
                {
                    "type": "text",
                    "question": "Medication(s)",
                    "name": "health_compasion_medical_Q3_1",
                    "parent": "health_compasion_medical_1",
                    "render": {
                        "when": "health_compasion_pregnant_1||health_compasion_medical_1||health_compasion_past_history_1||health_compasion_diabetes_1||health_compasion_blood_pressure_1||health_compasion_medical_health_companion_2_1||health_compasion_medical_health_companion_3_1||health_compasion_medical_health_companion_4_1||health_compasion_medical_health_companion_5_1||health_compasion_medical_health_companion_6_1",
                        "is": "Y"
                    },
                    "width": "100%",
                    "additionalOptions": {
                        "placeholder": "Medication(s)",
                        "mandatorySelectMembers": true,
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
                        "required": true,
                        "matches": "alphanum"
                    }
                },
                {
                    "type": "date",
                    "question": "Onset date (DD/MM/ YYYY)\t",
                    "name": "health_compasion_medical_Q4_1",
                    "parent": "health_compasion_medical_1",
                    "render": {
                        "when": "health_compasion_pregnant_1||health_compasion_medical_1||health_compasion_past_history_1||health_compasion_diabetes_1||health_compasion_blood_pressure_1||health_compasion_medical_health_companion_2_1||health_compasion_medical_health_companion_3_1||health_compasion_medical_health_companion_4_1||health_compasion_medical_health_companion_5_1||health_compasion_medical_health_companion_6_1",
                        "is": "Y"
                    },
                    "width": "100%",
                    "additionalOptions": {
                        "placeholder": "Onset date (DD/MM/ YYYY)",
                        "maxLength": 10,
                        "mandatorySelectMembers": true,
                        "message": {
                            "npos_switch_medical_selection_message": "",
                            "stp_block_message": ""
                        },
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
                        "required": true,
                        "matches": "date"
                    },
                    "allow": "dob",
                    "attribute_name": "Onset date"
                },
                {
                    "type": "text",
                    "question": "Details of symptom(s) or investigation(s) or diagnosis or procedure/surgery undergone",
                    "name": "health_compasion_medical_Q5_1",
                    "parent": "health_compasion_medical_1",
                    "render": {
                        "when": "health_compasion_pregnant_1||health_compasion_medical_1||health_compasion_past_history_1||health_compasion_diabetes_1||health_compasion_blood_pressure_1||health_compasion_medical_health_companion_2_1||health_compasion_medical_health_companion_3_1||health_compasion_medical_health_companion_4_1||health_compasion_medical_health_companion_5_1||health_compasion_medical_health_companion_6_1",
                        "is": "Y"
                    },
                    "width": "100%",
                    "additionalOptions": {
                        "placeholder": "Details of symptom(s) or investigation(s) or diagnosis or procedure/surgery undergone",
                        "mandatorySelectMembers": true,
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
                    "matches": "alphanum"
                },
                {
                    "type": "text",
                    "question": "Duration of Condition",
                    "name": "health_compasion_medical_Q6_1",
                    "parent": "health_compasion_medical_1",
                    "render": {
                        "when": "health_compasion_pregnant_1||health_compasion_medical_1||health_compasion_past_history_1||health_compasion_diabetes_1||health_compasion_blood_pressure_1||health_compasion_medical_health_companion_2_1||health_compasion_medical_health_companion_3_1||health_compasion_medical_health_companion_4_1||health_compasion_medical_health_companion_5_1||health_compasion_medical_health_companion_6_1",
                        "is": "Y"
                    },
                    "width": "100%",
                    "additionalOptions": {
                        "placeholder": "Duration of Condition",
                        "mandatorySelectMembers": true,
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
                    "matches": "alphanum"
                },
                {
                    "type": "text",
                    "question": "Details of Treatment",
                    "name": "health_compasion_medical_Q7_1",
                    "parent": "health_compasion_medical_1",
                    "render": {
                        "when": "health_compasion_pregnant_1||health_compasion_medical_1||health_compasion_past_history_1||health_compasion_diabetes_1||health_compasion_blood_pressure_1||health_compasion_medical_health_companion_2_1||health_compasion_medical_health_companion_3_1||health_compasion_medical_health_companion_4_1||health_compasion_medical_health_companion_5_1||health_compasion_medical_health_companion_6_1",
                        "is": "Y"
                    },
                    "width": "100%",
                    "additionalOptions": {
                        "placeholder": "Details of Treatment",
                        "mandatorySelectMembers": true,
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
                        "maxLength": 5,
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
                        "maxLength": 5,
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
                    "matches": "number",
                    "allow": "onlyNumbers"
                }
            ],
            {
                "type": "custom_toggle",
                "name": "health_compasion_pep",
                "width": "100%",
                "validate": {
                    "selectAtLeastOne": true
                },
                "additionalOptions": {
                    "label": "Are you a politically exposed person (PEP) or a close relative of PEP?",
                    "message": {
                        "npos_switch_medical_selection_message": "",
                        "stp_block_message": ""
                    },
                    "members": [
                        "self",
                        "spouse"
                    ]
                }
            }
        ]
    },
    "Other Details": {
        "10033880_self_spouse": [
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