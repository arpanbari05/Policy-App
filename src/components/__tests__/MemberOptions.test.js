import { membersList } from "../../test/data/members";
import { MemberOptions, useMembersForm } from "../MemberOptions";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const getInitialMembersList = () =>
  membersList.map(member =>
    member.code === "son1"
      ? { ...member, isSelected: true }
      : member.code === "daughter1"
      ? {
          ...member,
          isSelected: true,
          age: { code: 2, display_name: "2 Years" },
        }
      : member.code === "self"
      ? {
          ...member,
          isSelected: true,
          age: { code: 27, display_name: "27 Years" },
        }
      : member.code === "father"
      ? {
          ...member,
          isSelected: true,
          age: { code: 97, display_name: "97 Years" },
        }
      : member,
  );

function TestMembersForm() {
  const { isError, validate, getSelectedMembers, ...membersForm } =
    useMembersForm(getInitialMembersList);

  const selectedMembers = getSelectedMembers();

  const handleSubmit = () => {
    const isValid = validate();

    if (!isValid) return;
  };

  return (
    <div>
      <div>
        {selectedMembers.map(member => (
          <div className="d-flex" key={member.code}>
            <div className="mx-1">{member.display_name}: </div>
            <div>{member.age?.display_name}</div>
          </div>
        ))}
      </div>
      <MemberOptions {...membersForm} />
      <button onClick={handleSubmit}>Submit</button>
      {isError && <p aria-label="error message">Please enter Insurer's age</p>}
    </div>
  );
}

test(`Test MemberOptions`, async () => {
  const membersForm = render(<TestMembersForm />);

  const submitBtn = await membersForm.findByText(/submit/i);

  userEvent.click(submitBtn);

  const errorMessage = await membersForm.findByLabelText(/error message/i);

  expect(errorMessage).toBeInTheDocument();
});
