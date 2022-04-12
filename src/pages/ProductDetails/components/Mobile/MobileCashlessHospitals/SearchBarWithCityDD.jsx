import styled from "styled-components/macro";
import { RiSearchLine } from "react-icons/ri";
import { useTheme } from "../../../../../customHooks";
import { useGetEnquiriesQuery } from "../../../../../api/api";
import { useParams } from "react-router-dom";

const SearchBarWithCityDD = ({ searchText, setSearchText }) => {
  const { colors } = useTheme();

  const searchInputChangeHandler = e => {
    setSearchText(window.innerWidth < 1025 ? e.target.value : e);
  };

  return (
    <SearchBarWithCityDDOuter>
      <CityDD
        primaryColor={colors.primary_color}
        primaryShade={colors.primary_shade}
      />
      <SearchBar onChange={searchInputChangeHandler} value={searchText} />
    </SearchBarWithCityDDOuter>
  );
};
export default SearchBarWithCityDD;

const SearchBarWithCityDDOuter = styled.div`
  margin: 10px 0px;
  display: flex;
  align-items: center;
`;

const CityDD = ({ PrimaryColor, PrimaryShade }) => {
  const data = useGetEnquiriesQuery();
  const { groupCode } = useParams();

  return (
    <CityDDOuter primaryColor={PrimaryColor} PrimaryShade={PrimaryShade}>
      {
        data?.data?.data?.groups.find(
          singleGroup => singleGroup.id === +groupCode,
        )?.city
      }
    </CityDDOuter>
  );
};
const CityDDOuter = styled.div`
  min-width: 150px;
  height: 60px;
  font-size: 19px;
  font-weight: 600;
  border: 1px solid ${({ primaryColor }) => primaryColor};
  background-color: ${({ primaryShade }) => primaryShade};
  border-radius: 10px 0 0 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ primaryColor }) => primaryColor};
  @media (max-width: 1017px) {
    height: 45px;
    font-size: 15px;
    min-width: 100px;
  }
`;

const SearchBar = ({ onChange, value }) => {
  return (
    <SearchBarOuter>
      <SearchInput
        type="text"
        onChange={onChange}
        placeholder="Search Hospitals"
        value={value}
      />
      <RiSearchLine
        size={window.innerWidth < 470 ? "26px" : "28px"}
        color="#777777"
      />
    </SearchBarOuter>
  );
};
const SearchBarOuter = styled.div`
  height: 60px;
  width: 100%;
  border: 1px solid #bbc0ca;
  border-radius: 0 10px 10px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  @media (max-width: 1017px) {
    height: 45px;
  }
`;

const SearchInput = styled.input`
  outline: none;
  border: none;
  font-size: 18px;
  width: 90%;
  @media (max-width: 1017px) {
    font-size: 15px;
  }
`;
