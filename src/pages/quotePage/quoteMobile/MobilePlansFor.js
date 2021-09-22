import "styled-components/macro";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router";
import { setSelectedGroup } from "../quote.slice";
import useUrlQuery from "../../../customHooks/useUrlQuery";

const MobilePlansFor = () => {
  const dispatch = useDispatch();
  const { memberGroups, proposerDetails } = useSelector(
    state => state.greetingPage,
  );
  const { groupCode: selectedGroup } = useParams();

  const history = useHistory();

  const urlQueryStrings = useUrlQuery();

  const enquiryId = urlQueryStrings.get("enquiryId");
  return (
    <div
      css={`
        box-shadow: 0px 10px 20px rgb(134 156 213 / 25%);
        padding: 13px 3px;
        display: flex;
        border-radius: 0 0 12px 12px;
        font-size: 14px;
        justify-content: space-around;
      `}
    >
      {Object.keys(memberGroups)
        .sort()
        .map(group => (
          <span
            onClick={() => {
              history.push({
                pathname: `/quotes/${group}`,
                search: `enquiryId=${enquiryId}`,
              });
              dispatch(setSelectedGroup(group));
              // getQuotes(members.filter((m) => m.group === group));
            }}
            css={`
              font-weight: 900;
              position: relative;
              min-width: 30%;
              text-transform: capitalize;
              text-align: center;
              &:after {
                display: ${selectedGroup !== group && "none"};
                content: "";
                height: 3px;
                width: 58%;
                position: absolute;
                left: 0px;
                top: 32px;
                background-color: #0a87ff;
                margin: auto;
                right: 0px;
              }
            `}
          >

            {memberGroups[group]?.join(", ")?.replaceAll("_", "-")}
          </span>
        ))}
    </div>
  );
};

export default MobilePlansFor;
