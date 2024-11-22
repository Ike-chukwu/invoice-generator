import axios from "axios";
import { getAccessToken, getRefreshToken } from "./stores/auth-store";

export const listOfCountries = [
    { "id": 1, "name": "Afghanistan" },
    { "id": 2, "name": "Albania" },
    { "id": 3, "name": "Algeria" },
    { "id": 4, "name": "Andorra" },
    { "id": 5, "name": "Angola" },
    { "id": 6, "name": "Antigua and Barbuda" },
    { "id": 7, "name": "Argentina" },
    { "id": 8, "name": "Armenia" },
    { "id": 9, "name": "Australia" },
    { "id": 10, "name": "Austria" },
    { "id": 11, "name": "Azerbaijan" },
    { "id": 12, "name": "Bahamas" },
    { "id": 13, "name": "Bahrain" },
    { "id": 14, "name": "Bangladesh" },
    { "id": 15, "name": "Barbados" },
    { "id": 16, "name": "Belarus" },
    { "id": 17, "name": "Belgium" },
    { "id": 18, "name": "Belize" },
    { "id": 19, "name": "Benin" },
    { "id": 20, "name": "Bhutan" },
    { "id": 21, "name": "Bolivia" },
    { "id": 22, "name": "Bosnia and Herzegovina" },
    { "id": 23, "name": "Botswana" },
    { "id": 24, "name": "Brazil" },
    { "id": 25, "name": "Brunei" },
    { "id": 26, "name": "Bulgaria" },
    { "id": 27, "name": "Burkina Faso" },
    { "id": 28, "name": "Burundi" },
    { "id": 29, "name": "Cabo Verde" },
    { "id": 30, "name": "Cambodia" },
    { "id": 31, "name": "Cameroon" },
    { "id": 32, "name": "Canada" },
    { "id": 33, "name": "Central African Republic" },
    { "id": 34, "name": "Chad" },
    { "id": 35, "name": "Chile" },
    { "id": 36, "name": "China" },
    { "id": 37, "name": "Colombia" },
    { "id": 38, "name": "Comoros" },
    { "id": 39, "name": "Congo, Democratic Republic of the" },
    { "id": 40, "name": "Congo, Republic of the" },
    { "id": 41, "name": "Costa Rica" },
    { "id": 42, "name": "Croatia" },
    { "id": 43, "name": "Cuba" },
    { "id": 44, "name": "Cyprus" },
    { "id": 45, "name": "Czech Republic" },
    { "id": 46, "name": "Denmark" },
    { "id": 47, "name": "Djibouti" },
    { "id": 48, "name": "Dominica" },
    { "id": 49, "name": "Dominican Republic" },
    { "id": 50, "name": "East Timor" },
    { "id": 51, "name": "Ecuador" },
    { "id": 52, "name": "Egypt" },
    { "id": 53, "name": "El Salvador" },
    { "id": 54, "name": "Equatorial Guinea" },
    { "id": 55, "name": "Eritrea" },
    { "id": 56, "name": "Estonia" },
    { "id": 57, "name": "Eswatini" },
    { "id": 58, "name": "Ethiopia" },
    { "id": 59, "name": "Fiji" },
    { "id": 60, "name": "Finland" },
    { "id": 61, "name": "France" },
    { "id": 62, "name": "Gabon" },
    { "id": 63, "name": "Gambia" },
    { "id": 64, "name": "Georgia" },
    { "id": 65, "name": "Germany" },
    { "id": 66, "name": "Ghana" },
    { "id": 67, "name": "Greece" },
    { "id": 68, "name": "Grenada" },
    { "id": 69, "name": "Guatemala" },
    { "id": 70, "name": "Guinea" },
    { "id": 71, "name": "Guinea-Bissau" },
    { "id": 72, "name": "Guyana" },
    { "id": 73, "name": "Haiti" },
    { "id": 74, "name": "Honduras" },
    { "id": 75, "name": "Hungary" },
    { "id": 76, "name": "Iceland" },
    { "id": 77, "name": "India" },
    { "id": 78, "name": "Indonesia" },
    { "id": 79, "name": "Iran" },
    { "id": 80, "name": "Iraq" },
    { "id": 81, "name": "Ireland" },
    { "id": 82, "name": "Israel" },
    { "id": 83, "name": "Italy" },
    { "id": 84, "name": "Jamaica" },
    { "id": 85, "name": "Japan" },
    { "id": 86, "name": "Jordan" },
    { "id": 87, "name": "Kazakhstan" },
    { "id": 88, "name": "Kenya" },
    { "id": 89, "name": "Kiribati" },
    { "id": 90, "name": "Korea, North" },
    { "id": 91, "name": "Korea, South" },
    { "id": 92, "name": "Kuwait" },
    { "id": 93, "name": "Kyrgyzstan" },
    { "id": 94, "name": "Laos" },
    { "id": 95, "name": "Latvia" },
    { "id": 96, "name": "Lebanon" },
    { "id": 97, "name": "Lesotho" },
    { "id": 98, "name": "Liberia" },
    { "id": 99, "name": "Libya" },
    { "id": 100, "name": "Liechtenstein" },
    { "id": 101, "name": "Lithuania" },
    { "id": 102, "name": "Luxembourg" },
    { "id": 103, "name": "Madagascar" },
    { "id": 104, "name": "Malawi" },
    { "id": 105, "name": "Malaysia" },
    { "id": 106, "name": "Maldives" },
    { "id": 107, "name": "Mali" },
    { "id": 108, "name": "Malta" },
    { "id": 109, "name": "Marshall Islands" },
    { "id": 110, "name": "Mauritania" },
    { "id": 111, "name": "Mauritius" },
    { "id": 112, "name": "Mexico" },
    { "id": 113, "name": "Micronesia" },
    { "id": 114, "name": "Moldova" },
    { "id": 115, "name": "Monaco" },
    { "id": 116, "name": "Mongolia" },
    { "id": 117, "name": "Montenegro" },
    { "id": 118, "name": "Morocco" },
    { "id": 119, "name": "Mozambique" },
    { "id": 120, "name": "Myanmar" },
    { "id": 121, "name": "Namibia" },
    { "id": 122, "name": "Nauru" },
    { "id": 123, "name": "Nepal" },
    { "id": 124, "name": "Netherlands" },
    { "id": 125, "name": "New Zealand" },
    { "id": 126, "name": "Nicaragua" },
    { "id": 127, "name": "Niger" },
    { "id": 128, "name": "Nigeria" },
    { "id": 129, "name": "North Macedonia" },
    { "id": 130, "name": "Norway" },
    { "id": 131, "name": "Oman" },
    { "id": 132, "name": "Pakistan" },
    { "id": 133, "name": "Palau" },
    { "id": 134, "name": "Palestine" },
    { "id": 135, "name": "Panama" },
    { "id": 136, "name": "Papua New Guinea" },
    { "id": 137, "name": "Paraguay" },
    { "id": 138, "name": "Peru" },
    { "id": 139, "name": "Philippines" },
    { "id": 140, "name": "Poland" },
    { "id": 141, "name": "Portugal" },
    { "id": 142, "name": "Qatar" },
    { "id": 143, "name": "Romania" },
    { "id": 144, "name": "Russia" },
    { "id": 145, "name": "Rwanda" },
    { "id": 146, "name": "Saint Kitts and Nevis" },
    { "id": 147, "name": "Saint Lucia" },
    { "id": 148, "name": "Saint Vincent and the Grenadines" },
    { "id": 149, "name": "Samoa" },
    { "id": 150, "name": "San Marino" },
    { "id": 151, "name": "Sao Tome and Principe" },
    { "id": 152, "name": "Saudi Arabia" },
    { "id": 153, "name": "Senegal" },
    { "id": 154, "name": "Serbia" },
    { "id": 155, "name": "Seychelles" },
    { "id": 156, "name": "Sierra Leone" },
    { "id": 157, "name": "Singapore" },
    { "id": 158, "name": "Slovakia" },
    { "id": 159, "name": "Slovenia" },
    { "id": 160, "name": "Solomon Islands" },
    { "id": 161, "name": "Somalia" },
    { "id": 162, "name": "South Africa" },
    { "id": 163, "name": "South Sudan" },
    { "id": 164, "name": "Spain" },
    { "id": 165, "name": "Sri Lanka" },
    { "id": 166, "name": "Sudan" },
    { "id": 167, "name": "Suriname" },
    { "id": 168, "name": "Sweden" },
    { "id": 169, "name": "Switzerland" },
    { "id": 170, "name": "Syria" },
    { "id": 171, "name": "Taiwan" },
    { "id": 172, "name": "Tajikistan" },
    { "id": 173, "name": "Tanzania" },
    { "id": 174, "name": "Thailand" },
    { "id": 175, "name": "Togo" },
    { "id": 176, "name": "Tonga" },
    { "id": 177, "name": "Trinidad and Tobago" },
    { "id": 178, "name": "Tunisia" },
    { "id": 179, "name": "Turkey" },
    { "id": 180, "name": "Turkmenistan" },
    { "id": 181, "name": "Tuvalu" },
    { "id": 182, "name": "Uganda" },
    { "id": 183, "name": "Ukraine" },
    { "id": 184, "name": "United Arab Emirates" },
    { "id": 185, "name": "United Kingdom" },
    { "id": 186, "name": "United States" },
    { "id": 187, "name": "Uruguay" },
    { "id": 188, "name": "Uzbekistan" },
    { "id": 189, "name": "Vanuatu" },
    { "id": 190, "name": "Vatican City" },
    { "id": 191, "name": "Venezuela" },
    { "id": 192, "name": "Vietnam" },
    { "id": 193, "name": "Yemen" },
    { "id": 194, "name": "Zambia" },
    { "id": 195, "name": "Zimbabwe" }
]


export const paymentMethods = [
    { id: 1, name: "Net 1 day" },
    { id: 2, name: "Net 7 days" },
    { id: 3, name: "Net 14 days" },
    { id: 4, name: "Net 21 days" },
];

export const API_URL_V1 = process.env.NEXT_PUBLIC_API_URL



export const axiosInstance = axios.create({
    baseURL: API_URL_V1,
    headers: {
        'Content-Type': 'application/json'
    }
})

axiosInstance.interceptors.request.use((config) => {
    const accessToken = getAccessToken()

    if (accessToken) {
        // console.log(accessToken);
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config

})


axiosInstance.interceptors.response.use((response) => {
    return response
},
    async (error) => {
        const originalRequest = error.config

        const refreshToken = getRefreshToken();
        //create a service that returns access token using the rrefresh token
        const token = ""

        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true
            if (token) {
                axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`
                return axiosInstance(originalRequest)
            }
        }

        return Promise.reject(error)
    }
)

const lettersOfAlphabets = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
];
const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];